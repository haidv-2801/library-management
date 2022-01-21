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
import { BUTTON_THEME, BUTTON_TYPE } from '../../../constants/commonConstant';

const Test = () => {
  const [value, setValue] = useState(1);
  return (
    <div className="toe-test">
      <RegisterPage />
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
