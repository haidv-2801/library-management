import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { TOKEN_KEY, getCookie } from '../contexts/authContext';

let header = {
  'Content-type': 'application/json; charset=UTF-8',
};

const authHeader = () => {
  let token = getCookie(TOKEN_KEY);
  if (token) {
    return {
      Accept: '*',
      Authorization: 'Bearer ' + token,
    };
  } else {
    return {};
  }
};

header = { ...header, ...authHeader() };

const axiosClient = axios.create({
  headers: { ...authHeader() },
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
