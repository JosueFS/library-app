<template>
  <CModal :isOpen="value" :onClose="closeModal">
    <CModalContent minH="300px" h="fit-content">
      <CModalHeader>Posicione sobre o código</CModalHeader>
      <CModalCloseButton />
      <CModalBody
        style="position: relative; display: flex; flex-direction: column"
      >
        <div id="qr-scanner" style="width: 100%"></div>

        <CSpinner
          v-if="loadingCamera"
          m="auto"
          thickness="4px"
          speed="0.65s"
          empty-color="blue.200"
          color="blue.500"
          size="xl"
        />

        <template v-else>
          <CFlex style="position: static">
            <CButton
              px="2"
              class="btn-camera-switch"
              @click="
                loadCamera();
                showDeviceSelector = true;
              "
            >
              <Icon name="cameraswitch" iconColor="#000" />
            </CButton>

            <CModal
              v-if="devices.length"
              :isOpen="showDeviceSelector"
              :onClose="
                () => {
                  showDeviceSelector = false;
                }
              "
            >
              <CModalContent ref="content">
                <CModalHeader>Mudar câmera</CModalHeader>
                <CModalCloseButton />
                <CModalBody>
                  <CRadioGroup v-model="selectedDeviceId">
                    <CRadio
                      v-for="device in devices"
                      :key="device.id"
                      :value="device.id"
                    >
                      {{ device.label }}
                    </CRadio>
                  </CRadioGroup>
                </CModalBody>
                <CModalFooter>
                  <CButton variant-color="blue" mr="3" @click="reloadCamera">
                    Confirmar
                  </CButton>
                  <CButton @click="showDeviceSelector = false"
                    >Cancelar</CButton
                  >
                </CModalFooter>
              </CModalContent>
              <CModalOverlay />
            </CModal>
          </CFlex>
        </template>
      </CModalBody>
    </CModalContent>
    <CModalOverlay />
  </CModal>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';

export default {
  name: 'BarCodeScanner',
  components: {
    Icon,
  },
  model: {
    prop: 'value',
    event: 'close',
  },
  props: {
    value: false,
  },
  data: () => ({
    devices: [],
    selectedDeviceId: '',
    showDeviceSelector: false,
    loadingCamera: false,
    Scanner: undefined,
  }),
  methods: {
    async loadCamera() {
      const devices = await Html5Qrcode.getCameras(); //.then(devices => {
      this.devices = devices;
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        let cameraId = this.selectedDeviceId || devices[0].id;
        this.selectedDeviceId = cameraId;
        console.log('CameraID => ', cameraId);
        // .. use this to start scanning.

        await this.Scanner.start(
          cameraId,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: 150, // Optional, if you want bounded box UI
          },
          async (decodedText, decodedResult) => {
            // do something when code is read
            console.log('decodedText => ', decodedText);
            console.log('decodedResult => ', decodedResult);

            const response = await this.fetchBook(decodedText);
            if (response) {
              this.$emit('fetchBook', response);
              await this.closeModal();
            }
          },
          (errorMessage) => {
            // parse error, ignore it.
            // console.error(errorMessage);
          }
        );
      }
    },
    async reloadCamera() {
      this.loadingCamera = true;
      await this.Scanner.stop();
      await this.loadCamera();
      this.showDeviceSelector = false;
      this.loadingCamera = false;
    },
    async closeModal() {
      await this.Scanner.stop();
      this.$emit('close', false);
    },
    async fetchBook(isbn) {
      try {
        const { data } = await this.$axios.get(
          `https://openlibrary.org/isbn/${isbn}.json`
        );
        const { isbn_10 } = data;
        const { data: bookDetail } = await this.$axios.get(
          `https://openlibrary.org/api/books?format=json&bibkeys=ISBN:${isbn_10}`
        );

        return { ...data, ...bookDetail };
      } catch (error) {
        return false;
      }
    },
  },
  async mounted() {
    this.loadingCamera = true;
    setTimeout(async () => {
      this.Scanner = new Html5Qrcode('qr-scanner');
      await this.loadCamera();
      this.loadingCamera = false;
    }, 1000);
  },
};
</script>

<style lang="scss">
div#qr-scanner {
  height: 100%;
  > video {
    height: 100%;
  }
}
button.btn-camera-switch {
  position: absolute;
  right: 32px;
  top: 8px;
  margin-top: 8px;
  z-index: 999;
}
</style>
