import axios from 'axios';
import qs from 'qs';
import { Message as iviewMessage } from 'view-design';
// axios.defaults.timeout = 5000;
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
} else if (process.env.NODE_ENV == 'test') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
}

// http request 拦截器
axios.create({
  withCredentials: true
});
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const errorStatus = new Map([
  [400, { error: '错误请求' }],
  [401, { error: '未授权，请重新登录' }],
  [403, { error: '拒绝访问' }],
  [404, { error: '请求错误,未找到该资源' }],
  [405, { error: '请求方法未允许' }],
  [408, { error: '请求超时' }],
  [500, { error: '服务器端出错' }],
  [501, { error: '网络未实现' }],
  [502, { error: '网络错误' }],
  [503, { error: '服务不可用' }],
  [504, { error: '网络超时' }],
  [505, { error: 'http版本不支持该请求' }],
  ['default', { error: '连接错误' }]
]);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    // if (
    //   response.data.code === 10106 &&
    //   process.env.NODE_ENV !== "development"
    // ) {
    //   window.location.href = axios.defaults.baseURL;
    // } else if (
    //   (response.data.code || response.data.code === 0) &&
    //   response.data.code !== 1
    // ) {
    //   iviewMessage.error(response.data.message);
    // }
    return response;
  },
  err => {
    if (err && err.response) {
      const status = err.response.status;
      const error =
        errorStatus.get(status).error ||
        errorStatus.get('default').error + err.response.status;
      iviewMessage.error(error);
    } else {
      iviewMessage.error('连接到服务器失败');
      console.log('连接到服务器失败');
    }
    return Promise.resolve(err.response);
  }
);

export const request = {
  async get(url, data) {
    try {
      let res = await axios.get(url, { params: data });
      res = res.data;
      return new Promise(resolve => {
        resolve(res);
        // if (res.code === 1) {
        //   resolve(res);
        // }
      });
    } catch (err) {
      iviewMessage.error('连接到服务器失败');
      console.log(err);
    }
  },
  async post(url, data, flag) {
    try {
      const headers = flag
        ? { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
        : '';
      const getData = flag ? data : qs.stringify(data);
      let res = await axios.post(url, getData, headers);
      res = res.data;
      return new Promise(resolve => {
        resolve(res);
        // if (res.code === 1) {
        //   resolve(res);
        // }
      });
    } catch (err) {
      iviewMessage.error('连接到服务器失败');
      console.log(err);
    }
  },
  async patch(url, data) {
    try {
      let res = await axios.patch(url, data);
      res = res.data;
      return new Promise(resolve => {
        resolve(res);
        // if (res.code === 1) {
        //   resolve(res);
        // }
      });
    } catch (err) {
      iviewMessage.error('连接到服务器失败');
      console.log(err);
    }
  },
  // 用来导出excel
  async expoertExcel(url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data), { responseType: 'blob', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
      res = res.data;
      return new Promise(resolve => {
        resolve(res);
      });
    } catch (err) {
      iviewMessage.error('连接到服务器失败');
      console.log(err);
    }
  },
  getUrl() {
    return axios.defaults.baseURL;
  }
};
