<template>
  <div class="new-product-hint">
    <TopArrowIcon />
    <span class="text">{{ $t("PRODUCT_LIST__NEW_PRODUCT_HINT_TEXT") }}</span>
  </div>
</template>

<script setup lang="ts">
import TopArrowIcon from "@/components/Svg/TopArrowIcon.vue";
</script>

<style lang="scss" scoped>
.new-product-hint {
  width: fit-content;
  height: 0.34rem;
  font-size: 0.2rem;
  padding: 0 0.15rem;
  border-radius: 0.2rem;
  @include flexAlignCenter();
  @include position(fixed, $top: 1.34rem, $left: 0, $right: 0);
  margin: auto;
  z-index: map-get($zIndex, newProductHint);
  background: #fff;
  box-shadow: 0 0.02rem #cccccc;
  .arrow-icon {
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 0.05rem;
    display: block;
  }
}
</style>
