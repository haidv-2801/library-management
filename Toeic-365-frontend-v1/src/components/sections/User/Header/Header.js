import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../atomics/base/Input/Input';
import Button from '../../../atomics/base/Button/Button';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import { AuthContext } from '../../../../contexts/authContext';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import PopupSelectionV1 from '../../../atomics/base/PopupSelectionV1/PopupSelection';

import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';

import './header.scss';
import UserInfo from '../../UserInfo/UserInfo';

Header.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  showNav: PropTypes.bool,
};

Header.defaultProps = {
  id: '',
  className: '',
  style: {},
  showNav: true,
};

function Header(props) {
  const { id, style, className, showNav } = props;
  const authCtx = useContext(AuthContext);

  const POPUP_SELECTION_OPTIONS = [
    {
      label: 'Tài liệu in',
      value: 2,
    },
    {
      label: 'Tài liệu số',
      value: 3,
    },
    {
      label: <span className="toe-font-label">Học liệu mở</span>,
      value: 4,
    },
  ];

  const MENU = [
    {
      key: '/home',
      title: 'TRANG CHỦ',
    },
    {
      key: '/about',
      title: 'GIỚI THIỆU',
    },
    {
      key: '/resources',
      title: 'TÀI NGUYÊN - BỘ SƯU TẬP',
      subMenu: POPUP_SELECTION_OPTIONS,
    },
    {
      key: '/services',
      title: 'DỊCH VỤ - TIỆN ÍCH',
    },
    {
      key: '/search',
      title: 'TRA CỨU',
      redirect: 'http://opac.utc.edu.vn/',
    },
  ];

  const history = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderMenu = () => {
    return MENU.map((item) => {
      if (!item?.subMenu)
        return (
          <div
            onClick={() => handleChangePage(item)}
            key={item.key}
            className="menu-item toe-font-label"
          >
            {item.title}
          </div>
        );

      return (
        <PopupSelectionV1
          key={item.key}
          onChange={(data) => {}}
          options={item?.subMenu}
          trigger="hover"
          className="toe-layout-user-page-container__header__submenu"
          placement="bottom"
        >
          <div
            onClick={() => handleChangePage(item.key)}
            className="menu-item toe-font-label"
          >
            {item.title}
          </div>
        </PopupSelectionV1>
      );
    });
  };

  const handleChangePage = (item) => {
    if (item?.redirect) {
      window.open(item?.redirect, '_blank');
      // window.location.replace(item.redirect);
    } else {
      history(item.key);
    }
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
          Thư viện<span style={{ color: '#43c1c9' }}>365</span>
        </b>
      </div>
      <div className="toe-layout-user-page-container__header-right">
        {showNav && (
          <>
            {renderMenu()}
            {!authCtx.isLoggedIn ? (
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
            ) : (
              <UserInfo />
            )}
            <Button
              className="toe-btn-toggle"
              leftIcon={<i className="pi pi-bars" />}
              type={BUTTON_TYPE.LEFT_ICON}
              theme={BUTTON_THEME.THEME_4}
              onClick={handleExpanedMenu}
            />
          </>
        )}

        {!showNav && (
          <Button
            type={BUTTON_TYPE.LEFT_ICON}
            theme={BUTTON_THEME.THEME_6}
            onClick={() => window.history.back()}
            leftIcon={<i className="pi pi-angle-double-left"></i>}
            name={'Danh sách bài test'}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
