<template>
  <div id="PurchaseField" v-if="productDetail">
    <div class="price-box">
      <span class="price">{{
        `¥${utils.addCommas(productDetail.price)}`
      }}</span>
      <span class="shipping-text">{{ productDetail.shippingFee }}</span>
    </div>
    <div class="button">{{ $t("PRODUCT_DETAIL__PURCHASE_BUTTON_TEXT") }}</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProduct } from "@/store";
import utils from "@/utils";

const productStore = useProduct();
const { productDetail } = storeToRefs(productStore);
</script>

<style lang="scss" scoped>
$common-padding: 0 0.3rem;
#PurchaseField {
  height: 80px;
  color: #fff;
  background: #36231f;
  @include flexAlignCenter();
  justify-content: space-between;
  padding: 10px;
  @include position(fixed, $bottom: 0, $left: 0, $right: 0);
  z-index: map-get($zIndex, purchaseField);
  margin: auto;
  .price-box {
    .price {
      font-size: 0.46rem;
    }
    .shipping-text {
      font-size: 0.2rem;
      margin-left: 0.1rem;
    }
  }
  .button {
    height: 100%;
    font-size: 0.25rem;
    font-weight: 800;
    @include flexAlignCenter();
    justify-content: center;
    padding: 0 0.2rem;
    border-radius: 0.06rem;
    background: $common-red;
    cursor: pointer;
  }
}
</style>
