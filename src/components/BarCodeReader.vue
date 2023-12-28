<template>
  <CFlex
    w="100%"
    :maxW="isMobile ? '600px' : '100%'"
    flexDirection="column"
    gap="2"
    :align="isMobile ? 'center' : 'start'"
  >
    <CTabs w="100%" variant="enclosed" variant-color="secondary">
      <CTabList borderColor="secondary.600">
        <CTab class="fix-tab-border-color"> Digitar </CTab>
        <CTab class="fix-tab-border-color"> Scanear </CTab>
        <CTab class="fix-tab-border-color"> Arquivo </CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel>
          <p v-chakra fontSize="lg" p="2">
            Aqui você pode digitar o código de barras que tentaremos encontrar
            as informações necessárias para cadastrá-lo.
          </p>
          <CFlex align="center" gap="4">
            <CInput
              v-model="bookEAN"
              type="number"
              placeholder="Digite o Código EAN/ISBN"
              p="8px"
              h="fit-content"
              w="50%"
              size="sm"
              borderRadius="4px"
              variant="outline"
              style="flex: 1 1 auto"
            />
            <CButton
              px="2"
              gap="4"
              size="lg"
              variant="outline"
              variant-color="gray.900"
              maxW="50%"
              @click="onClickVerify"
              style="flex: 1 1 auto"
            >
              <Icon name="search" />
              <span>Verificar</span>
            </CButton>
          </CFlex>
        </CTabPanel>
        <CTabPanel>
          <p>Scanear</p>
          <CFlex align="center" gap="4">
            <CTooltip label="Ler código" placement="top" hasArrow>
              <CButton
                w="100%"
                px="2"
                gap="4"
                size="lg"
                variant="outline"
                variant-color="gray.900"
                @click="openScanner"
              >
                <Icon name="qr_code_scanner" />
                <span>Ler código</span>
              </CButton>
            </CTooltip>
          </CFlex>
        </CTabPanel>
        <CTabPanel>
          <p>Imagem</p>
          <CFlex :flexDirection="isMobile ? 'column' : 'row'" gap="4">
            <label for="upload-photo" class="btn-input-file">
              <Icon name="photo_camera" />
              <span>Enviar imagem do código</span>
            </label>
            <CInput
              id="upload-photo"
              type="file"
              accept="image/*"
              capture="camera"
              style="flex: 0 0 auto; display: none"
              @change="onInputFile"
            />
          </CFlex>
        </CTabPanel>
      </CTabPanels>
    </CTabs>

    <div id="qr-reader" style="width: 100%"></div>

    <!-- <pre>{{ response }}</pre> -->

    <BarCodeScanner
      v-if="showScannerDialog"
      v-model="showScannerDialog"
      @fetchBook="setResponse"
    />
  </CFlex>
</template>

<script>
import { mapState } from 'pinia';
import { useLayoutStore } from '@/store/layout';
import CodeReaderMixin from '@/mixins/CodeReaderMixin';

import Icon from '@/components/BaseIcon.vue';
import BarCodeScanner from '@/components/BarCodeScanner.vue';

export default {
  name: 'BarCodeReader',
  components: {
    Icon,
    BarCodeScanner,
  },
  mixins: [CodeReaderMixin],
  data: () => ({
    bookEAN: null,
    Reader: undefined,
    showScannerDialog: false,
    response: '',
  }),
  computed: {
    ...mapState(useLayoutStore, { isMobile: 'mobile' }),
  },
  methods: {
    async processEAN(isbn_13) {
      const response = await this.fetchBook(isbn_13);

      this.bookEAN = response.identifiers.isbn_13?.[0];

      this.setResponse(response);
    },
    async onClickVerify(e) {
      console.log(e);
      console.log(this.bookEAN);
      await this.processEAN(this.bookEAN);
    },
    async onInputFile(e) {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        const decodedText = await this.Reader.scanFile(file, false);
        console.log(decodedText);
        await this.processEAN(decodedText);
      }
    },
    openScanner() {
      this.showScannerDialog = true;
    },
    setResponse(response) {
      this.$emit('setBook', response);
    },
  },
  async mounted() {
    this.Reader = new Html5Qrcode('qr-reader');

    this.showScannerDialog = this.isMobile;
  },
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

.btn-input-file {
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  font-size: 18px;
  font-weight: 700;

  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid var(--chakra-colors-main-500);
}

.fix-tab-border-color[aria-selected='true'] {
  border-color: currentColor;
  border-bottom-color: var(--chakra-colors-main-50);
}
</style>
