import {
  getLocalStorage,
  setLocalStorage,
  USER_INFO,
} from '../contexts/authContext';

export const getUserName = () => {
  const user = JSON.parse(decodeURIComponent(getLocalStorage(USER_INFO)));
  return user?.fullName;
};

export const getAccountName = () => {
  const user = JSON.parse(decodeURIComponent(getLocalStorage(USER_INFO)));
  return user?.userName;
};

export const getUserID = () => {
  const user = JSON.parse(decodeURIComponent(getLocalStorage(USER_INFO)));
  return user?.userID;
};
