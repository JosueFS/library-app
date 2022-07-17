<template>
  <CFlex
    pos="sticky"
    direction="column"
    h="95vh"
    :w="isOpen ? '250px' : '64px'"
    left="5"
    p="3"
    bg="gray.400"
    color="white"
    borderRadius="10px"
    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    class="transition-1"
  >
    <!-- Toggle Button Menu  -->
    <CFlex mb="3">
      <CButton
        px="2"
        variant="ghost"
        :_hover="{}"
        :_active="{}"
        @click="toggleMenu()"
      >
        <Icon :name="pinOpenMenu ? 'close' : 'menu'" iconColor="#000"> </Icon>
      </CButton>
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
