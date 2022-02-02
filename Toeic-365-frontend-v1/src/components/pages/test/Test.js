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
import Input from '../../atomics/base/Input/Input';
import Modal from '../../atomics/base/Modal/Modal';
import PopupSelection from '../../atomics/base/PopupSelection/PopupSelection';
import Layout from '../../sections/Admin/Layout/Layout';
import LoginPage from '../../../components/pages/admin/LoginPage/LoginPage';
import RegisterPage from '../../../components/pages/admin/RegisterPage/RegisterPage';
import Table from '../../molecules/Table/Table';
import Dropdown from '../../molecules/Dropdown/Dropdown';
import { Skeleton } from 'primereact/skeleton';
import { Button as PrimeButton } from 'primereact/button';
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

  const value = [
    {
      value: '59a8a0a1-ecc2-42ec-bd91-6024870a99bd',
      label: 'Cherry McCoole',
    },
    {
      value: '3418df77-84da-4997-a713-2f523926a39e',
      label: 'Pippo Impey',
    },
    {
      value: '66e22fe2-3f0f-4cda-b4b5-d7b3d5e11121',
      label: 'Dennie Franzelini',
    },
    {
      value: 'ca87cb62-6918-49b7-81b6-8034f0475d01',
      label: 'Fonzie Anstead',
    },
    {
      value: '88676e93-ab1f-47f4-883b-8afe1e8fd50c',
      label: 'Alfi Monelli',
    },
    {
      value: '8446363a-8069-403c-9a5e-d0b1d9c155dd',
      label: 'Eleanore Brinkman',
    },
    {
      value: '273214b3-1012-492d-92ad-e8e6bdebee4c',
      label: 'Bat Wookey',
    },
    {
      value: '794a14af-1841-43f5-979d-86b53d641b35',
      label: 'Pyotr Mundwell',
    },
    {
      value: 'b8fd1409-038c-4b8e-9fcd-b82156d2b629',
      label: 'Lurline Doutch',
    },
    {
      value: 'ac969f7d-f44c-4988-9ef5-634fc51e7a78',
      label: 'Ashien Oxenham',
    },
    {
      value: '89360ccb-ed24-4611-b5e8-3cefa5dac753',
      label: 'Karrah Sunners',
    },
    {
      value: '24261f40-1763-4426-bf5d-5d704460caf3',
      label: 'Umeko Landreth',
    },
    {
      value: 'cc0ac425-39d1-4ac1-b7b0-0b36c88310ec',
      label: 'Remington Lathleiffure',
    },
    {
      value: 'e8ed7321-9f3a-4ca3-82be-6742a79a28e4',
      label: 'Nickie Smuth',
    },
    {
      value: '200413bf-c5c0-4657-9161-e05aa727c25d',
      label: 'Kandace Toten',
    },
    {
      value: 'afddf600-e645-450d-bca3-459d86119fd3',
      label: 'Honoria Westberg',
    },
    {
      value: '793fe160-745c-46a6-9250-dae8339e52c9',
      label: 'Rachelle Antoney',
    },
    {
      value: 'dfe6b7e7-9d44-4cf8-8af2-4999493a85b5',
      label: 'Meredithe Bursnoll',
    },
    {
      value: 'c3417623-614e-4ed0-b6e5-86d43174295c',
      label: 'Merilee Mapples',
    },
    {
      value: 'd38dbbbb-91ce-4cb8-8c94-cd20c6881508',
      label: 'Lief Blowers',
    },
    {
      value: 'd7abde11-72e1-4670-9dff-2bb4fd7d8c4d',
      label: 'Hugh Singers',
    },
    {
      value: '9265021f-7d4a-49ab-9f8e-8289dc92b344',
      label: 'Sashenka Garmey',
    },
    {
      value: '72292823-e280-4a32-9724-a235123aa8ee',
      label: 'Matthias Jury',
    },
    {
      value: 'b065317e-9409-4b07-9839-2fdfff885c41',
      label: 'Corie Jolin',
    },
    {
      value: '6c3ff258-802e-4210-8214-0ef9a00c296d',
      label: 'Daniel Glyne',
    },
    {
      value: 'ef33c25f-6500-48eb-99e7-9d98e3721de0',
      label: 'Mallorie Decker',
    },
    {
      value: 'c979223e-4103-49ea-af45-0a254157211a',
      label: 'Lari Vasyukov',
    },
    {
      value: '55e0be96-3cdb-4954-968d-95b951ab7ce9',
      label: 'Bibi Pitone',
    },
    {
      value: 'ef45148a-75c9-424a-b187-29881571f46e',
      label: 'Madelene Chaters',
    },
    {
      value: '0d0db406-ae44-4fb9-90aa-dc664782dd91',
      label: 'Thacher Kezar',
    },
  ];

  const [dropdown, setDropdown] = useState();
  return (
    <div className="toe-test">
      <PrimeButton
        className="toe-prime-btn"
        label="Lưu"
        tooltip="Lưu thông tin"
        iconPos="right"
        loading={true}
      />
      {/* <Dropdown
        options={value}
        onChange={(data) => {
          setDropdown(data.value);
        }}
        defaultValue={dropdown}
      /> */}
      {/* <Input
        valid={false}
        bottomMessage="Nhập đúng định dạng email"
        clearable
      /> */}
      {/* <Table data={fake} configs={CONFIGS} columns={COLUMNS} /> */}
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