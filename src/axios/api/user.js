import { get, postForm } from '../request/http.js';
const v1 = 'ewell-gastric-cancer-user';

export function login(data) {
  return postForm(`${v1}/user/login`, data);
}

export function logout() {
  return get(`${v1}/user/logout`);
}
