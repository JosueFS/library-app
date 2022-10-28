<template>
  <CFlex
    flexShrink="0"
    direction="column"
    h="100vh"
    w="256px"
    p="6"
    bg="gray.300"
    color="white"
    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    class="transition-1"
  >
    <!-- Logo -->
    <CFlex mb="3" alignItems="center" gap="3">
      <CAvatar
        borderColor="black"
        size="md"
        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEn2cw2tJcU9w/company-logo_200_200/0/1625761088469?e=2147483647&v=beta&t=suaNDr9XUFVfrqTrpV128RUIa1j76cala28wkyBNkos"
      />
      <CText
        alignItems="left"
        fontSize="20"
        fontWeight="800"
        color="gray.800"
        isTruncated
      >
        Biblioteca JG
      </CText>
    </CFlex>

    <!-- Menu items -->
    <CFlex direction="column" gap="2">
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
      <SidebarUserAvatar :isOpen="isOpen" @click="onClickAvatar" />
      <SidebarItem
        title="Sair"
        icon="logout"
        color="red.600"
        variant="outline"
      />
    </CFlex>
  </CFlex>
</template>

<script>
import Icon from '@/components/BaseIcon.vue';
import SidebarItem from '@/components/SidebarItem.vue';
import SidebarUserAvatar from '@/components/SidebarUserAvatar.vue';
export default {
  name: 'Sidebar',
  components: {
    Icon,
    SidebarItem,
    SidebarUserAvatar,
  },
  data() {
    return {
      pinOpenMenu: false,
      menuOptions: [
        { title: 'Livros', icon: 'menu_book', route: '/inicio' },
        { title: 'Favoritos', icon: 'favorite', route: '/favoritos' },
        { title: 'Devolver', icon: 'refresh', route: '/devolver' },
        {
          title: 'Doar Livro',
          icon: 'volunteer_activism',
          route: '/doar-livro',
        },
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
      console.log('onClickItem', this.$router);
      if (route !== this.$route.path) {
        this.$router.push(route);
      }
      this.closeMenu();
    },
    onClickAvatar() {
      console.log('onClickAvatar');
      this.closeMenu();
    },
  },
};
</script>

<style></style>
