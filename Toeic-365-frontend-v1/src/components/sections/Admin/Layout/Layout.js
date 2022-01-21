import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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
import useOnClickOutside from '../../../../hooks/useClickOutSide';
import PopupSelection from '../../../atomics/base/PopupSelection/PopupSelection';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';

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

  //#region constant
  const DEFAULT_ITEM = '/admin/dashboard';
  const DEFAULT_TITLE = 'Tổng quan';

  const MENU = [
    {
      key: DEFAULT_ITEM,
      title: DEFAULT_TITLE,
      icon: <DashboardOutlined />,
    },
    { key: 'separator' },
    {
      key: '/admin/de-thi',
      title: 'Quản lý đề thi',
      icon: <UserOutlined />,
    },
    {
      key: '/admin/phan-thi',
      title: 'Quản lý phần thi',
      icon: <UploadOutlined />,
    },
    { key: 'separator' },
    {
      key: '/admin/nhom-cau-hoi',
      title: 'Quản lý nhóm câu hỏi',
      icon: <QuestionCircleOutlined />,
    },
    {
      key: '/admin/cau-hoi',
      title: 'Quản lý câu hỏi',
      icon: <QuestionCircleOutlined />,
    },
    { key: 'separator' },
    {
      key: '/admin/tai-khoan',
      title: 'Quản lý tài khoản',
      icon: <UserOutlined />,
    },
  ];

  const POPUP_SELECTION_OPTIONS = [
    { label: 'Thông tin người dùng', value: 1 },
    { label: <span style={{ color: 'red' }}>Đăng xuất</span>, value: 2 },
  ];
  //#endregion
  const popupSelectionRef = useRef();
  //#region ref

  //#endregion

  //#region  state
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [isShowPopupSelection, setIsShowPopupSelection] = useState(false);
  const [menuItemSelected, setmenuItemSelected] = useState(DEFAULT_TITLE);
  const [userSelectValue, setUserSelectValue] = useState();
  const [width, height] = useWindowResize();

  useOnClickOutside(popupSelectionRef, () => {
    setIsShowPopupSelection(false);
  });

  //#endregion

  //#region method
  useEffect(() => {
    document.title = 'Toeic-365';
  }, []);

  useEffect(() => {
    if (width < 1366) {
      setCollapsedMenu(true);
    } else {
      setCollapsedMenu(false);
    }
  }, [width]);

  const handleCollapsed = (state) => {
    setCollapsedMenu(state);
  };

  const renderMenu = () => {
    return MENU.map((item) => {
      if (item?.key === 'separator') {
        return <div className="toe-line-separator"></div>;
      }
      if (item?.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {item.children.map((child) => (
              <Menu.Item
                style={!collapsedMenu ? { paddingLeft: 16 } : {}}
                key={child.key}
                icon={child.icon}
              >
                {child.title}
              </Menu.Item>
            ))}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            style={!collapsedMenu ? { paddingLeft: 16 } : {}}
            key={item.key}
            icon={item.icon}
          >
            {item.title}
          </Menu.Item>
        );
      }
    });
  };

  const renderRightButtons = () => {
    return rightButtons.map((btn) => btn);
  };

  const handleSelectMenuItem = (data) => {
    // history(data.key);
    setmenuItemSelected(data?.domEvent?.currentTarget?.innerText);
  };

  const handleShowOption = () => {
    setUserSelectValue(null);
    setIsShowPopupSelection(true);
  };
  //#endregion

  return (
    <LayoutAntd>
      <div className="toe-layout-admin-page-container">
        <div className="toe-layout-admin-page-container__header">
          <div className="toe-layout-admin-page-container__header-left">
            <img className="logo-app" src={MainLogo} alt="toeic-365" />
            <b className="name-app">
              TOEIC<span style={{ color: '#43c1c9' }}>365</span>
            </b>
          </div>
          <div className="toe-layout-admin-page-container__header-right">
            <div className="user-name">DOVANHAI</div>
            <div onClick={handleShowOption} className="user-avatar">
              <img src={Avatar} alt="avatar" />
            </div>
            {isShowPopupSelection && (
              <span ref={popupSelectionRef}>
                <PopupSelection
                  defaultValue={userSelectValue}
                  onChange={(data) => {
                    setUserSelectValue(data.value);
                    setIsShowPopupSelection(false);
                  }}
                  options={POPUP_SELECTION_OPTIONS}
                />
              </span>
            )}
          </div>
        </div>
        <div className="toe-layout-admin-page-container__body">
          <div className="toe-layout-admin-page-container__body-left">
            <Sider
              collapsible
              collapsed={collapsedMenu}
              onCollapse={handleCollapsed}
            >
              <div className="logo" />
              <Menu
                onSelect={handleSelectMenuItem}
                theme="dark"
                defaultSelectedKeys={[DEFAULT_ITEM]}
                mode="inline"
              >
                {renderMenu()}
              </Menu>
            </Sider>
          </div>
          <div className="toe-layout-admin-page-container__body-right">
            <div className="toe-layout-admin-page-container__body-right__head">
              <div className="toe-layout-admin-page-container__body-right__head-title">
                {title || (
                  <div className="toe-font-large-title">{menuItemSelected}</div>
                )}
              </div>
              <div className="toe-layout-admin-page-container__body-right__head-btns">
                {renderRightButtons()}
              </div>
            </div>
            <div className="toe-layout-admin-page-container__body-right__body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </LayoutAntd>
  );
}

export default Layout;
