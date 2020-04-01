import axios from "axios";

const userAPI = axios.create({
  baseURL: `https://sunday-fancy-todo.herokuapp.com/users`
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

export const signUp = (userData: SignUpData) => {
  const { firstName, lastName, username, email, password } = userData;
  return async (dispatch: any) => {
    try {
      const { data } = await userAPI.post("/signup", {
        firstName,
        lastName,
        username,
        email,
        password
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const signIn = (userData: SignInData) => {
  const { userIdentifier, password } = userData;
  return async (dispatch: any) => {
    try {
      const { data } = await userAPI.post("/signin", {
        userIdentifier,
        password
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};
