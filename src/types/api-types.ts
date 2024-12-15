import { Product, User } from "./types";

//which is api response which return
export type MesssageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  data: User;
};

export type ProductResponse = {
  seccess: boolean;
  data: Product[];
};

export type ProductCategoryRespponse = {
  seccess: boolean;
  data: string[];
};

export type SearchProductResponse = {
  seccess: boolean;
  data: {
    products: Product[];
    totalPage: number;
  };
};

export type SearchProductRequest = {
  search: string;
  sort: string;
  page: number;
  price: number;
  category: string;
};

export type NewProductRequest = {
  id: string;
  formData: FormData; //js types
};
