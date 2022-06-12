import {
  getLocalStorage,
  setLocalStorage,
  USER_INFO,
} from '../contexts/authContext';

/**
 * Phân quyền
 */
export const ROLES = {
  MEMBER: 2,
  ADMIN: 0,
  STAFF: 1,
  GUEST: 3,
};

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
