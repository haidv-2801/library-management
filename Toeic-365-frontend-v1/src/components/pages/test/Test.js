import React, { useState, useEffect, useRef, useCallback } from 'react';

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
import Modal from '../../atomics/base/ModalV2/Modal';
import PopupSelection from '../../atomics/base/PopupSelection/PopupSelection';
import Layout from '../../sections/Admin/Layout/Layout';
import LoginPage from '../../../components/pages/admin/LoginPage/LoginPage';
import RegisterPage from '../../../components/pages/admin/RegisterPage/RegisterPage';
import Table from '../../molecules/Table/Table';
import Dropdown from '../../molecules/Dropdown/Dropdown';
import { Skeleton } from 'primereact/skeleton';
import { Button as PrimeButton } from 'primereact/button';
import { BUTTON_THEME, BUTTON_TYPE } from '../../../constants/commonConstant';
import AudioPlay from '../../molecules/AudioPlay/AudioPlay';
import QuestionCheckbox from '../../molecules/QuestionCheckbox/QuestionCheckbox';
import GroupCheck from '../../molecules/GroupCheck/GroupCheck';
import ExamItem from '../../molecules/ExamItem/ExamItem';
import Spinner from '../../atomics/base/Spinner/Spinner';
import CardItem from '../../molecules/Card/Card';
import TitleSeparator from '../../atomics/base/TitleSeparator/TitleSeparator';
import Carousel from '../../molecules/Carousel/Carousel';
import NotificationItem from '../../molecules/NotificationItem/NotificationItem';
import DynamicMenu from '../../molecules/DynamicMenu/DynamicMenu';
import Banner from '../../molecules/Banner/Banner';
import { BellOutlined } from '@ant-design/icons';
import CommonItem from '../../molecules/CommonItem/CommonItem';
import './test.scss';
import BackTop from '../../molecules/BackTop/BackTop';
import Paginator from '../../molecules/Paginator/Paginator';
import Editor from '../../molecules/Editor/Editor';
import Book from '../../molecules/Book/Book';
import { Tooltip } from 'primereact/tooltip';
import SideBar from '../../atomics/base/SideBar/SideBar';
import TreeSelect from '../../atomics/base/TreeSelect/TreeSelect';
import MenuBar from '../../atomics/base/MenuBar/MenuBar';
import { FAKE_MENU_ITEM, FAKE_DATA_MENU } from './Fake';
import {
  genFileNameWithTime,
  listToTree,
} from '../../../constants/commonFunction';
import PaginatorAntd from '../../molecules/PaginatorAntd/PaginatorAntd';
import BooksPageSeeAll from '../user/BooksPageSeeAll/BooksPageSeeAll';
import { dowloadFile, getBlobFirebase } from '../../../api/firebase';
import FileSaver from 'file-saver';
import moment from 'moment';
import { Document, Page } from 'react-pdf';
import PdfDist from '../../molecules/PdfDist/PdfDist';
import ReactPDfViewer from '../../molecules/ReactPdfViewer/ReactPdfViewer';
import baseApi from '../../../api/baseApi';
import END_POINT from '../../../constants/endpoint';
import { format } from 'react-string-format';

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

const nodes = [
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            key: '0-0-0',
            label: 'Expenses.doc',
            icon: 'pi pi-fw pi-file',
            data: 'Expenses Document',
          },
          {
            key: '0-0-1',
            label: 'Resume.doc',
            icon: 'pi pi-fw pi-file',
            data: 'Resume Document',
          },
        ],
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        icon: 'pi pi-fw pi-home',
        children: [
          {
            key: '0-1-0',
            label: 'Invoices.txt',
            icon: 'pi pi-fw pi-file',
            data: 'Invoices for this month',
          },
        ],
      },
    ],
  },
  {
    key: '1',
    label: 'Events',
    data: 'Events Folder',
    icon: 'pi pi-fw pi-calendar',
    children: [
      {
        key: '1-0',
        label: 'Meeting',
        icon: 'pi pi-fw pi-calendar-plus',
        data: 'Meeting',
      },
      {
        key: '1-1',
        label: 'Product Launch',
        icon: 'pi pi-fw pi-calendar-plus',
        data: 'Product Launch',
      },
      {
        key: '1-2',
        label: 'Report Review',
        icon: 'pi pi-fw pi-calendar-plus',
        data: 'Report Review',
      },
    ],
  },
  {
    key: '2',
    label: 'Movies',
    data: 'Movies Folder',
    icon: 'pi pi-fw pi-star-fill',
    children: [
      {
        key: '2-0',
        icon: 'pi pi-fw pi-star-fill',
        label: 'Al Pacino',
        data: 'Pacino Movies',
        children: [
          {
            key: '2-0-0',
            label: 'Scarface',
            icon: 'pi pi-fw pi-video',
            data: 'Scarface Movie',
          },
          {
            key: '2-0-1',
            label: 'Serpico',
            icon: 'pi pi-fw pi-video',
            data: 'Serpico Movie',
          },
        ],
      },
      {
        key: '2-1',
        label: 'Robert De Niro',
        icon: 'pi pi-fw pi-star-fill',
        data: 'De Niro Movies',
        children: [
          {
            key: '2-1-0',
            label: 'Goodfellas',
            icon: 'pi pi-fw pi-video',
            data: 'Goodfellas Movie',
          },
          {
            key: '2-1-1',
            label: 'Untouchables',
            icon: 'pi pi-fw pi-video',
            data: 'Untouchables Movie',
          },
        ],
      },
    ],
  },
];

const Test = () => {
  const preview = useRef();
  const [src, setSrc] = useState(null);

  const testDowload = () => {
    getBlobFirebase(
      'https://firebasestorage.googleapis.com/v0/b/fir-library-upload.appspot.com/o/images%2F001_1.jpg?alt=media&token=07f95ae5-cf2f-4de3-9a0b-5656a92df579'
    ).then((res) => {
      FileSaver.saveAs(res, genFileNameWithTime());
    });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    baseApi.get(
      (res) => {
        debugger;
        var reader = new FileReader();
        reader.onload = function () {};
        let test = reader.readAsArrayBuffer(res);
      },
      (err) => {
        debugger;
      },
      () => {},
      format(END_POINT.TOE_GET_FILE, 'me1_f728.jpg'),
      { 'Content-Type': 'image/*' }
    );
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="toe-test">
      {/* <PdfDist /> */}
      {/* <ReactPDfViewer /> */}
      {/* <div>
        <Document
          file="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div> */}
      {/* <object
        data="./171200038_Bui_Minh_Thao_CNTT1_K58.pdf"
        type="application/pdf"
      >
        <div>No online PDF viewer installed</div>
      </object> */}
      {/* <embed
        src="./171200038_Bui_Minh_Thao_CNTT1_K58.pdf"
        width="800px"
        height="2100px"
      /> */}
      {/* <iframe
        src={
          'https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0'
        }
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe> */}
      {/* <iframe
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      ></iframe> */}

      {/* <iframe
        // src="../test/171200038_Bui_Minh_Thao_CNTT1_K58.pdf"
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      ></iframe> */}

      {/* <embed
        src={
          'https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0'
        }
        type="application/pdf"
      /> */}
    </div>
  );
};

export default Test;
