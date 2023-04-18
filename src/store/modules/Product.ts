import { defineStore } from "pinia";
import services from "@/services";
import { ProductStateType, ItemRequest } from "@/services/types";

const state = (): ProductStateType => ({
  categories: null,
  products: null,
  currentCategory: null,
  productDetail: null,
});

// defineStore will dynamic register module => return hook function
export default defineStore("Product", {
  state,
  actions: {
    initEvent() {
      this.getCategories();
      this.getItems();
    },
    async getCategories() {
      const res = await services.getCategories();
      if (res.data) {
        this.$patch({ categories: res.data });
        const initCategoryId = res.data[0]?.id;
        if (!this.currentCategory && initCategoryId)
          this.$patch({ currentCategory: initCategoryId });
      }
    },
    async getItems() {
      const res = await services.getItems();
      if (res.data) this.$patch({ products: res.data });
    },
    async getItem({ itemId }: ItemRequest) {
      const res = await services.getItem({ itemId });
      if (res) this.$patch({ productDetail: res });
    },
    resetBackToMainPage() {
      // @ts-ignore
      this.$router.push("/");
      this.$patch({ productDetail: null });
    },
    toggleCategoryTab({ itemId }: ItemRequest) {
      this.$patch({ currentCategory: itemId });
    },
  },
  getters: {},
});
