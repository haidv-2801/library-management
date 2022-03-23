import React, { useEffect, useContext } from 'react';
import { Route, Routes, Link, BrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';
import UserPage from './components/pages/admin/UserPage/UserPage';
import Test from './components/pages/test/Test';
import HomePage from './components/pages/user/HomePageLib/HomePage';
import {
  AuthContext,
  TOKEN_KEY,
  USER_INFO,
  getLocalStorage,
  getCookie,
} from './contexts/authContext';
import Layout from './components/sections/Admin/Layout/Layout';
import CommonListItemPage from './components/pages/user/CommonListItemPage/CommonListItemPage';
import './main.scss';

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Thư viện 365';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/admin"
          element={
            authCtx.isSysAdmin() ? (
              <Navigate exact to="/admin/user" />
            ) : (
              <Navigate exact to="/home" />
            )
          }
        />

        <Route exact path="/">
          <Route exact path="home" element={<HomePage />} />
          <Route exact path="login" element={<LoginPage />} />
          <Route exact path="register" element={<RegisterPage />} />
          <Route
            exact
            path="about"
            element={<CommonListItemPage titlePage="Giới thiệu" />}
          />
          <Route
            exact
            path="resources"
            element={<CommonListItemPage titlePage="Tài nguyên - bộ sưu tập" />}
          />
          <Route
            exact
            path="services"
            element={<CommonListItemPage titlePage="Dịch vụ - tiện ích" />}
          />
          {/* <Route path="exam/intro/:id" element={<IntroPage />} /> */}

          <Route
            exact
            path=""
            element={true ? <Navigate exact to="/home" /> : null}
          />
        </Route>

        <Route path="/admin">
          {/* <Route path="dashboard" element={<Layout />} /> */}
          <Route path="user" element={<UserPage />} />
        </Route>

        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
