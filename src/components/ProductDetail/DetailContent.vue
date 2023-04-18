<template>
  <div id="DetailContent" v-if="productDetail">
    <div class="img-container">
      <img :src="productDetail.image" :alt="productDetail.name" />
    </div>
    <div class="name">{{ productDetail.name }}</div>
    <div class="buttons">
      <div class="left-buttons">
        <div class="nice-box">
          <span class="button">
            <HeartIcon />
            {{ $t("PRODUCT_DETAIL__LIKE_BUTTON_TEXT") }}
          </span>
          <span class="quantity">{{ productDetail.likeCount }}</span>
        </div>
        <div class="comment-box">
          <span class="button">
            <CommentIcon />
            {{ $t("PRODUCT_DETAIL__COMMENT_BUTTON_TEXT") }}
          </span>
        </div>
      </div>
      <div class="right-buttons">
        <span class="flag-box">
          <FlagIcon />
        </span>
      </div>
    </div>
    <div class="desc-title">{{ $t("PRODUCT_DETAIL__PRODUCT_DESC_TEXT") }}</div>
    <div class="desc-content" v-html="productDetail.description" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProduct } from "@/store";
import HeartIcon from "@/components/Svg/HeartIcon.vue";
import CommentIcon from "@/components/Svg/CommentIcon.vue";
import FlagIcon from "@/components/Svg/FlagIcon.vue";

const productStore = useProduct();
const { productDetail } = storeToRefs(productStore);
</script>

<style lang="scss" scoped>
$common-padding: 0 0.3rem;
#DetailContent {
  margin: auto;
  background: #fff;
  .img-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    max-width: 600px;
    margin: auto;
    img {
      object-fit: cover;
      @include position(absolute, $top: 0, $left: 0, $right: 0, $bottom: 0);
      margin: auto;
    }
  }
  .name {
    font-size: 0.28rem;
    text-align: left;
    padding: $common-padding;
  }
  .buttons {
    height: 0.9rem;
    padding: $common-padding;
    color: $main-font-deep-gray;
    @include flexAlignCenter();
    .left-buttons {
      height: 100%;
      font-size: 0.24rem;
      @include flexAlignCenter();
      flex: 1 1 auto;
      .nice-box,
      .comment-box {
        @include flexAlignCenter();
        .button {
          height: 0.5rem;
          border-radius: 0.5rem;
          padding: 0.15rem;
          background: $common-light-gray;
          cursor: pointer;
          @include flexAlignCenter();
        }
      }
      .nice-box {
        .heart-icon {
          width: 0.6rem;
          height: 0.6rem;
        }
        .quantity {
          font-size: 0.28rem;
          font-weight: 600;
          margin: 0 0.4rem 0 0.05rem;
        }
      }
      .comment-box {
        .comment-icon {
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.1rem;
        }
      }
    }
    .right-buttons {
      height: 100%;
      @include flexAlignCenter();
      .flag-box {
        width: 0.55rem;
        height: 0.55rem;
        background: $common-light-gray;
        border-radius: 50%;
        cursor: pointer;
        @include flexAlignCenter();
        justify-content: center;
        .flag-icon {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
    }
  }
  .desc-title,
  .desc-content {
    font-size: 0.24rem;
    text-align: left;
  }
  .desc-title {
    height: 0.8rem;
    line-height: 1.15rem;
    color: $main-font-deep-gray;
    padding: $common-padding;
    background: $common-light-gray;
  }
  .desc-content {
    padding: 0.1rem 0.3rem 1.4rem;
    @include rwd($sm) {
      padding: 0.1rem 0.3rem 1.85rem;
    }
  }
}
</style>
