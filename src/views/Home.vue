<template>
  <CFlex direction="column" maxH="calc(100vh - 41px)">
    <CFlex overflow-y="scroll" flexWrap="wrap" gap="1">
      <HomeBookItem :key="index" v-for="(_, index) in 30" />
    </CFlex>
  </CFlex>
</template>

<script>
import HomeBookItem from '@/components/HomeBookItem.vue';
export default {
  name: 'Home',
  components: {
    HomeBookItem,
  },
};
</script>

<style>
</style>
