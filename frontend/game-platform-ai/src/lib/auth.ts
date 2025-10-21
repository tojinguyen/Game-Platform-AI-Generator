import axios from "axios";
import { LoginRequest, RegisterRequest, OAuthRequest } from "./types";

const API_URL = "http://localhost:7788/api/external/v1";

export const login = async (credentials: LoginRequest) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData: RegisterRequest) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const googleOAuth = async (oauthData: OAuthRequest) => {
  const response = await axios.post(`${API_URL}/google-oauth`, oauthData);
  return response.data;
};
