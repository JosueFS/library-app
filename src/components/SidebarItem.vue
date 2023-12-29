<template>
  <CButton
    px="2"
    color="gray.400"
    variant="active"
    borderColor="transparent"
    style="justify-content: flex-start"
    :_hover="{
      color: 'gray.100',
      borderColor: variant === 'outline' ? '' : color,
    }"
    @click="$emit('click')"
  >
    <CFlex alignItems="center" gap="3" overflow="hidden">
      <div v-chakra minH="24px" minW="4px" rounded="full" class="sidebar-item-active"></div>
      <Icon :name="icon" iconColor="currentColor"> </Icon>
      <CText isTruncated fontSize="16" fontWeight="600" class="lh-24">{{
        title
      }}</CText>
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
      default: 'gray.400',
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

<style lang="scss">
.sidebar-item-active {
  background-image: var(--chakra-colors-gradient-vertical);
}
</style>
