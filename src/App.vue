<template>
  <div class="container" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProduct } from "@/store";

const productStore = useProduct();
const { initEvent } = productStore;

onMounted(() => {
  initEvent();
});
</script>

<style lang="scss" scoped>
#app {
  .container {
    height: 100%;
  }
  [v-cloak] {
    display: none;
  }
}
</style>
