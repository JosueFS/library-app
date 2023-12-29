<template>
  <CFlex
    flexShrink="0"
    direction="column"
    h="95vh"
    w="2xs"
    px="10"
    py="12"
    m="6"
    rounded="12px"
    bg="gray.300"
    color="white"
    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    class="transition-1 sidebar-bg-gradient"
  >
    <!-- Logo -->
    <CFlex mb="3" alignItems="center" gap="3">
      <CAvatar
        borderColor="black"
        size="sm"
        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEn2cw2tJcU9w/company-logo_200_200/0/1625761088469?e=2147483647&v=beta&t=suaNDr9XUFVfrqTrpV128RUIa1j76cala28wkyBNkos"
      />
      <CText
        alignItems="left"
        fontSize="20"
        fontWeight="800"
        class="sidebar-logo-gradient"
        isTruncated
      >
        Biblioteca JG
      </CText>
    </CFlex>

    <CFlex h="40px">
      <CButton
        v-if="!isOpen"
        px="2"
        variant="ghost"
        :_hover="{}"
        :_active="{}"
        @click="toggleMenu()"
      >
        <Icon name="search" iconColor="#000" />
      </CButton>

      <CInputGroup v-else w="100%">
        <CInputLeftElement>
          <Icon name="search" iconColor="#ccc" />
        </CInputLeftElement>
        <CInput
          type="text"
          placeholder="Buscar"
          roundedLeft="20px"
          roundedRight="20px"
          @focus="color = '#222'"
          @blur="color = '#eee'"
        />
      </CInputGroup>
    </CFlex>

    <!-- Menu items -->
    <CFlex direction="column" gap="4">
      <SidebarItem
        v-for="{ title, icon, route } in menuOptions"
        :key="icon"
        :title="title"
        :icon="icon"
        @click="onClickItem(route)"
      />
    </CFlex>

    <!-- User Information -->
    <CFlex direction="column" justify="center" mt="auto" gap="2">
      <CDivider />
      <SidebarUserAvatar @click="onClickAvatar" />
      <GoogleSignInButton />
    </CFlex>
  </CFlex>
</template>

<script>
import GoogleSignInButton from '@/components/GoogleSignInButton.vue';
import Icon from '@/components/BaseIcon.vue';
import SidebarItem from '@/components/SidebarItem.vue';
import SidebarUserAvatar from '@/components/SidebarUserAvatar.vue';
export default {
  name: 'Sidebar',
  components: {
    GoogleSignInButton,
    Icon,
    SidebarItem,
    SidebarUserAvatar,
  },
  data() {
    return {
      pinOpenMenu: false,
      menuOptions: [
        { title: 'Início', icon: 'ph:chart-line-up', route: '/inicio' },
        { title: 'Explorar', icon: 'ph:binoculars', route: '/inicio' },
        { title: 'Perfil', icon: 'ph:user', route: '/inicio' },
        // { title: 'Favoritos', icon: 'favorite', route: '/favoritos' },
        // { title: 'Devolver', icon: 'refresh', route: '/devolver' },
        // {
        //   title: 'Cadastrar',
        //   icon: 'volunteer_activism',
        //   route: '/cadastrar',
        // },
      ],
    };
  },
  computed: {
    isOpen() {
      return this.pinOpenMenu;
    },
  },
  methods: {
    closeMenu() {
      this.pinOpenMenu = false;
    },
    toggleMenu() {
      this.pinOpenMenu = !this.pinOpenMenu;
    },
    onClickItem(route) {
      if (route !== this.$route.path) {
        this.$router.push(route);
      }
      this.closeMenu();
    },
    onClickAvatar() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss">
.sidebar-logo-gradient {
  background: var(--chakra-colors-gradient-horizontal);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
.sidebar-bg-gradient {
  background-image: var(--chakra-colors-gradient-radial);
  background-size: auto;
  background-repeat: repeat;
  background-position-y: -480px;
}
</style>
