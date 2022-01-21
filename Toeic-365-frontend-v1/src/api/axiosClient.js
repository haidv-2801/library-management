import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let header = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  headers: { ...header },
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
export { header };
