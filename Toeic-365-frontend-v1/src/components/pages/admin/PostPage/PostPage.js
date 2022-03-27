import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  PATH_NAME,
} from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import Button from '../../../atomics/base/Button/Button';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import Table from '../../../molecules/Table/Table';
import Layout from '../../../sections/Admin/Layout/Layout';
import PopupCreateUser from '../UserPage/PopupCreateUser/PopupCreateUser';
import { fake } from '../../test/Test';
import './postPage.scss';

PostPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

PostPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function PostPage(props) {
  const { id, style, className } = props;

  const navigate = useNavigate();

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
    // reorderableColumns: true,
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
      title="Quản lý bài đăng"
      rightButtons={[
        <Button
          onClick={() => {
            navigate(PATH_NAME.ADMIN_CREATE_POST_PAGE);
          }}
          leftIcon={<PlusOutlined />}
          type={BUTTON_TYPE.LEFT_ICON}
          name="Thêm bài đăng"
        />,
      ]}
    >
      <div
        id={id}
        style={style}
        className={buildClass(['toe-admin-post-page', className])}
      >
        <Table data={fake} configs={CONFIGS} columns={COLUMNS} />
        <PopupCreateUser
          show={isShowPopupCreateUser}
          onClose={() => setIsShowPopupCreateUser(false)}
          {...getPopupCreateUserPops()}
        />
      </div>
    </Layout>
  );
}

export default PostPage;
