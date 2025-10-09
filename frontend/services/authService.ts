import { auth } from '../lib/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// The old code is commented out below.
// import apiService from './apiService';
// import { User } from '../types';

// interface LoginResponse {
//   token: string;
//   user: User;
// }

// export const login = async (credentials: any) => {
//   const response = await apiService.post<LoginResponse>('/account/login', credentials);
//   return response.data;
// };

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
