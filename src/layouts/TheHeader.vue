<template>
  <CFlex gap="2" justify="space-between">
    <CInputGroup w="100%">
      <CInputLeftElement>
        <Icon name="search" :iconColor="color" />
      </CInputLeftElement>
      <CInput
        type="text"
        placeholder="Buscar"
        roundedLeft="20px"
        roundedRight="20px"
        @focus="color = '#222'"
        @blur="color = '#eee'"
      />
    </CInputGroup>
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
