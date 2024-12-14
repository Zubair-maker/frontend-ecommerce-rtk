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
