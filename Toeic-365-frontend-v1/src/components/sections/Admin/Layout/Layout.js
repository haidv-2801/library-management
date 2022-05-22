import {
  DashboardOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout as LayoutAntd, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import MainLogo from '../../../../assets/images/toeiclogo.png';
import MainLogo from '../../../../assets/images/logo_utc.jpg';
import useOnClickOutside from '../../../../hooks/useClickOutSide';
import useWindowResize from '../../../../hooks/useWindowResize';
import Loading from '../../../atomics/base/Loading/Loading';
import UserInfo from '../../UserInfo/UserInfo';
import PopupSelectionV1 from '../../../atomics/base/PopupSelectionV1/PopupSelection';
import './layout.scss';
import END_POINT from '../../../../constants/endpoint';
import { OPERATOR, SORT_TYPE } from '../../../../constants/commonConstant';
import baseApi from '../../../../api/baseApi';
import moment from 'moment';
import { Skeleton } from 'primereact/skeleton';

const { Header, Sider, Content } = LayoutAntd;
const { SubMenu } = Menu;

Layout.propTypes = {
  title: PropTypes.any,
  rightButtons: PropTypes.array,
  hasBackBtn: PropTypes.bool,
  back: PropTypes.func,
  className: PropTypes.string,
};

Layout.defaultProps = {
  title: null,
  rightButtons: [],
  hasBackBtn: false,
  className: '',
  back: () => {},
};

function Layout(props) {
  const { title, rightButtons, children, hasBackBtn, back, className } = props;

  //#region constant
  const DEFAULT_ITEM = '/admin/dashboard';
  const DEFAULT_TITLE = 'Tổng quan';
  const SCREEN_WIDTH = 1366;

  const MENU = [
    {
      key: DEFAULT_ITEM,
      title: DEFAULT_TITLE,
      icon: <DashboardOutlined />,
    },
    {
      key: '/admin/system',
      title: 'Hệ thống',
      icon: <UserOutlined />,
      children: [
        {
          key: '/admin/systems/user',
          title: 'Tài khoản',
        },
        {
          key: '/admin/systems/role',
          title: 'Chức năng',
        },
        {
          key: '/admin/systems/permission',
          title: 'Phân quyền',
        },
        {
          key: '/admin/systems/menu',
          title: 'Menu',
        },
      ],
    },
    {
      key: '/admin/tin-tuc',
      title: 'Tin tức',
      icon: <UserOutlined />,
      children: [
        {
          key: '/admin/tin-tuc/post',
          title: 'Bài viết',
        },
        {
          key: '/admin/tin-tuc/page',
          title: 'Trang',
        },
        {
          key: '/admin/tin-tuc/slide',
          title: 'Slide',
        },
        {
          key: '/admin/yeu-cau-gop-y',
          title: 'Yêu cầu góp ý',
        },
      ],
    },
    {
      key: '/admin/danh-muc',
      title: 'Danh mục',
      icon: <UserOutlined />,
      children: [
        {
          key: '/admin/danh-muc/ban-doc',
          title: 'Bạn đọc',
        },
        {
          key: '/admin/danh-muc/sach',
          title: 'Ấn phẩm',
        },
        {
          key: '/admin/danh-muc/muon-tra',
          title: 'Mượn trả',
        },
      ],
    },
  ];

  const POPUP_SELECTION_VALUES = {
    LOGOUT: 1,
    USER_INFOMATION: 2,
  };

  const POPUP_SELECTION_OPTIONS = [
    {
      label: 'Thông tin người dùng',
      value: POPUP_SELECTION_VALUES.USER_INFOMATION,
    },
    {
      label: <span style={{ color: 'red' }}>Đăng xuất</span>,
      value: POPUP_SELECTION_VALUES.LOGOUT,
    },
  ];
  //#endregion
  const popupSelectionRef = useRef();
  //#region ref

  //#endregion

  //#region  state
  const history = useNavigate(DEFAULT_ITEM);
  const location = useLocation();
  const appSelector = useSelector((store) => store.app);
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [isShowPopupSelection, setIsShowPopupSelection] = useState(false);
  const [menuItemSelected, setmenuItemSelected] = useState(DEFAULT_TITLE);
  const [userSelectValue, setUserSelectValue] = useState();
  const [width, height] = useWindowResize();
  const [notificationPaging, setNotificationPaging] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  const [dataNotifications, setDataNotifications] = useState({
    data: [],
    isLoading: false,
  });

  useOnClickOutside(popupSelectionRef, () => {
    setIsShowPopupSelection(false);
  });

  //#endregion

  //#region method
  useEffect(() => {
    document.title = 'Thư viện-365';

    //get notificaiton
    getNotification();
  }, []);

  useEffect(() => {
    if (width < SCREEN_WIDTH) {
      setCollapsedMenu(true);
    } else {
      setCollapsedMenu(false);
    }
  }, [width]);

  const getNotification = () => {
    setDataNotifications({ ...dataNotifications, isLoading: true });
    let _filter = [
      ['IsDeleted', OPERATOR.EQUAL, '0'],
      OPERATOR.AND,
      ['Status', OPERATOR.EQUAL, '1'],
    ];
    baseApi.post(
      (res) => {
        let _data = res.data.pageData;

        setDataNotifications({ data: _data, isLoading: false });
      },
      (err) => {
        setDataNotifications({ ...dataNotifications, isLoading: false });
      },
      () => {},
      END_POINT.TOE_GET_NOTIFICATIONS_FILTER,
      {
        filter: btoa(JSON.stringify(_filter)),
        pageSize: notificationPaging.pageSize,
        pageIndex: notificationPaging.pageIndex,
        sort: JSON.stringify([['CreatedDate', SORT_TYPE.DESC]]),
      },
      null
    );
  };

  const handleCollapsed = (state) => {
    setCollapsedMenu(state);
  };

  const renderMenu = () => {
    return MENU.map((item, _) => {
      if (item?.key === 'separator') {
        return <div key={_} className="toe-line-separator"></div>;
      }
      if (item?.children) {
        return (
          <SubMenu theme="light" key={item.key} title={item.title}>
            {item.children.map((child) => (
              <Menu.Item
                // style={!collapsedMenu ? { paddingLeft: 16 } : {}}
                className="admin-menu"
                key={child.key}
              >
                {child.title}
              </Menu.Item>
            ))}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            className="admin-menu"
            // style={!collapsedMenu ? { paddingLeft: 16 } : {}}
            key={item.key}
          >
            {item.title}
          </Menu.Item>
        );
      }
    });
  };

  const renderRightButtons = () => {
    return rightButtons.map((btn, _) => <div key={_}>{btn}</div>);
  };

  const handleSelectMenuItem = (data) => {
    history(data.key);
    // setmenuItemSelected(data?.domEvent?.currentTarget?.innerText);
  };

  const handleShowOption = () => {
    setUserSelectValue(null);
    setIsShowPopupSelection(true);
  };
  //#endregion

  return (
    <LayoutAntd className={className}>
      <div className="toe-layout-admin-page-container">
        <div className="toe-layout-admin-page-container__header">
          <div
            onClick={() => {
              history('/');
            }}
            className="toe-layout-admin-page-container__header-left"
          >
            <img className="logo-app" src={MainLogo} alt="Thư viện GTVT" />
            {/* <b className="name-app">
              Thư viện <span style={{ color: '#43c1c9' }}>GTVT</span>
            </b> */}
          </div>
          <div className="toe-layout-admin-page-container__header-right toe-font-body">
            <PopupSelectionV1
              overlayClassName="selection-notification"
              options={dataNotifications.data.map((item, _) => ({
                label: (
                  <div className="notification-item">
                    {' '}
                    <div className="notification-item__content">
                      {item.content}
                    </div>
                    <div className="notification-item__time toe-font-hint">
                      {moment(item.createdDate).fromNow()}
                    </div>
                  </div>
                ),
                value: _,
              }))}
            >
              <i className="pi pi-bell" onClick={() => getNotification()}>
                {dataNotifications.data.some((it) => it.isReaded === false) && (
                  <div className="dot"></div>
                )}
              </i>
            </PopupSelectionV1>
            <UserInfo />
          </div>
        </div>
        <div className="toe-layout-admin-page-container__body">
          <div className="toe-layout-admin-page-container__body-left">
            <Sider
              collapsible
              // collapsed={collapsedMenu}
              // onCollapse={handleCollapsed}
              theme="light"
              breakpoint="lg"
              color="#fff"
            >
              <div className="logo" />
              <Menu
                onSelect={handleSelectMenuItem}
                theme="light"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
                inlineIndent={24}
                selectable
                selectedKeys={location.pathname}
                className="admin-menu"
              >
                {renderMenu()}
              </Menu>
            </Sider>
          </div>
          <div className="toe-layout-admin-page-container__body-right">
            <div className="toe-layout-admin-page-container__body-right__head">
              <div className="toe-layout-admin-page-container__body-right__head-title">
                {hasBackBtn ? (
                  <div
                    onClick={back}
                    className="toe-layout-admin-page-container__body-right__head-title-back"
                  >
                    <LeftOutlined />
                  </div>
                ) : null}

                <div className="toe-font-large-title">
                  {title || menuItemSelected}
                </div>
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
      <Loading />
    </LayoutAntd>
  );
}

export default Layout;
