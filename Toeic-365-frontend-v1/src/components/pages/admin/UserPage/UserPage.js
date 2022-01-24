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
} from '../../../../constants/commonConstant';
import { fake } from '../../test/Test';
import Table from '../../../molecules/Table/Table';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import './userPage.scss';

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
      style: { width: 300, maxWidth: 300 },
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
  const MIN_PAGE_SIZE = 10;

  const [selected, setSelected] = useState([]);
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
  //#endregion

  return (
    <Layout>
      <div
        id={id}
        style={style}
        className={buildClass(['toe-admin-user-page', className])}
      >
        <Table data={fake} configs={CONFIGS} columns={COLUMNS} />
      </div>
    </Layout>
  );
}

export default UserPage;
