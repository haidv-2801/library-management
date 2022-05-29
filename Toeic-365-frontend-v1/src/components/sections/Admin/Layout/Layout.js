import { LeftOutlined } from '@ant-design/icons';
import { Layout as LayoutAntd, Menu } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import baseApi from '../../../../api/baseApi';
import MainLogo from '../../../../assets/images/logo_utc.jpg';
import { OPERATOR, SORT_TYPE } from '../../../../constants/commonConstant';
import END_POINT from '../../../../constants/endpoint';
import useOnClickOutside from '../../../../hooks/useClickOutSide';
import useWindowResize from '../../../../hooks/useWindowResize';
import Loading from '../../../atomics/base/Loading/Loading';
import PopupSelectionV1 from '../../../atomics/base/PopupSelectionV1/PopupSelection';
import PanelMenu from '../../../molecules/PanelMenu/PanelMenu';
import UserInfo from '../../UserInfo/UserInfo';
import './layout.scss';
import $ from 'jquery';
import { buildClass } from '../../../../constants/commonFunction';

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
      url: DEFAULT_ITEM,
      label: DEFAULT_TITLE,
      icon: 'pi pi-chart-bar',
      items: null,
      className: 'js-admin-menu-event-dashboard',
    },
    {
      label: null,
      className: 'separator-line',
    },
    {
      icon: 'pi pi-users',
      url: '/admin/systems/user',
      label: 'Tài khoản',
      className: 'js-admin-menu-event-account',
    },
    {
      icon: 'pi pi-th-large',
      url: '/admin/systems/role',
      label: 'Chức năng',
      className: 'js-admin-menu-event-role',
    },
    {
      icon: 'pi pi-user-edit',
      url: '/admin/systems/permission',
      label: 'Phân quyền',
      className: 'js-admin-menu-event-permission',
    },
    {
      icon: 'pi pi-server',
      url: '/admin/systems/safe-address',
      label: 'Địa chỉ truy cập',
      className: 'js-admin-menu-event-safe-address',
    },
    {
      label: null,
      className: 'separator-line',
    },
    {
      icon: 'pi pi-list',
      url: '/admin/systems/menu',
      label: 'Menu',
      className: 'js-admin-menu-event-menu',
    },
    {
      url: '/admin/danh-muc/ban-doc',
      icon: 'pi pi-users',
      label: 'Bạn đọc',
      className: 'js-admin-menu-event-safe-member',
    },
    {
      url: '/admin/danh-muc/sach',
      label: 'Ấn phẩm',
      icon: 'pi pi-book',
      className: 'js-admin-menu-event-safe-book',
    },
    {
      icon: 'pi pi-arrows-h',
      url: '/admin/danh-muc/muon-tra',
      label: 'Mượn trả',
      className: 'js-admin-menu-event-safe-lending',
    },
    {
      label: null,
      className: 'separator-line',
    },
    {
      url: '/admin/tin-tuc/post',
      icon: 'pi pi-bell',
      label: 'Bài viết',
      className: 'js-admin-menu-event-safe-post',
    },
    {
      icon: 'pi pi-server',
      url: '/admin/tin-tuc/page',
      label: 'Trang',
      className: 'js-admin-menu-event-safe-page',
    },
    {
      icon: 'pi pi-server',
      url: '/admin/tin-tuc/slide',
      label: 'Slide',
      className: 'js-admin-menu-event-safe-slide',
    },
    {
      icon: 'pi pi-server',
      url: '/admin/yeu-cau-gop-y',
      label: 'Yêu cầu góp ý',
      className: 'js-admin-menu-event-safe-feedback',
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
  const [menuItemSelected, setmenuItemSelected] = useState(DEFAULT_ITEM);
  const [menuItemIndexSelected, setMenuItemIndexSelected] = useState(0);
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
    console.log('menuItemIndexSelected :>> ', menuItemIndexSelected);
  }, [menuItemIndexSelected]);

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
    if (state) {
      setCollapsedMenu(state);
    } else {
      setTimeout(() => {
        setCollapsedMenu(state);
      }, 120);
    }
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

  const renderPanelMenu = () => {
    return <PanelMenu items={MENU} />;
  };

  const renderPanelMenu1 = () => {
    return (
      <div className={buildClass(['admin-menu'])}>
        {MENU.map((item, _) => {
          return (
            <div
              key={_}
              className={buildClass([
                'admin-menu-item toe-font-body',
                item.className,
                location.pathname.indexOf(item.url) >= 0 && 'active',
              ])}
              onClick={() => {
                history(item.url);
                setMenuItemIndexSelected(item.url);
              }}
            >
              <div className="admin-menu-item__icon">
                <i className={item.icon}></i>
              </div>
              <div className="admin-menu-item__text">{item.label}</div>
            </div>
          );
        })}
      </div>
    );
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
              onCollapse={handleCollapsed}
              theme="light"
              breakpoint="lg"
              color="#fff"
              className={buildClass([collapsedMenu && 'sidermenu-collapsed'])}
            >
              <div className="logo" />
              {renderPanelMenu1()}
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
