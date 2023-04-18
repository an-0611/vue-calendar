<template>
  <div class="exhibit-button">
    <span class="text">{{ $t("PRODUCT_LIST__EXHIBIT_BUTTON_TEXT") }}</span>
    <CameraIcon />
  </div>
</template>

<script setup lang="ts">
import CameraIcon from "@/components/Svg/CameraIcon.vue";
</script>

<style lang="scss" scoped>
.exhibit-button {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: $common-red;
  @include position(fixed, $right: -0.28rem, $bottom: -0.28rem);
  z-index: map-get($zIndex, exhibitButton);
  .text {
    color: #fff;
    font-size: 0.2rem;
    font-weight: 500;
  }
  .camera-icon {
    width: 0.8rem;
    height: 0.8rem;
    margin: -0.2rem auto 0;
  }
}
</style>
