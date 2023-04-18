<template>
  <div id="ProductDetail">
    <DetailTopBar />
    <DetailContent />
    <PurchaseField />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import DetailTopBar from "@/components/ProductDetail/DetailTopBar.vue";
import DetailContent from "@/components/ProductDetail/DetailContent.vue";
import PurchaseField from "@/components/ProductDetail/PurchaseField.vue";
import { useProduct } from "@/store";

const productStore = useProduct();
const { getItem } = productStore;

onMounted(() => {
  const route = useRoute();
  const itemId = String(route.params.id);
  getItem({ itemId });
});
</script>

<style lang="scss" scoped>
#ProductDetail {
  @include position(relative);
  border-bottom: 0.03rem solid #f0f0f0;
  background: #eef0ec;
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
