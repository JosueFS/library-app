<template>
  <CFlex
    id="app"
    color="white"
    bg="gray.100"
    mx="auto"
    h="100%"
    :flexDirection="isMobile ? 'column' : 'row'"
  >
    <CFlex
      v-if="isMobile"
      px="1"
      h="40px"
      justify="space-between"
      align="center"
    >
      <template v-if="!showSearchInput">
        <CButton
          minW="32px"
          h="32px"
          p="0"
          variant="ghost"
          :_hover="{}"
          :_active="{}"
        >
          <Icon :name="'menu'" iconColor="#000"> </Icon>
          <!-- <Icon :name="pinOpenMenu ? 'close' : 'menu'" iconColor="#000"> </Icon> -->
        </CButton>
        <CImage
          :src="require('@/assets/book2.png')"
          alt="Logotipo: Livro aberto mostrando a capa vermelha"
          h="80%"
        />
        <CButton
          minW="32px"
          h="32px"
          px="0"
          variant="ghost"
          :_hover="{}"
          :_active="{}"
          @click="showSearchInput = true"
        >
          <Icon name="search" iconColor="#000" />
        </CButton>
      </template>

      <template v-else>
        <CButton
          px="2"
          variant="ghost"
          :_hover="{}"
          :_active="{}"
          @click="showSearchInput = false"
        >
          <Icon name="close" iconColor="#000" />
        </CButton>
        <CInputGroup w="100%" h="32px">
          <CInputLeftElement h="32px" w="32px" fontSize="1.25rem">
            <Icon name="search" iconColor="#ccc" />
          </CInputLeftElement>
          <CInput
            h="32px"
            type="text"
            placeholder="Buscar"
            roundedLeft="20px"
            roundedRight="20px"
          />
        </CInputGroup>
      </template>
    </CFlex>

    <TheSidebar v-else />
    <CFlex direction="column" h="100vh" w="100%" px="2" py="4">
      <!-- <TheHeader /> -->
      <CHeading py="2" as="h2" align="left"> {{ $route.meta.title }} </CHeading>
      <router-view :key="$route.fullPath"></router-view>
    </CFlex>
  </CFlex>
</template>

<script>
import TheSidebar from './layouts/TheSidebar.vue';
import TheHeader from './layouts/TheHeader.vue';
import Icon from '@/components/BaseIcon.vue';

export default {
  components: {
    TheHeader,
    TheSidebar,
    Icon,
  },
  data: () => ({
    windowSize: 960,
    showSearchInput: false,
  }),
  computed: {
    isMobile() {
      return this.windowSize < 768;
    },
  },
  methods: {
    updateWindowSize() {
      this.windowSize = window.innerWidth;
    },
  },
  async created() {
    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowSize);
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

@for $i from 1 through 6 {
  h#{$i} {
    line-height: 150% !important;
    font-size: calc((12 + (6 - $i) * 4) / 16) + rem !important;
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
