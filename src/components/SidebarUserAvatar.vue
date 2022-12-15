<template>
  <CFlex
    v-if="user?.sub"
    px="2"
    gap="2"
    overflow="hidden"
    minH="48px"
    align="center"
    style="cursor: pointer; transition: all 0.5s ease-in-out"
    :_hover="{
      backgroundColor: 'gray.200',
    }"
    rounded="4px"
    @click="$emit('click')"
  >
    <CAvatar
      size="md"
      :name="user.fullName"
      :src="user.avatarUrl"
      ml="0"
      class="transition-1"
    />
    <CFlex direction="column">
      <CHeading as="h3" size="sm" align="left" color="gray.800" isTruncated>
        {{ user.fullName }}
      </CHeading>
      <CText align="left" color="gray.600" isTruncated>
        {{ user.team || 'Time' }}
      </CText>
    </CFlex>
  </CFlex>
</template>

<script>
import { mapState } from 'pinia';

import { useAuthStore } from '@/store/auth';
export default {
  name: 'SidebarUserAvatar',
  computed: {
    ...mapState(useAuthStore, { user: 'getUser' }),
  },
};
</script>

<style>
</style>
