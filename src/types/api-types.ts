import { User } from "./types";

//which is api response which return
export type MesssageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  data: User;
};
