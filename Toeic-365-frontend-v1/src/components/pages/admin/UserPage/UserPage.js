import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import RegisterBg from '../../../../assets/images/register.svg';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Modal from '../../../atomics/base/Modal/Modal';
import Button from '../../../atomics/base/Button/Button';
import { LoginOutlined } from '@ant-design/icons';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import baseApi from '../../../../api/baseApi';
import { ADMIN_ENDPOINT } from '../../../../constants/endpoint';
import Layout from '../../../sections/Admin/Layout/Layout';
import {
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
  BUTTON_THEME,
} from '../../../../constants/commonConstant';
import { PlusOutlined } from '@ant-design/icons';
import { fake } from '../../test/Test';
import Table from '../../../molecules/Table/Table';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import './userPage.scss';
import PopupCreateUser from './PopupCreateUser/PopupCreateUser';

UserPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

UserPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function UserPage(props) {
  const { id, style, className } = props;

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
        return <SmartText>{row?.name}</SmartText>;
      },
      style: { width: 400, maxWidth: 400 },
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
  const POPUP_MODE = {
    EDIT: 0,
    ADD: 1,
  };
  const MIN_PAGE_SIZE = 10;

  const [selected, setSelected] = useState([]);
  const [popupMode, setpopupMode] = useState();
  const [isShowPopupCreateUser, setIsShowPopupCreateUser] = useState(false);
  const [lazyParams, setLazyParams] = useState({ page: 1, rows: 10 });

  const CONFIGS = {
    onSort: (event) => {
      console.log(event);
    },
    resizableColumns: false,
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
    rows: lazyParams?.rows,
    reorderableColumns: true,
    paginator: fake.length > MIN_PAGE_SIZE,
  };

  const getPopupCreateUserPops = () => {
    if (popupMode === POPUP_MODE.ADD) {
      return {
        title: 'Thêm mới tài khoản',
        footerRight: [
          <Button
            onClick={() => setIsShowPopupCreateUser(false)}
            theme={BUTTON_THEME.THEME_6}
            name="Hủy"
          />,
          <Button name="Thêm" onClick={() => {}} />,
        ],
      };
    } else if (popupMode === POPUP_MODE.EDIT) {
      return {
        title: 'Sửa tài khoản',
        footerRight: [
          <Button
            onClick={() => setIsShowPopupCreateUser(false)}
            name="Hủy"
            theme={BUTTON_THEME.THEME_6}
          />,
          <Button name="Cập nhập" onClick={() => {}} />,
        ],
      };
    }
  };
  //#endregion

  return (
    <Layout
      title="Quản lý tài khoản"
      rightButtons={[
        <Button
          onClick={() => {
            setpopupMode(POPUP_MODE.ADD);
            setIsShowPopupCreateUser(true);
          }}
          leftIcon={<PlusOutlined />}
          type={BUTTON_TYPE.LEFT_ICON}
          name="Thêm tài khoản"
        />,
      ]}
    >
      <div
        id={id}
        style={style}
        className={buildClass(['toe-admin-user-page', className])}
      >
        <Table data={fake} configs={CONFIGS} columns={COLUMNS} />
        {isShowPopupCreateUser ? (
          <PopupCreateUser
            onClose={() => setIsShowPopupCreateUser(false)}
            {...getPopupCreateUserPops()}
          />
        ) : null}
      </div>
    </Layout>
  );
}

export default UserPage;
