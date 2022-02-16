import React, { useEffect, useContext } from 'react';
import { Route, Routes, Link, BrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';
import UserPage from './components/pages/admin/UserPage/UserPage';

import Test from './components/pages/test/Test';
import HomePage from './components/pages/user/HomePage/HomePage';
import ExamPage from './components/pages/user/ExamPage/ExamPage';
import IntroPage from './components/pages/user/IntroPage/IntroPage';
import {
  AuthContext,
  TOKEN_KEY,
  USER_INFO,
  getLocalStorage,
  getCookie,
} from './contexts/authContext';
import Layout from './components/sections/Admin/Layout/Layout';
import './main.scss';

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Toeic-365';
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
          <Route exact path="exam" element={<ExamPage />} />
          <Route path="exam/intro/:id" element={<IntroPage />} />

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
