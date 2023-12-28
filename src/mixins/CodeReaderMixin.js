export default {
  methods: {
    async fetchBook(isbn) {
      try {
        // const { data } = await this.$axios.get(
        //   `https://openlibrary.org/isbn/${isbn}.json`
        // );
        // const { isbn_10 } = data;
        const { data } = await this.$axios.get(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
        );

        return data[`ISBN:${isbn}`];
      } catch (error) {
        return false;
      }
    },
  },
};
