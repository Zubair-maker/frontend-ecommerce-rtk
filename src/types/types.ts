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
  pinCode: string;
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
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}

//in mogoDB ->orderItemArray
// productName:"Nokia 11"
// photo:"uploads\079af12c-58bf-4321-841e-12e5eecbabdf.jpeg"
// price:5000
// quantity:2
// productId:674ea9360e687f314f9ad33d
// _id:6763b9e5fb3b0868bd643510
export type OrderItem = {
  productName: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  _id: string;
};

export type Order = {
  _id: string;
  orderItem: OrderItem[];
  shippingInfo: ShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
};
//order=data
export type Data<T> = {
  data: T;
};
