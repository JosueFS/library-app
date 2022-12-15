<template>
  <CFlex w="100%" flexDirection="column" gap="2" align="center">
    <CInput
      type="number"
      placeholder="Digite o Código EAN/ISBN"
      p="8px"
      h="fit-content"
      w="100%"
      size="sm"
      borderRadius="4px"
      variant="outline"
      style="flex: 0 0 auto"
    />

    <CInput
      type="file"
      accept="image/*"
      capture="camera"
      p="8px"
      h="fit-content"
      w="100%"
      size="sm"
      borderRadius="4px"
      variant="outline"
      style="flex: 0 0 auto"
      @change="processEAN"
    />

    <CFlex align="center" w="100%" gap="4">
      <CTooltip label="Ler código" placement="top" hasArrow>
        <CButton
          px="2"
          gap="4"
          size="lg"
          variant="outline"
          variant-color="gray.900"
          @click="openScanner"
        >
          <span as="h4">Usar leitor de código</span>
          <Icon name="qr_code_scanner" iconColor="#000" />
        </CButton>
      </CTooltip>
    </CFlex>

    <div id="qr-reader" style="width: 100%"></div>

    <pre>{{ response }}</pre>

    <BarCodeScanner
      v-if="showScannerDialog"
      v-model="showScannerDialog"
      @fetchBook="setResponse"
    />
  </CFlex>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';
import BarCodeScanner from '@/components/BarCodeScanner.vue';

export default {
  name: 'BarCodeReader',
  components: {
    Icon,
    BarCodeScanner,
  },
  data: () => ({
    Reader: undefined,
    showScannerDialog: false,
    response: '',
  }),
  methods: {
    async processEAN(e) {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        const decodedText = await this.Reader.scanFile(file, true);
        console.log(decodedText);
      }
    },
    openScanner() {
      this.showScannerDialog = true;
    },
    setResponse(response) {
      this.response = response;
    },
  },
  async mounted() {
    this.Reader = new Html5Qrcode('qr-reader');
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
</style>
