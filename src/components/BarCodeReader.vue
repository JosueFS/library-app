<template>
  <div style="position: relative">
    <CInput
      type="file"
      accept="image/*"
      capture="camera"
      @change="processEAN"
    />
    <CButton
      px="2"
      style="position: absolute; right: 8px; margin-top: 8px; z-index: 999"
      @click="showDeviceSelector = true"
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
          <CButton variant-color="blue" mr="3"> Confirmar </CButton>
          <CButton @click="showDeviceSelector = false">Cancelar</CButton>
        </CModalFooter>
      </CModalContent>
      <CModalOverlay />
    </CModal>
    <div id="qr-reader" style="width: 100%"></div>
  </div>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';

export default {
  components: {
    Icon,
  },
  data: () => ({
    devices: [],
    selectedDeviceId: '',
    showDeviceSelector: false,
  }),
  methods: {
    processEAN(e) {
      // console.log(e);
      if (e.target.files && e.target.files.length) {
        const src = URL.createObjectURL(e.target.files[0]);
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = src;
        console.log(image);
      }
    },
  },
  async mounted() {
    const devices = await Html5Qrcode.getCameras(); //.then(devices => {
    this.devices.push(...devices);
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
      let cameraId = this.selectedDeviceId || devices[0].id;
      this.selectedDeviceId = cameraId;
      console.log('CameraID => ', cameraId);
      // .. use this to start scanning.
      const Scanner = new Html5Qrcode('qr-reader');
      await Scanner.start(
        cameraId,
        {
          fps: 10, // Optional, frame per seconds for qr code scanning
          qrbox: 250, // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          // do something when code is read
          console.log('decodedText => ', decodedText);
          console.log('decodedResult => ', decodedResult);
        },
        (errorMessage) => {
          // parse error, ignore it.
          // console.error(errorMessage);
        }
      );
    }
  },
  created() {},
};
</script>

<style lang="scss">
div#qr-reader {
  > div:first-child {
    height: 44px;
    > span:first-child {
      display: none;
    }

    > span#qr-reader__status_span {
      float: left !important;
    }
  }
}

div#qr-reader__dashboard_section_csr {
  display: inline !important;
  position: absolute;
  top: 8px;
  right: 8px;
}

span[id*='modal-portal-'] {
  > div:first-child > div:first-child {
    z-index: 1400;
  }
}
</style>
