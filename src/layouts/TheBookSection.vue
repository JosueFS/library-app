<template>
  <CFlex direction="column" px="4">
    <CFlex justify="space-between" align="center">
      <CHeading font-size="4xl" textAlign="left"> Livros </CHeading>
      <CHeading as="h6" size="xs" textAlign="left" class="fw-800">
        <a v-chakra href="#" :_hover="{ textDecoration: 'underline' }">
          VER TUDO
        </a>
      </CHeading>
    </CFlex>
    <CGrid
      v-if="books.length"
      ref="container"
      :template-columns="`repeat(${columnCount}, minmax(124px, 360px))`"
      mt="2"
      gap="4"
    >
      <HomeBookItem
        ref="container-item"
        v-for="(_, index) in columnCount"
        :key="index"
        :book="books[index]"
      />
    </CGrid>
    <c-circular-progress v-else is-indeterminate />
  </CFlex>
</template>

<script>
import HomeBookItem from '@/components/HomeBookItem.vue';

export default {
  name: 'TheBookSection',
  props: {
    books: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  components: {
    HomeBookItem,
  },
  data: () => ({
    currentBreakpoint: 0,
    columnCountBreakpoints: [280, 500, 768, 960, 1024, 1440],
    containerResizeObserver: null,
  }),
  computed: {
    columnCount() {
      return (
        this.columnCountBreakpoints?.findIndex(
          (breakpoint) => this.currentBreakpoint < breakpoint
        ) + 1 || 5
      );
    },
  },
  methods: {
    updateWidth(evt) {
      console.log('evt');
      if (evt?.path?.length) {
        this.currentBreakpoint = evt.path[0].outerWidth;
      }
      if (evt?.length) {
        //   console.log('evt', evt.path[0].outerWidth);
        //   //Prevent lower or higher than Min and Max width
        // } else {
        console.log('window', evt[0]);
        this.currentBreakpoint = window.outerWidth;
      }
    },
  },
  mounted() {
    console.log('mounted => ', this);
    this.updateWidth();
    this.containerResizeObserver = new ResizeObserver(this.updateWidth);
    this.containerResizeObserver.observe(this.$el);
    window.addEventListener('resize', this.updateWidth);
  },

  beforeDestroy() {
    containerResizeObserver.unobserveobserve(this.$el);
    window.removeEventListener('resize', this.updateWidth);
  },
};
</script>

<style>
</style>
