<template>
  <div id="Header">
    <Nav />
    <Category />
  </div>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import Category from "./Category.vue";
</script>

<style lang="scss" scoped>
#Header {
  border-bottom: 0.03rem solid #f0f0f0;
  @include position(fixed, $top: 0, $left: 0, $right: 0);
  margin: auto;
  z-index: 100;
  background: #fff;
}
</style>
