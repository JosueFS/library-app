<template>
  <CFlex
    :px="isOpen ? '2' : '0'"
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
      :size="isOpen ? 'md' : 'sm'"
      :name="user.name"
      :src="user.avatarUrl"
      :ml="isOpen ? '0' : '1'"
      class="transition-1"
    />
    <CFlex direction="column">
      <CHeading as="h3" size="sm" align="left" color="gray.800" isTruncated>
        {{ user.name }}
      </CHeading>
      <CText align="left" color="gray.600" isTruncated> {{ user.team }} </CText>
    </CFlex>
  </CFlex>
</template>

<script>
export default {
  name: 'SidebarUserAvatar',
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    user() {
      //getter
      return {
        name: 'Evan You',
        avatarUrl: 'https://bit.ly/chakra-evan-you',
        team: 'Engenharia',
      };
    },
  },
};
</script>

<style>
</style>
