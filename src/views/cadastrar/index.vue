<template>
  <CFlex flexDirection="column">
    <BarCodeReader @setBook="setBook" />

    <RegisterBookInfo v-if="book" :book="book" />

    <pre>{{ book }}</pre>
  </CFlex>
</template>

<script>
import BarCodeReader from '@/components/BarCodeReader.vue';
import RegisterBookInfo from '@/components/RegisterBookInfo.vue';

export default {
  name: 'Home',
  components: {
    BarCodeReader,
    RegisterBookInfo,
  },
  data: () => ({
    book: undefined,
  }),
  methods: {
    setBook(book) {
      const {
        title,
        authors,
        identifiers,
        cover,
        number_of_pages,
        publish_date,
        publishers,
      } = book;
      console.log(book);
      this.book = {
        id: identifiers.isbn_13?.[0],
        title,
        author: authors.map((a) => a.name).join(', '),
        image: cover?.small?.replace('-S', ''),
        pagesAmount: number_of_pages,
        published: publish_date ? new Date(publish_date) : undefined,
        publisher: publishers.map((p) => p.name).join(', '),
      };
    },
  },
  async created() {},
};
</script>

<style>
</style>
