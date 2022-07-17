<template>
  <CFlex direction="column" h="100%">
    <CHeading font-size="xl"> Livros </CHeading>
    <CFlex overflow="scroll" flexWrap="wrap" gap="1">
      <HomeBookItem :key="index" v-for="(_, index) in 30" w="40%" />
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
