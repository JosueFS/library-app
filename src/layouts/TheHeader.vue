<template>
  <CFlex gap="2" justify="space-between">
    <CImage h="10" :src="require('@/assets/book2.png')" />
  </CFlex>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';

export default {
  name: 'TheHeader',
  components: {
    Icon,
  },
  data: () => ({
    color: '#eee',
  }),
};
</script>

<style>
</style>
