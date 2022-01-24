import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let header = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  headers: { ...header },
  timeout: 60 * 1000, //timeout khi request chạm đến -> hủy bỏ request
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
export { header };
