<template>
  <span
    :class="`material-symbols${'-' + iconStyle}`"
    :style="iconColor ? `color: ${computedColor};` : ''"
    @click="$emit('click')"
  >
    {{ name }}
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    iconStyle: {
      type: String,
      required: false,
      default: 'outlined',
    },
    iconColor: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    isHEXColor() {
      return this.iconColor?.includes('#');
    },
    computedColor() {
      return this.isHEXColor
        ? this.iconColor
        : `var(--chakra-colors-${this.iconColor.replace('.', '-')})`;
    },
  },
};
</script>

<style></style>
