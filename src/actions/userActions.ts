import axios from "axios";

export const userAPI = axios.create({
  baseURL: `https://sunday-fancy-todo-api.herokuapp.com/users`,
});

interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  userIdentifier: string;
  password: string;
}

const signUpCompleted = (userData: SignUpData) => ({
  type: "SIGN_UP",
  payload: {
    userData,
  },
});

export const signUp = (userData: SignUpData) => {
  const { firstName, lastName, username, email, password } = userData;
  return async (dispatch: any) => {
    try {
      const { data } = await userAPI.post("/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      dispatch(signUpCompleted(data));
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const signInCompleted = (userData: SignInData) => ({
  type: "SIGN_IN",
  payload: {
    userData,
  },
});
