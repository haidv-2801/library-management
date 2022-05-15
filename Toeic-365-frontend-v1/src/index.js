import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import AuthContextProvider from './contexts/authContext';
import CartContextProvider from './contexts/cartContext';
import './assets/fonts/font.scss';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
