<template>
  <CFlex id="app" color="white" bg="gray.100" mx="auto" h="100%" gap="4">
    <TheSidebar />
    <CFlex direction="column" h="100vh" py="4">
      <!-- <TheHeader /> -->
      <router-view :key="$route.fullPath"></router-view>
    </CFlex>
  </CFlex>
</template>

<script>
import TheSidebar from './layouts/TheSidebar.vue';
import TheHeader from './layouts/TheHeader.vue';
export default {
  components: {
    TheHeader,
    TheSidebar,
  },
  created() {
    // console.log('App created!', this);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

@for $i from 10 through 32 {
  .fs-#{$i} {
    font-size: $i + px;
  }
}

@for $i from 8 through 64 {
  .lh-#{$i} {
    line-height: $i + px;
  }
}

@for $i from 4 through 9 {
  .fw-#{$i}00 {
    font-weight: #{$i} + '00';
  }
}

@for $i from 1 through 16 {
  .gap-#{$i} {
    gap: $i * 4 + px;
  }
}

//500ms
@for $i from 1 through 10 {
  .transition-#{$i} {
    transition: all $i * 500 + ms;
  }
}
</style>
