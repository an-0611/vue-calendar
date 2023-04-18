export type Nullable<T> = null | T;

// Request
export type ItemRequest = {
  itemId: string;
};

// Response
export interface CategoriesResponse {
  data: CategoryTypes[];
}

export interface ItemsResponse {
  data: {
    id: string;
    name: string;
    description: string;
    likeCount: number;
    commentCount: number;
    price: number;
    isSoldOut: boolean;
    shippingFee: string;
    image: string;
    categoryId: number;
  }[];
}

export interface ItemResponse {
  id: string;
  name: string;
  description: string;
  likeCount: number;
  commentCount: number;
  price: number;
  isSoldOut: boolean;
  shippingFee: string;
  image: string;
  categoryId: number;
}

// State
export interface CategoryTypes {
  id: string;
  name: string;
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  likeCount: number;
  commentCount: number;
  price: number;
  isSoldOut: boolean;
  shippingFee: string;
  image: string;
  categoryId: number;
}

export interface ProductStateType {
  categories: Nullable<CategoryTypes[]>;
  products: Nullable<ProductType[]>;
  currentCategory: Nullable<string>;
  productDetail: Nullable<ProductType>;
}
