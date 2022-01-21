import React, { useEffect } from 'react';
import { Route, Routes, Link, BrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';

import Test from './components/pages/test/Test';
import Layout from './components/sections/Admin/Layout/Layout';
import './main.scss';

function App() {
  useEffect(() => {
    document.title = 'Toeic-365';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/admin"
          element={true ? <Navigate exact to="/admin/dashboard" /> : null}
        />

        <Route exact path="/">
          <Route exact path="login" element={<LoginPage />} />
          <Route exact path="register" element={<RegisterPage />} />
          <Route
            exact
            path=""
            element={true ? <Navigate exact to="/login" /> : null}
          />
        </Route>

        <Route path="/admin">
          <Route path="dashboard" element={<Layout />} />
        </Route>

        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
