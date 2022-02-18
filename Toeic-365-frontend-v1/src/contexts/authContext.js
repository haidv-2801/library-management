import React, { useState } from 'react';
import cookie from 'js-cookie';

const TOKEN_KEY = 'TOKEN_KEY';
const USER_INFO = 'USER_INFO';
const ROLE_ADMIN = 'ROLE_ADMIN';

const getLocalStorage = (key) => {
  return decodeURIComponent(localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, encodeURIComponent(value));
};

const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

const setCookie = (key, value) => {
  return cookie.set(key, value);
};

const getCookie = (key) => {
  return cookie.get(key);
};

const removeCookie = (key) => {
  return cookie.remove(key);
};

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token, userInfo) => {},
  logout: () => {},
  auth: () => {},
  isSysAdmin: () => {},
  notSysAdmin: () => {},
});

const AuthContextProvider = (props) => {
  const initialToken = getCookie(TOKEN_KEY);
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, userInfo) => {
    setToken(token);
    setLocalStorage(USER_INFO, JSON.stringify(userInfo));
    setCookie(TOKEN_KEY, token);
  };

  const logoutHandler = () => {
    setToken(null);
    removeLocalStorage(USER_INFO);
    removeCookie(TOKEN_KEY);
  };

  const isSysAdmin = () => {
    return auth()?.roles?.includes(ROLE_ADMIN);
  };

  const notSysAdmin = () => {
    return !auth()?.roles?.includes(ROLE_ADMIN);
  };

  const auth = () => {
    if (userIsLoggedIn) {
      try {
        const user = JSON.parse(getLocalStorage(USER_INFO));
        if (user) return user;
      } catch {
        return null;
      }
    }
    return null;
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    auth: auth,
    isSysAdmin: isSysAdmin,
    notSysAdmin: notSysAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {
  getLocalStorage,
  setLocalStorage,
  removeCookie,
  removeLocalStorage,
  setCookie,
  getCookie,
  TOKEN_KEY,
  USER_INFO,
};

export default AuthContextProvider;
