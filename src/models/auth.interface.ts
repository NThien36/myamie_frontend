import { RoleEnum } from "./app.interface";

export interface AuthInfo {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  role?: RoleEnum;
}

export interface AuthPayload {
  user: AuthInfo;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  account: AuthInfo;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  latitude: number;
  longitude: number;
}

export interface SignupBusinessPayload {
  email: string;
  password: string;
  name: string;
  city: number;
  categories: number[];
}
