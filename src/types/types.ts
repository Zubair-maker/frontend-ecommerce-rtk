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
