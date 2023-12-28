<template>
  <CFlex>
    <CImage
      :src="book?.image || `http://placeimg.com/480/640/${book.id}`"
      :alt="book.title"
    />
    <CFlex flexDirection="column" w="100%" p="4">
      <CHeading as="h2" font-size="lg" is-truncated>
        {{ book.title }}
      </CHeading>
      <CText mt="1" font-size="lg" is-truncated>
        {{ book.author }}
      </CText>
      <CText mt="1" font-size="md" is-truncated>
        Total de páginas: {{ book.pagesAmount }}
      </CText>
      <CText mt="1" font-size="md" is-truncated>
        Publicado em: {{ publishedDate }}
      </CText>
    </CFlex>
  </CFlex>
</template>

<script>
export default {
  name: 'RegisterBookInfo',
  props: {
    book: {
      type: Object,
      // required: true,
      default: () => ({
        id: 'isbn_13',
        title: 'Book Title',
        author: ['author 01', 'author 02'],
        image: 'https://covers.openlibrary.org/b/id/10315434-L.jpg',
        pagesAmount: 300,
      }),
    },
  },
  computed: {
    publishedDate() {
      return new Date(this.book.published).toLocaleString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    },
  },
};
</script>

<style>
</style>
