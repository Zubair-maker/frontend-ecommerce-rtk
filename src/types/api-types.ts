import { CartItem, Order, Product, ShippingInfo, User } from "./types";

//which is api response which return
export type MesssageResponse = {
  success: boolean;
  message: string;
};
//allUsers
export type AllUserResponse = {
  success: boolean;
  data: [];
};
export type UserResponse = {
  success: boolean;
  data: User;
};

export type ProductResponse = {
  seccess: boolean;
  data: Product[];
};

export type ProductDetailsResponse = {
  seccess: boolean;
  data: Product;
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

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};
//deleteUser
export type DeleteUserRequest = {
  userId: string;
  adminId: string;
};
//order
export type placeOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItem: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};
//get-myorder
export type AllOrderResponse = {
  success: boolean;
  data: Order[];
};
export type AllOrderRequest = {
  seccess: boolean;
  data: Order[];
};
//singleOrder
export type singleOrderResponse = {
  seccess: boolean;
  data: Order;
};
//status
export type UpdateOrderRequest = {
  adminId: string;
  orderId: string;
};
