import { IUser } from '@/types';

export const signIn = (user: IUser) => ({
  type: 'SIGN_IN',
  payload: {
    user,
  },
});
