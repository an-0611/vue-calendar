<template>
  <div class="header-nav">
    <HamburgerIcon />
    <input type="text" :placeholder="$t('NAV__SEARCH_BAR__PLACEHOLDER')" />
    <NotificationIcon />
    <CheckIcon />
  </div>
</template>

<script setup lang="ts">
import HamburgerIcon from "@/components/Svg/HamburgerIcon.vue";
import NotificationIcon from "@/components/Svg/NotificationIcon.vue";
import CheckIcon from "@/components/Svg/CheckIcon.vue";
</script>

<style lang="scss" scoped>
.header-nav {
  height: 0.75rem;
  padding: 0 0.3rem;
  @include flexAlignCenter();
  border-bottom: 0.03rem solid #eeefef;
  text-align: left;
  .hamburger-icon,
  input,
  .notification-icon,
  .check-icon {
    height: 0.4rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.2rem;
  }
  .hamburger-icon {
    margin-left: 0;
  }
  input {
    height: 0.5rem;
    font-size: 0.2rem;
    text-indent: 0.1rem;
    margin-left: 0.3rem;
    color: $main-font-black;
    background: #eceaeb;
    flex: 1 1 auto;
    border-radius: 0.1rem;
    border: none;
    &::placeholder {
      color: $main-font-gray;
    }
  }
}
</style>
