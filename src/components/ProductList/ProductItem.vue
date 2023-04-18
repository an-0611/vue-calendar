<template>
  <ul>
    <li
      v-for="{ id, name, likeCount, price, isSoldOut, image } in products"
      @click="$router.push(`/items/${id}`)"
    >
      <span class="soldout-tick" v-if="isSoldOut">
        <p>{{ $t("PRODUCT_LIST__SOLD_OUT_TICK_TEXT") }}</p>
      </span>
      <div class="img-container">
        <img :src="image" loading="lazy" :alt="name" />
      </div>
      <div class="info-container">
        <div class="name">{{ name }}</div>
        <div class="price-and-like">
          <div class="price">{{ `¥${utils.addCommas(price)}` }}</div>
          <div class="like-box">
            <HeartIcon />
            <span class="quantity">{{ likeCount }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProduct } from "@/store";
import utils from "@/utils";
import HeartIcon from "@/components/Svg/HeartIcon.vue";

const productStore = useProduct();
const { products } = storeToRefs(productStore);
</script>

<style lang="scss" scoped>
ul {
  height: 100%;
  background: transparent;
  color: $main-font-black;
  font-size: 0.18rem;
  font-weight: 600;
  padding-top: 0.1rem;
  text-align: left;
  overflow: hidden auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  li {
    width: 23.8%;
    height: fit-content;
    margin-bottom: 0.1rem;
    position: relative;
    background: #fff;
    cursor: pointer;
    @include rwd($md) {
      width: 31.8%;
    }
    @include rwd($sm) {
      width: 47%;
    }
    .soldout-tick {
      width: 1rem;
      height: 1rem;
      font-size: 0.2rem;
      font-weight: 600;
      letter-spacing: 0.01rem;
      text-align: center;
      background-color: $common-red;
      color: #fff;
      clip-path: polygon(100% 0, 0 0, 0 100%);
      @include position(absolute, $top: 0, $left: 0);
      z-index: map-get($zIndex, soldTick);
      p {
        transform: rotate(-45deg);
        padding-top: 0.05rem;
        @include position(relative, $top: 0.15rem, $left: -0.15rem);
      }
    }
    .img-container {
      width: 100%;
      aspect-ratio: 1 / 1;
      position: relative;
      img {
        object-fit: cover;
        @include position(absolute, $top: 0, $left: 0, $right: 0, $bottom: 0);
        margin: auto;
      }
    }
    .info-container {
      padding: 0.06rem 0.1rem;
      .name {
        @include ellipsis(1);
      }
      .price-and-like {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 0.22rem;
          font-weight: 800;
        }
        .like-box {
          @include flexAlignCenter();
          justify-content: center;
          .heart-icon {
            width: 0.32rem;
            height: 0.32rem;
          }
        }
      }
    }
  }
}
</style>
