<template>
  <span
    :class="`material-symbols${'-' + iconStyle}`"
    :style="iconColor ? `color: ${iconColor};` : ''"
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
};
</script>

<style></style>
