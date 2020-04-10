import axios from "axios";
import { decideAPI } from '../utils/config';

const baseURL = decideAPI('users');

export const userAPI = axios.create({
  baseURL
});

userAPI.post('/signin', {userIdentifier: 'jack', password: '123'}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

interface SignInData {
  userIdentifier: string;
  password: string;
}

export const signInCompleted = (userData: SignInData) => ({
  type: "SIGN_IN",
  payload: {
    userData,
  },
});
