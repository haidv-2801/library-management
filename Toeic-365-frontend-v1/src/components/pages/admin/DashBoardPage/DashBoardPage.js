import {
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import FileSaver from 'file-saver';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import { Chip } from 'primereact/chip';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'react-string-format';
import baseApi from '../../../../api/baseApi';
import { uploadFiles } from '../../../../api/firebase';
import Modal from '../../../atomics/base/ModalV2/Modal';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import { getUserName } from '../../../../constants/commonAuth';
import {
  BOOK_FORMAT,
  BUTTON_THEME,
  BUTTON_TYPE,
  COLUMN_NOT_EXPORT,
  DATE_FORMAT,
  FILTER_TIME_VALUE,
  LOCAL_STORATE_KEY,
  MAXIMUM_PAGESIZE,
  OPERATOR,
  RESERVATION_STATUS,
  SORT_TYPE,
} from '../../../../constants/commonConstant';
import {
  buildClass,
  commonFilterTime,
  genFileNameWithTime,
  getOrderStatus,
  listToTree,
  ParseJson,
} from '../../../../constants/commonFunction';
import END_POINT from '../../../../constants/endpoint';
import { setLocalStorage } from '../../../../contexts/authContext';
import Button from '../../../atomics/base/Button/Button';
import DatePicker from '../../../atomics/base/DatePicker/DatePicker';
import Input from '../../../atomics/base/Input/Input';
import PopupSelection from '../../../atomics/base/PopupSelectionV1/PopupSelection';
import SideBar from '../../../atomics/base/SideBar/SideBar';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import Paginator from '../../../molecules/Paginator/Paginator';
import Table from '../../../molecules/Table/Table';
import Layout from '../../../sections/Admin/Layout/Layout';
import './dashBoardPage.scss';
import ToastConfirmDelete from '../../../molecules/ToastConfirmDelete/ToastConfirmDelete';
import ScoreCard from '../../../molecules/ScoreCard/ScoreCard';

DashBoardPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

DashBoardPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function DashBoardPage(props) {
  const { id, style, className } = props;

  const navigate = useNavigate();

  //#region
  //#endregion

  return (
    <Layout title="Tổng quan">
      <div className="toe-dashboard-page">
        <div className="toe-dashboard-page__section score-card">
          <ScoreCard backgroundColor="#7C3AED" />
          <ScoreCard backgroundColor="#EF4444" />
          <ScoreCard backgroundColor="#F59E0B" />
          <ScoreCard backgroundColor="#10B981" />
        </div>
      </div>
    </Layout>
  );
}

export default DashBoardPage;
