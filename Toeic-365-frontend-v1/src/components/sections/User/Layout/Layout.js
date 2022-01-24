import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Layout as LayoutAntd, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  DashboardOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import './layout.scss';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import { Loading } from '../../../atomics/base/Loading/Loading';
import Button from '../../../atomics/base/Button/Button';
import Input from '../../../atomics/base/Input/Input';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';

const { Header, Sider, Content } = LayoutAntd;
const { SubMenu } = Menu;

Layout.propTypes = {
  title: PropTypes.any,
  rightButtons: PropTypes.array,
};

Layout.defaultProps = {
  title: null,
  rightButtons: [],
};

function Layout(props) {
  const { title, rightButtons, children } = props;
  const history = useNavigate();

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
  const SCREEN_WIDTH = 1080;

  const [expandedMenu, setExpandedMenu] = useState(false);
  const [menuItemSelected, setmenuItemSelected] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [width, height] = useWindowResize();
  const location = useLocation();

  useEffect(() => {
    if (width > SCREEN_WIDTH) {
      setExpandedMenu(false);
    }
  }, [width]);

  const handleChangePage = (path) => {
    history(path);
  };

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

  const handleLogin = () => {
    history('/login');
  };

  const handleRegister = () => {
    history('/register');
  };

  const handleExpanedMenu = () => {
    setExpandedMenu(!expandedMenu);
  };
  //#endregion

  return (
    <LayoutAntd>
      <div
        className={buildClass([
          'toe-layout-user-page-container',
          width <= SCREEN_WIDTH && 'toe-layout-user-page-container__1024',
        ])}
      >
        <div className="toe-layout-user-page-container__header">
          {expandedMenu && (
            <div className="toe-expanded-menu">{renderMenu()}</div>
          )}
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
        <div className="toe-layout-user-page-container__body">{children}</div>
      </div>
    </LayoutAntd>
  );
}

export default Layout;
