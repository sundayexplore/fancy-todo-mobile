import axios from "axios";
import { decideAPI } from "@/utils/config" ;

interface SignInData {
  userIdentifier: string;
  password: string;
}

const baseURL = decideAPI("users");

export const userAPI = axios.create({
  baseURL
});

export const signInCompleted = (userData: SignInData) => ({
  type: "SIGN_IN",
  payload: {
    userData
  }
});
