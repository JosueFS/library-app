<template>
  <CFlex direction="column" maxH="calc(100vh - 41px)">
    <CFlex>
      <CFlex overflow-x="scroll" flexWrap="no-wrap" maxW="100vw" gap="1">
        <HomeBookItem
          v-chakra
          px="2"
          h="100%"
          minW="200px"
          maxW="300px"
          :key="index"
          v-for="(_, index) in 30"
          :book="{
            id: `${index}`,
            assetId: 0,
            title: `Titulo do Livro ${String(index + 1).padStart(2, '0')}`,
            author: 'Escritor',
            image: 'https://covers.openlibrary.org/b/id/10315434-L.jpg',
          }"
        />
      </CFlex>
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
