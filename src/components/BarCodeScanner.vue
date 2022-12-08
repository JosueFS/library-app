<template>
  <div id="interactive" class="viewport scanner">
    <CButton @click="selectedDevice = devicesList?.[3] || devicesList?.[0]"
      >Ativar</CButton
    >
    <pre>{{ test }}</pre>

    <video></video>
    <canvas class="drawingBuffer"></canvas>
  </div>
</template>

<script>
import Quagga from 'quagga';
export default {
  name: 'BarCodeScanner',
  props: {
    onDetected: {
      type: Function,
      default(result) {
        console.log('detected: ', result);
      },
    },
    onProcessed: {
      type: Function,
      default(result) {
        let drawingCtx = Quagga.canvas.ctx.overlay;
        let drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute('width')),
              parseInt(drawingCanvas.getAttribute('height'))
            );
            result.boxes
              .filter(function (box) {
                return box !== result.box;
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: 'green',
                  lineWidth: 2,
                });
              });
          }
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: '#00F',
              lineWidth: 2,
            });
          }
          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: 'x', y: 'y' },
              drawingCtx,
              { color: 'red', lineWidth: 3 }
            );
          }
        }
      },
    },
    readerTypes: {
      type: Array,
      default: () => ['code_128_reader'],
    },
    readerSize: {
      type: Object,
      default: () => ({
        width: 640,
        height: 480,
      }),
      validator: (o) =>
        typeof o.width === 'number' && typeof o.height === 'number',
    },
    aspectRatio: {
      type: Object,
      default: () => ({
        min: 1,
        max: 2,
      }),
      validator: (o) => typeof o.min === 'number' && typeof o.max === 'number',
    },
    facingMode: {
      type: String,
      default: () => 'environment',
    },
  },

  data: function () {
    return {
      selectedDevice: undefined,
      test: undefined,
      devicesList: [],
    };
  },
  computed: {
    quaggaState() {
      return {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: { min: this.readerSize.width },
            height: { min: this.readerSize.height },
            facingMode: this.facingMode,
            aspectRatio: { min: 1, max: 2 },
            device: this.selectedDevice,
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
          readers: this.readerTypes,
        },
        locate: true,
      };
    },
    capabilities() {
      return Quagga?.CameraAccess?.getActiveTrack?.()?.getCapabilities?.();
    },
  },
  watch: {
    onDetected: function (oldValue, newValue) {
      if (oldValue) Quagga.offDetected(oldValue);
      if (newValue) Quagga.onDetected(newValue);
      console.log(newValue);
    },
    onProcessed: function (oldValue, newValue) {
      if (oldValue) Quagga.offProcessed(oldValue);
      if (newValue) Quagga.onProcessed(newValue);
      this.test = newValue;
      console.log(newValue);
    },
    quaggaState: {
      handler(val) {
        console.log(val);
        Quagga.init(this.quaggaState, function (err) {
          if (err) {
            return console.error(err);
          }
          Quagga.start();
        });
        Quagga?.CameraAccess?.getActiveTrack?.().applyConstraints({
          width: { min: this.readerSize.width },
          height: { min: this.readerSize.height },
          aspectRatio: { min: 1, max: 2 },
          device: this.selectedDevice,
        });
      },
      deep: true,
    },
  },
  mounted: async function () {
    Quagga.init(this.quaggaState, function (err) {
      if (err) {
        return console.error(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this.onDetected);
    Quagga.onProcessed(this.onProcessed);
    const devices = await Quagga.CameraAccess.enumerateVideoDevices();
    this.devicesList.push(...devices);
  },
  destroyed: function () {
    if (this.onDetected) Quagga.offDetected(this.onDetected);
    if (this.onProcessed) Quagga.offProcessed(this.offProcessed);
    Quagga.stop();
  },
};
</script>

<style scoped>
.viewport {
  position: relative;
  width: 100vw;
}
.viewport canvas,
.viewport video {
  /* position: absolute; */
  left: 0;
  top: 0;
}
</style>
