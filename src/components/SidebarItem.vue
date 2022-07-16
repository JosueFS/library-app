<template>
  <CButton
    px="2"
    :color="variant === 'outline' ? color : '#000'"
    :variant="variant"
    borderColor="transparent"
    style="justify-content: flex-start"
    :_hover="{
      bg: color,
      color: dark ? 'black' : 'white',
      borderColor: variant === 'outline' ? '' : color,
    }"
    :_active="{ bg: `${colorName}.400`, color: dark ? 'black' : 'white' }"
    @click="$emit('click')"
  >
    <CFlex align="center" gap="2" overflow="hidden">
      <Icon :name="icon" iconColor="currentColor"> </Icon>
      <CText isTruncated class="lh-16">{{ title }}</CText>
    </CFlex>
  </CButton>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';
export default {
  name: 'SidebarItem',
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: 'home',
    },
    color: {
      type: String,
      required: false,
      default: 'indigo.500',
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'ghost',
    },
  },
  computed: {
    colorName() {
      return this.color.split('.')[0];
    },
  },
};
</script>

<style>
</style>
