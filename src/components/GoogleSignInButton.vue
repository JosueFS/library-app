<template>
  <SidebarItem
    v-if="user?.sub"
    title="Sair"
    icon="logout"
    color="red.600"
    variant="outline"
    @click="signOut"
  />

  <div v-else id="g-signin2" style="max-width: 208px"></div>
</template>

<script>
import jwt from 'vue-jwt-decode';
import { mapActions, mapState } from 'pinia';

import { useAuthStore } from '@/store/auth';

import SidebarItem from '@/components/SidebarItem.vue';

export default {
  name: 'GoogleSignInButton',
  components: {
    SidebarItem,
  },
  mounted() {
    this.initGoogleAuth();
    this.renderGoogleAuthButton();
  },
  computed: {
    ...mapState(useAuthStore, { user: 'getUser' }),
  },
  methods: {
    ...mapActions(useAuthStore, ['setUser']),
    onSignIn(user) {
      if (user?.credential) {
        const { sub, given_name, family_name, name, email, picture } =
          jwt.decode(user.credential);

        this.setUser({
          firstName: this.decodeUTF8(given_name),
          lastName: this.decodeUTF8(family_name),
          fullName: this.decodeUTF8(name),
          email,
          avatarUrl: picture,
          sub,
        });
      }
    },
    decodeUTF8(string) {
      return decodeURIComponent(escape(string));
    },
    signOut() {
      this.setUser(undefined);
      google.accounts.id.disableAutoSelect();
      setTimeout(() => {
        this.renderGoogleAuthButton();
      }, 300);
    },

    initGoogleAuth() {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID,
        callback: this.onSignIn,
      });
    },

    renderGoogleAuthButton() {
      google.accounts.id.renderButton(document.getElementById('g-signin2'), {
        theme: 'filled_black',
        // 'data-type': 'standard',
        // width: '208px',
        text: '$ {button.text}',
        logo_alignment: 'left',
        shape: 'pill',
        size: 'large',
      });
    },
  },
};
</script>

<style>
</style>
