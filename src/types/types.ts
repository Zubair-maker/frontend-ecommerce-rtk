export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

//userReducer types
export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

//product-types
export type Product = {
  productName: string;
  category: string;
  photo: string;
  stock: number;
  price: number;
  _id: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  photo: string;
  quantity: number;
  price: number;
  stock: number;
};

//cartReducer types
export interface CartReducerInitialState {
  cartItems: CartItem[];
  loading: boolean;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
