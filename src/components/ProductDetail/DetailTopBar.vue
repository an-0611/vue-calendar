<template>
  <div id="DetailTopBar" v-if="productDetail">
    <div class="top-bar">
      <BackIcon @click="resetBackToMainPage" />
      <span class="name">{{ productDetail.name }}</span>
      <MagnifierIcon />
      <UploadIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProduct } from "@/store";
import BackIcon from "@/components/Svg/BackIcon.vue";
import MagnifierIcon from "@/components/Svg/MagnifierIcon.vue";
import UploadIcon from "@/components/Svg/UploadIcon.vue";

const productStore = useProduct();
const { productDetail } = storeToRefs(productStore);
const { resetBackToMainPage } = productStore;
</script>

<style lang="scss" scoped>
#DetailTopBar {
  border-bottom: 0.03rem solid #f0f0f0;
  margin: auto;
  background: #fff;
  .top-bar {
    height: 0.75rem;
    padding: 0 0.3rem;
    @include flexAlignCenter();
    border-bottom: 0.03rem solid #eeefef;
    text-align: left;
    .back-icon,
    input,
    .magnifier-icon,
    .upload-icon {
      height: 0.4rem;
      display: inline-block;
      vertical-align: middle;
      margin-left: 0.2rem;
    }
    .back-icon {
      margin-left: 0;
    }
    .name {
      height: 0.45rem;
      font-size: 0.34rem;
      font-weight: 700;
      margin-left: 0.3rem;
      color: $main-font-black;
      flex: 1 1 auto;
      @include ellipsis(1);
    }
  }
}
</style>
