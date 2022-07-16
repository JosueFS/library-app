<template>
  <CFlex
    pos="absolute"
    direction="column"
    h="95vh"
    :w="isOpen ? '250px' : '64px'"
    @mouseleave="mouseIsOverMenu = false"
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
        v-for="{ title, icon } in menuOptions"
        :key="icon"
        :title="title"
        :icon="icon"
      />
    </CFlex>

    <!-- User Information -->
    <CFlex direction="column" justify="center" mt="auto" gap="2">
      <CDivider />
      <SidebarUserAvatar :isOpen="isOpen" />
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
      mouseIsOverMenu: false,
      pinOpenMenu: false,
      menuOptions: [
        { title: 'Lista de livros', icon: 'menu_book' },
        { title: 'Favoritos', icon: 'favorite' },
        { title: 'Devolver Livro', icon: 'refresh' },
        { title: 'Doar Livro', icon: 'volunteer_activism' },
      ],
    };
  },
  computed: {
    isOpen() {
      return this.mouseIsOverMenu || this.pinOpenMenu;
    },
  },
  methods: {
    toggleMenu() {
      this.pinOpenMenu = !this.pinOpenMenu;
    },
  },
};
</script>

<style></style>
