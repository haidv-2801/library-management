import { getLocalStorage, setLocalStorage } from '../contexts/authContext';
import { LOCAL_STORATE_KEY } from './commonConstant';

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
  const user = JSON.parse(
    decodeURIComponent(getLocalStorage(LOCAL_STORATE_KEY.USER_INFO))
  );
  return user?.fullName;
};

export const getAccountName = () => {
  const user = JSON.parse(
    decodeURIComponent(getLocalStorage(LOCAL_STORATE_KEY.USER_INFO))
  );
  return user?.userName;
};

export const getFullName = () => {
  const user = JSON.parse(
    decodeURIComponent(getLocalStorage(LOCAL_STORATE_KEY.USER_INFO))
  );
  return user?.fullName;
};

export const getUserID = () => {
  const user = JSON.parse(
    decodeURIComponent(getLocalStorage(LOCAL_STORATE_KEY.USER_INFO))
  );
  return user?.userID;
};
