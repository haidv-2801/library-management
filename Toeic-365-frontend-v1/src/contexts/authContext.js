import React, { useState } from 'react';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'TOKEN_KEY';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const initialToken = decodeURIComponent(localStorage.getItem(TOKEN_KEY));
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem(TOKEN_KEY, encodeURIComponent(token));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
