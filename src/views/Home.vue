<template>
  <!-- <TheBookSection :books="books" /> -->

  <BarCodeReader :readerSize="readerSize" :readerTypes="['ean_reader']" />
</template>

<script>
import GET_BOOKS from '@/graphql/GetBooks.gql';

import TheBookSection from '@/layouts/TheBookSection.vue';
import BarCodeReader from '@/components/BarCodeReader.vue';

export default {
  name: 'Home',
  components: {
    TheBookSection,
    BarCodeReader,
  },
  data: () => ({
    books: [],
    readerSize: {
      width: 640,
      height: 480,
    },
    detecteds: [],
  }),
  methods: {
    logIt(data) {
      console.log('detected', data);
    },
  },
  async created() {
    const { data } = await this.$apollo.query({
      query: GET_BOOKS,
    });
    this.books = data.books;
    console.log(data);
  },
};
</script>

<style>
</style>
