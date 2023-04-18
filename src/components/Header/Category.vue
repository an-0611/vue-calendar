<template>
  <div class="header-category">
    <ul>
      <li
        :class="{ active: id == currentCategory }"
        v-for="{ id, name } in categories"
        @click="toggleCategoryTab({ itemId: id })"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProduct } from "@/store";

const productStore = useProduct();
const { categories, currentCategory } = storeToRefs(productStore);
const { toggleCategoryTab } = productStore;
</script>

<style lang="scss" scoped>
.header-category {
  color: $main-font-gray;
  height: 0.5rem;
  padding: 0 0.1rem;
  ul {
    height: 100%;
    line-height: 0.5rem;
    font-size: 0.18rem;
    font-weight: 900;
    @include flexAlignCenter();
    overflow: auto hidden;
    li {
      height: 100%;
      padding: 0 0.2rem;
      white-space: nowrap;
      cursor: pointer;
      &.active {
        color: $common-red;
      }
    }
  }
}
</style>
