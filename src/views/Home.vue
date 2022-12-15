<template>
  <TheBookSection :books="books" />
</template>

<script>
import GET_BOOKS from '@/graphql/GetBooks.gql';

import TheBookSection from '@/layouts/TheBookSection.vue';

export default {
  name: 'Home',
  components: {
    TheBookSection,
  },
  data: () => ({
    books: [],
  }),
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
