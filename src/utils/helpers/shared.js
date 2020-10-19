import { ADMIN, AUTH_TOKEN, CUSTOMER, EMAIL, FIRST_NAME, LAST_NAME, NAME, ROLE } from "../../constants/params";

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(ROLE);
  window.location = "/"
}

export const setStorageOnLoginAdmin = (jsonResponse) => {
  localStorage.setItem(AUTH_TOKEN, jsonResponse.token);
  localStorage.setItem(ROLE, jsonResponse.roles);
}

export const setStorageOnLoginUser = (jsonResponse) => {
  localStorage.setItem(AUTH_TOKEN, jsonResponse.token);
  localStorage.setItem(ROLE, jsonResponse.roles);
}

export const isAdmin = () => {
  return localStorage.getItem(ROLE).split(',').includes(ADMIN);
}

export const isCustomer = () => {
  return localStorage.getItem(ROLE).split(',').includes(CUSTOMER)
}

export const hasAdminPath = () => {
  return window.location.pathname.split('/')[1] === "admin" ? true : false;
}

export const verificationToken = () => {
  return getBase36Rand() + getBase36Rand();
}

const getBase36Rand = () => {
  return Math.random().toString(36).substr(2);
}