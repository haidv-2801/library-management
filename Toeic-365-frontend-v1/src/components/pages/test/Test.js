import React, { useState, useEffect, useRef } from 'react';
import {
  Route,
  Routes,
  useMatch,
  BrowserRouter,
  useNavigate,
  Router,
} from 'react-router-dom';
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
import Button from '../../atomics/base/Button/Button';
import NotFoundPage from '../admin/NotFoundPage/NotFoundPage';
import TextAreaBase from '../../atomics/base/TextArea/TextArea';
import Loading from '../../atomics/base/Loading/Loading';
import Modal from '../../atomics/base/Modal/Modal';
import PopupSelection from '../../atomics/base/PopupSelection/PopupSelection';
import Layout from '../../sections/Admin/Layout/Layout';
import LoginPage from '../../../components/pages/admin/LoginPage/LoginPage';
import RegisterPage from '../../../components/pages/admin/RegisterPage/RegisterPage';
import Table from '../../molecules/Table/Table';
import { Skeleton } from 'primereact/skeleton';
import { BUTTON_THEME, BUTTON_TYPE } from '../../../constants/commonConstant';

const fake = [
  {
    id: '7172095f-daf0-4d6c-a866-30ec9c8a3f96',
    name: 'Andree ScrineAndree ScrineAndree ScrineAndree ScrineAndree ScrineAndree ScrineAndree ScrineAndree ScrineAndree ScrineAndree Scrine',
    age: '81',
    address: '059 Oxford Place',
  },
  {
    id: 'fa37b2a7-bb84-4776-b937-8f7716571520',
    name: 'Cirillo McGillicuddy',
    age: '1',
    address: '5 Haas Hill',
  },
  {
    id: 'c367c2d2-6f40-4cc9-a7f7-efdd62b3b8d7',
    name: 'Albrecht Jasik',
    age: '70',
    address: '1338 Westerfield Park',
  },
  {
    id: '43a577d7-97b0-49a8-baf5-60fa31f37b92',
    name: 'Arnuad Burgoin',
    age: '23',
    address: '3 Aberg Street',
  },
  {
    id: '3ec0d4aa-ef63-4c12-843e-49ed14fb71b7',
    name: 'Vonny Gell',
    age: '46',
    address: '51 Meadow Valley Crossing',
  },
  {
    id: 'beba6ef5-2d33-487c-9da8-d387bc64c098',
    name: 'Everett Foote',
    age: '2',
    address: '4442 Toban Parkway',
  },
  {
    id: 'bb5c8cc8-d771-4e54-bad4-c2a3b66c53e8',
    name: 'Cy McKeighen',
    age: '38',
    address: '3 Farwell Avenue',
  },
  {
    id: 'c7792ae0-945b-484a-b839-f6b4a2768133',
    name: 'Noak Gabby',
    age: '44',
    address: '51186 Kipling Crossing',
  },
  {
    id: 'f84d911c-a8f7-4668-bab0-b0872ae377e9',
    name: 'Alain Fonso',
    age: '77',
    address: '3363 Hazelcrest Center',
  },
  {
    id: 'd45a3add-5b12-474c-b957-ac4fdf6dccae',
    name: 'Al Yuranovev',
    age: '29',
    address: '36 Grim Way',
  },
  {
    id: 'e761fb7f-f210-4af5-9876-4af566cd8cd9',
    name: 'Everett Orans',
    age: '26',
    address: '45964 Loeprich Drive',
  },
];
export { fake };

const Test = () => {
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

  const renderSkeleton = (row) => {
    let sk = <Skeleton animation="wave" borderRadius="2px" width="100%" />;
    return Array.from(Array(row).keys()).map((_) => ({
      age: sk,
      name: sk,
      address: sk,
    }));
  };

  return (
    <div className="toe-test">
      <Table data={fake} configs={CONFIGS} columns={COLUMNS} />
      {/* <RegisterPage /> */}
      {/* <Modal /> */}
      {/* <Loading /> */}
      {/* <Layout /> */}
      {/* <PopupSelection
        options={[
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
          { label: 'C', value: 3 },
        ]}
        defaultValue={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      /> */}
    </div>
  );
};

export default Test;
