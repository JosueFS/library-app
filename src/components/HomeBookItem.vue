<template>
  <CFlex
    overflow="hidden"
    style="
      position: relative;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    "
    :_hover="{
      backgroundColor: 'gray.400',
      borderColor: 'gray.600',
    }"
    bg="gray.300"
    border="1px"
    borderColor="transparent"
    rounded="8px"
    direction="column"
    @mouseover="showFavoriteIcon = true"
    @mouseleave="showFavoriteIcon = false"
    @click="$emit('click')"
  >
    <FavoriteIcon
      class="favorite-icon"
      :isFavorite="isFavorite"
      @click.native="updFavorites"
    />
    <CImage :src="`http://placeimg.com/480/640/${book.id}`" :alt="book.title" />
    <CFlex direction="column" p="2" justify="start" text-align="left">
      <CHeading as="h6" font-size="md" line-height="tight" is-truncated>
        {{ book.title }}
      </CHeading>
      <CText mt="1" font-size="sm" font-style="italic" is-truncated>
        {{ book.author }}
      </CText>
    </CFlex>
  </CFlex>
</template>

<script>
import FavoriteIcon from './FavoriteIcon.vue';
export default {
  name: 'HomeBookItem',
  components: { FavoriteIcon },
  props: {
    book: {
      type: Object,
      required: false,
      default: () => ({
        id: '123',
        title: 'Titulo do Livro',
        author: 'Escritor',
        image: 'https://covers.openlibrary.org/b/id/10315434-L.jpg',
      }),
    },
  },
  data: () => ({
    showFavoriteIcon: false,
    isFavorite: false,
  }),
  methods: {
    updFavorites() {
      // if (this.isFavorite) {
      //   this.$store.dispatch('favoriteModule/removeFavorite', this.beer);
      // } else {
      //   this.$store.dispatch('favoriteModule/addFavorite', this.beer);
      // }
      this.isFavorite = !this.isFavorite;
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

<style lang="scss">
.favorite-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 8px;
  right: 8px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  background: #00000077;
  &:hover {
    background: #00000033;
  }
}
</style>
