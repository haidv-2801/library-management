import {
  getLocalStorage,
  setLocalStorage,
  USER_INFO,
} from '../contexts/authContext';

export const getUserName = () => {
  const user = JSON.parse(decodeURIComponent(getLocalStorage(USER_INFO)));
  return user?.fullName;
};
