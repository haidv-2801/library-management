import { PlusOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';
import { Chip } from 'primereact/chip';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'react-string-format';
import baseApi from '../../../../api/baseApi';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  PATH_NAME,
} from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import END_POINT from '../../../../constants/endpoint';
import Button from '../../../atomics/base/Button/Button';
import Input from '../../../atomics/base/Input/Input';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import Paginator from '../../../molecules/Paginator/Paginator';
import Table from '../../../molecules/Table/Table';
import Layout from '../../../sections/Admin/Layout/Layout';
import PopupCreateUser from '../UserPage/PopupCreateUser/PopupCreateUser';
import './menuPage.scss';
import PopupCreateMenu from './PopupCreateMenu/PopupCreateMenu';

MenuPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

MenuPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function MenuPage(props) {
  const { id, style, className } = props;

  const navigate = useNavigate();
  const toast = useRef(null);

  //#region
  const COLUMNS = [
    {
      field: 'checkbox',
      selectionMode: 'multiple',
      headerStyle: { width: '3em' },
    },
    {
      field: 'title',
      sortable: true,
      header: 'Tên menu',
      filterField: 'title',
      body: (row) => {
        return <SmartText>{row?.title}</SmartText>;
      },
      style: { width: 400, maxWidth: 400 },
    },
    {
      field: 'slug',
      sortable: true,
      header: 'Alias',
      filterField: 'slug',
      body: (row) => {
        return (
          <div className="toe-font-body">
            {<SmartText rows={4}>{row?.slug}</SmartText>}
          </div>
        );
      },
    },
    {
      field: 'parentID',
      sortable: true,
      header: 'Menu cha',
      filterField: 'parentID',
      body: (row) => {
        return <div className="toe-font-body">{row?.parentID}</div>;
      },
    },
    {
      field: 'displayOrder',
      sortable: true,
      header: 'Mức độ hiển thị',
      filterField: 'displayOrder',
      body: (row) => {
        return <div className="toe-font-body">{row?.displayOrder}</div>;
      },
      style: { width: 170, maxWidth: 170 },
    },
    {
      field: 'status',
      sortable: true,
      header: 'Trạng thái',
      filterField: 'status',
      body: (row) => {
        return <div className="toe-font-body">{renderStatus(row?.status)}</div>;
      },
      style: { width: 180, maxWidth: 180 },
    },
    {
      field: 'createdDate',
      sortable: true,
      header: 'Ngày tạo',
      filterField: 'createdDate',
      body: (row) => {
        if (isLoading) return <Skeleton></Skeleton>;
        return (
          <div className="toe-font-body">
            {moment(row?.createdDate).format('DD/MM/YYYY HH:mm:ss')}
          </div>
        );
      },
      style: { width: 180, maxWidth: 180 },
    },
  ];

  const POPUP_MODE = {
    EDIT: 0,
    ADD: 1,
  };

  const MIN_PAGE_SIZE = 10;
  const requestDoneRef = useRef(true);

  const [isShowPopupCreateMenu, setIsShowPopupCreateMenu] = useState(false);
  const [selected, setSelected] = useState([]);
  const [popupMode, setPopupMode] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowPopupCreateUser, setIsShowPopupCreateUser] = useState(false);
  const [lazyParams, setLazyParams] = useState({ page: 1, rows: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [paging, setPaging] = useState({
    filterValue: '',
    page: 1,
    pageSize: MIN_PAGE_SIZE,
  });
  const [dataCreate, setDataCreate] = useState({});

  const OPTIONS = [
    {
      label: (
        <div className="table-option__menu-item">
          <i className="pi pi-eye"></i>Xem chi tiết
        </div>
      ),
      value: 1,
      onClick: (e) => console.log('first', e),
    },
    {
      label: (
        <div className="table-option__menu-item">
          <i className="pi pi-pencil"></i>Sửa
        </div>
      ),
      value: 2,
      onClick: ({ key }) => handleEdit(key),
    },
    {
      label: (
        <div className="table-option__menu-item">
          <i className="pi pi-arrows-h"></i>Đổi trạng thái
        </div>
      ),
      value: 4,
      onClick: ({ key }) => handleActive(key),
    },
    {
      label: (
        <div className="table-option__menu-item" style={{ color: 'red' }}>
          <i className="pi pi-trash"></i>Xóa
        </div>
      ),
      value: 3,
      onClick: ({ key }) => handleRemove(key),
    },
  ];

  const CONFIGS = {
    /**
     * *Config
     */
    resizableColumns: false,
    dataKey: 'menuID',
    selectionMode: isLoading ? null : 'checkbox',
    sortField: lazyParams?.sortField,
    sortOrder: lazyParams?.sortOrder,
    selection: selected,
    reorderableColumns: false,
    scrollHeight: 'calc(100% - 500px)',

    /**
     * *Method
     */
    onSort: (event) => {
      console.log(event);
    },
    onSelectionChange: (event) => {
      setSelected(event.value);
    },
    onSort: (event) => {
      setLazyParams(event);
    },
    onPage: (event) => {
      setLazyParams(event);
    },
  };

  useEffect(() => {
    getMenusFilter();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    getMenusFilter();
  }, [paging]);

  const getPopupCreateMenuPops = () => {
    if (popupMode === POPUP_MODE.ADD) {
      return {
        title: 'Thêm mới menu',
        footerRight: [
          <Button
            onClick={() => setIsShowPopupCreateMenu(false)}
            theme={BUTTON_THEME.THEME_6}
            name="Hủy"
          />,
          <Button name="Thêm" onClick={handleAdd} />,
        ],
      };
    } else if (popupMode === POPUP_MODE.EDIT) {
      return {
        title: 'Sửa menu',
        footerRight: [
          <Button
            onClick={() => setIsShowPopupCreateMenu(false)}
            name="Hủy"
            theme={BUTTON_THEME.THEME_6}
          />,
          <Button name="Cập nhập" onClick={handleEdit} />,
        ],
      };
    }
  };

  const getMenusFilter = () => {
    baseApi.post(
      (res) => {
        let _data = res.data.pageData.sort((a, b) => {
          const time = (date) => new Date(date).getTime();
          if (time(b?.modifiedDate) - time(a?.modifiedDate) === 0) {
            return time(b?.createdDate) - time(a?.createdDate);
          } else {
            return time(b?.modifiedDate) - time(a?.modifiedDate);
          }
        });
        setDataTable(_data);
        setIsLoading(false);
        setTotalRecords(res.data.totalRecord);
        requestDoneRef.current = true;
      },
      (err) => {
        setIsLoading(false);
        requestDoneRef.current = true;
      },
      () => {
        setIsLoading(true);
        requestDoneRef.current = false;
      },
      END_POINT.TOE_GET_MENUS_FILTER_PAGING,
      null,
      {
        filterValue: paging.filterValue || '',
        pageSize: paging.pageSize,
        pageNumber: paging.page,
      }
    );
  };

  const handleEdit = (key) => {};

  const handleAdd = () => {
    let _body = {
      ...dataCreate,
    };

    debugger;

    baseApi.post(
      (res) => {
        if (res.data > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Thêm mới thành công',
            life: 3000,
          });
          setTimeout(() => {
            window.history.back();
          }, 400);
        }
      },
      (err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Thêm mới thất bại',
          life: 3000,
        });
      },
      () => {},
      END_POINT.TOE_INSERT_MENU,
      _body,
      null,
      null
    );
  };

  const handleActive = (key) => {
    let _body = dataTable.filter((item) => item?.menuID === key);
    if (_body.length) {
      _body = _body[0];
      _body['status'] = !_body['status'];
      _body['modifiedDate'] = new Date(Date.now() + 7 * 60 * 60 * 1000);

      baseApi.put(
        (res) => {
          if (res.data > 0) {
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: 'Sửa thành công',
              life: 3000,
            });
            getMenusFilter();
          }
        },
        (err) => {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Sửa thất thất bại',
            life: 3000,
          });
        },
        () => {},
        format(END_POINT.TOE_UPDATE_MENU, _body?.menuID),
        _body,
        null
      );
    }
  };

  const handleRemove = (key) => {
    baseApi.delete(
      (res) => {
        if (res.data > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Xóa thành công',
            life: 3000,
          });
          getMenusFilter();
        }
      },
      (err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Xóa thất bại',
          life: 3000,
        });
      },
      () => {},
      format(END_POINT.TOE_DELETE_MENU, key)
    );
  };

  const renderSkeleton = () => {
    let number = Math.min(MIN_PAGE_SIZE, totalRecords || MIN_PAGE_SIZE),
      arr = [],
      obj = {};

    for (const column of COLUMNS) {
      obj[column.field] = <Skeleton></Skeleton>;
    }

    for (let index = 0; index < number; index++) {
      arr.push(obj);
    }

    return arr;
  };

  function renderStatus(status) {
    if (isLoading) return <Skeleton></Skeleton>;
    switch (status) {
      case true:
        return (
          <Chip
            style={{ backgroundColor: '#00A17A', color: '#fff' }}
            className="toe-font-body"
            label="Hoạt động"
          />
        );
        break;
      case false:
        return <Chip className="toe-font-body" label="Ngừng hoạt động" />;
        break;
      default:
        return null;
        break;
    }
  }

  //#endregion

  return (
    <Layout
      title="Quản lý menu"
      rightButtons={[
        <Button
          onClick={() => {
            setIsShowPopupCreateMenu(true);
            setPopupMode(POPUP_MODE.ADD);
          }}
          leftIcon={<PlusOutlined />}
          type={BUTTON_TYPE.LEFT_ICON}
          name="Thêm menu"
        />,
      ]}
    >
      <div
        id={id}
        style={style}
        className={buildClass(['toe-admin-menu-page', className])}
      >
        <div className="toe-admin-menu-page__toolbar">
          <div className="toe-admin-menu-page__row">
            <Input
              onChange={(value) => {
                setPaging({
                  ...paging,
                  filterValue: value,
                });
              }}
              placeholder={'Tìm kiếm menu theo Tiêu đề, Alias...'}
              value={paging.filterValue}
              // label={
              //   <div className="toe-admin-menu-page__row-label">Tìm kiếm</div>
              // }
              leftIcon={<i className="pi pi-search"></i>}
              delay={300}
            />
          </div>
          {selected?.length ? (
            <Tooltip placement="bottomLeft" title="Xóa bản ghi">
              <i
                style={{ color: 'red', marginLeft: 'auto' }}
                className="pi pi-trash"
              ></i>
            </Tooltip>
          ) : null}
        </div>
        <Table
          data={isLoading ? renderSkeleton() : dataTable}
          configs={CONFIGS}
          columns={COLUMNS}
          hasOption
          options={OPTIONS}
        />
        <Paginator
          onChange={({ page, pageSize }) => {
            setPaging({ ...paging, page, pageSize });
          }}
          page={paging.page}
          pageSize={paging.pageSize}
          totalRecords={totalRecords}
        />
        <PopupCreateMenu
          show={isShowPopupCreateMenu}
          onClose={() => setIsShowPopupCreateMenu(false)}
          {...getPopupCreateMenuPops()}
          onChange={(data) => setDataCreate(data)}
        />
      </div>
      <Toast ref={toast}></Toast>
    </Layout>
  );
}

export default MenuPage;
