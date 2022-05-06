import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="toe-not-found-page">
      <a onClick={() => navigate('/')} className="toe-not-found-page__back">
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFoundPage;
