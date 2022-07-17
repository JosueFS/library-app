<template>
  <CFlex
    px="2"
    gap="2"
    overflow="hidden"
    maxW="100px"
    align="center"
    style="cursor: pointer; transition: all 0.5s ease-in-out"
    :_hover="{
      backgroundColor: 'gray.200',
    }"
    rounded="8px"
    direction="column"
    @click="$emit('click')"
  >
    <CImage :src="book.image" :alt="book.title" />
    <CFlex direction="column">
      <CHeading mt="1" as="h6" font-size="sm" line-height="tight" is-truncated>
        {{ book.title }}
      </CHeading>
      <CText mt="1" font-size="12px" is-truncated>
        {{ book.author }}
      </CText>
    </CFlex>
  </CFlex>
</template>

<script>
export default {
  name: 'HomeBookItem',
  props: {
    book: {
      type: Object,
      required: false,
      default: () => ({
        id: '123',
        assetId: 0,
        title: 'Titulo do Livro',
        author: 'Escritor',
        image: 'https://covers.openlibrary.org/b/id/10315434-L.jpg',
      }),
    },
  },
  // computed: {
  //   user() {
  //     //getter
  //     return {
  //       name: 'Evan You',
  //       avatarUrl: 'https://bit.ly/chakra-evan-you',
  //       team: 'Engenharia',
  //     };
  //   },
  // },
};
</script>

<style>
</style>
