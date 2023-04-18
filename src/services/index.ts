import api from "./api";

import {
  CategoriesResponse,
  ItemsResponse,
  ItemResponse,
  ItemRequest,
} from "./types";

export default {
  getCategories: () => api<CategoriesResponse>("get", "/categories"),
  getItems: () => api<ItemsResponse>("get", "/items"),
  getItem: (params: ItemRequest) =>
    api<ItemResponse>("get", `/items/${params.itemId}`),
};
