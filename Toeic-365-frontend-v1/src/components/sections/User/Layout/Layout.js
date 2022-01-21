import React, { useState, useEffect } from 'react';
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
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import Table from '../../../molecules/Table/Table';
import { Loading } from '../../../atomics/base/Loading/Loading';

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
  const DEFAULT_ITEM = '/admin/dashboard';
  const DEFAULT_TITLE = 'Tổng quan';
  const SCREEN_WIDTH = 1366;

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

  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [menuItemSelected, setmenuItemSelected] = useState(DEFAULT_TITLE);
  const [width, height] = useWindowResize();

  useEffect(() => {
    document.title = 'Toeic-365';
  }, []);

  useEffect(() => {
    if (width < SCREEN_WIDTH) {
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

  //#region
  const COLUMNS = [
    {
      field: 'checkbox',
      selectionMode: 'multiple',
      headerStyle: { width: '3em' },
    },
    {
      field: 'name',
      sortable: true,
      header: 'Họ và tên',
      filterField: 'name',
      body: (row) => {
        return <div className="toe-font-body">{row?.name}</div>;
      },
    },
    {
      field: 'age',
      sortable: true,
      header: 'Tuổi',
      filterField: 'age',
      body: (row) => {
        return <div className="toe-font-body">{row?.age}</div>;
      },
    },
    {
      field: 'address',
      sortable: true,
      header: 'Địa chỉ',
      filterField: 'address',
      body: (row) => {
        return <div className="toe-font-body">{row?.address}</div>;
      },
    },
  ];

  const [selected, setSelected] = useState([]);
  const [lazyParams, setLazyParams] = useState({});

  const CONFIGS = {
    onSort: (event) => {
      console.log(event);
    },
    resizableColumns: true,
    dataKey: 'id',
    totalRecords: fake.length,
    selectionMode: 'checkbox',
    onSelectionChange: (event) => {
      setSelected(event.value);
    },
    onSort: (event) => {
      console.log(event);
      setLazyParams(event);
    },
    onPage: (event) => {
      console.log(event);
      setLazyParams(event);
    },
    sortField: lazyParams?.sortField,
    sortOrder: lazyParams?.sortOrder,
    selection: selected,
  };
  //#endregion

  return (
    <LayoutAntd>
      <div className="toe-layout-user-page-container">
        <div className="toe-layout-user-page-container__header">
          <div className="toe-layout-user-page-container__header-left">
            <img className="logo-app" src={MainLogo} alt="toeic-365" />
            <b className="name-app">
              TOEIC<span style={{ color: '#43c1c9' }}>365</span>
            </b>
          </div>
          <div className="toe-layout-user-page-container__header-right">
            <div className="user-name">DOVANHAI</div>
            <div style={{ cursor: 'pointer' }} className="user-avatar">
              <img src={Avatar} alt="avatar" />
            </div>
          </div>
        </div>
        <div className="toe-layout-user-page-container__body">
          <div className="toe-layout-user-page-container__body-left">
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
          <div className="toe-layout-user-page-container__body-right">
            <div className="toe-layout-user-page-container__body-right__head">
              <div className="toe-layout-user-page-container__body-right__head-title">
                {title || (
                  <div className="toe-font-large-title">{menuItemSelected}</div>
                )}
              </div>
              <div className="toe-layout-user-page-container__body-right__head-btns">
                {renderRightButtons()}
              </div>
            </div>
            <div className="toe-layout-user-page-container__body-right__body">
              {/* {children} */}
              <Table data={fake} configs={CONFIGS} columns={COLUMNS} />
            </div>
          </div>
        </div>
      </div>
    </LayoutAntd>
  );
}

export default Layout;
