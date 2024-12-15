import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase.ts";
import { getUser, useLoginMutation } from "../redux/api-rtk/userAPI.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MesssageResponse } from "../types/api-types.ts";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducers/userReducer.ts";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      // console.log({
      //   name: user.displayName!,
      //   email: user.email!,
      //   photo: user.photoURL!,
      //   gender,
      //   role: "user",
      //   dob: date,
      //   _id: user.uid,
      // });
      const resp = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });
      if ("data" in resp) {
        toast.success(resp.data!.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data.data!));
      } else {
        const error = resp.error as FetchBaseQueryError;
        const errMassage = error.data as MesssageResponse;
        toast.error(errMassage.message);
        dispatch(userNotExist());
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign In Error");
    }
  };
  return (
    <div className="login">
      <div className="main">
        <h1 className="heading">Login</h1>

        <div className="gender">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="bod">
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
