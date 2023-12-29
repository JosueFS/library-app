<template>
  <Icon :icon="name" :color="computedColor" :width="size" :height="size" />
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'BaseIcon',
  components: {
    Icon
  },
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
    size: {
      type: Number,
      required: false,
      default: 24,
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
