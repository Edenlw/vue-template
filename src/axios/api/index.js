import { request } from '@/axios/request/http.js';
export const api = {
  // 登录
  login(data) {
    return request.post(`/login`, data);
  },
  // 注册
  register(data) {
    return request.post(`/register`, data);
  },
  // 创建文章
  addArticle(data) {
    return request.post(`/addArticle`, data);
  }
};
