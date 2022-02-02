import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../atomics/base/Input/Input';
import Button from '../../../atomics/base/Button/Button';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';

import './header.scss';

Header.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Header.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function Header(props) {
  const { id, style, className } = props;

  const MENU = [
    {
      key: '/home',
      title: 'Trang chủ',
    },
    {
      key: '/exam',
      title: 'Làm bài TEST',
    },
    {
      key: '/discuss',
      title: 'Thảo luận',
    },
  ];

  const history = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderMenu = () => {
    return MENU.map((item) => (
      <div
        onClick={() => handleChangePage(item.key)}
        key={item.key}
        className="menu-item toe-font-label"
      >
        {item.title}
      </div>
    ));
  };

  const handleChangePage = (path) => {
    history(path);
  };

  const handleLogin = () => {
    history('/login');
  };

  const handleRegister = () => {
    history('/register');
  };

  const handleExpanedMenu = () => {
    setExpandedMenu(!expandedMenu);
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass([
        'toe-layout-user-page-container__header',
        className,
      ])}
    >
      {expandedMenu && <div className="toe-expanded-menu">{renderMenu()}</div>}
      <div className="toe-layout-user-page-container__header-left">
        <img className="logo-app" src={MainLogo} alt="toeic-365" />
        <b className="name-app">
          TOEIC<span style={{ color: '#43c1c9' }}>365</span>
        </b>
      </div>
      <div className="toe-layout-user-page-container__header-right">
        {renderMenu()}
        {!isLoggedIn && (
          <>
            <Button
              className="toe-btn-login"
              style={{ marginLeft: 16 }}
              name="Đăng nhập"
              theme={BUTTON_THEME.THEME_5}
              onClick={handleLogin}
            />
            <Button
              className="toe-btn-register"
              style={{ marginLeft: 16 }}
              name="Đăng ký"
              theme={BUTTON_THEME.THEME_4}
              onClick={handleRegister}
            />
          </>
        )}
        <Button
          className="toe-btn-toggle"
          leftIcon={<i className="pi pi-bars" />}
          type={BUTTON_TYPE.LEFT_ICON}
          theme={BUTTON_THEME.THEME_4}
          onClick={handleExpanedMenu}
        />
      </div>
    </div>
  );
}

export default Header;
