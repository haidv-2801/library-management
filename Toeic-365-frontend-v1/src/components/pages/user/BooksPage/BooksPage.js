import { SearchOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Chip } from 'primereact/chip';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  BOOK_FORMAT,
  BUTTON_SHAPE,
  BUTTON_THEME,
  BUTTON_TYPE,
  OPERATOR,
  SECTION_TEXT,
  SORT_TYPE,
} from '../../../../constants/commonConstant';
import Button from '../../../atomics/base/Button/Button';
import Input from '../../../atomics/base/Input/Input';
import SideBar from '../../../atomics/base/SideBar/SideBar';
import Banner from '../../../molecules/Banner/Banner';
import Book from '../../../molecules/Book/Book';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import FilterEngine from '../../../molecules/FilterEngine/FilterEngine';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import rootState from '../../../../redux/store';
import { filterAction } from '../../../../redux/slices/filterSlice';
import END_POINT from '../../../../constants/endpoint';
import baseApi from '../../../../api/baseApi';
import {
  buildClass,
  DOCUMENT_SECTION,
  ParseJson,
  slugify,
} from '../../../../constants/commonFunction';
import { Skeleton } from 'primereact/skeleton';
import { getNewPaperDocuments, getElectronicDocuments } from '../function';
import './booksPage.scss';

BooksPage.propTypes = {
  titlePage: PropTypes.string,
};

BooksPage.defaultProps = { titlePage: '' };

function BooksPage(props) {
  const { children, titlePage } = props;

  const filterTypeOptions = [
    {
      label: 'Tất cả',
      value: 0,
    },
    {
      label: 'Nhan đề',
      value: 1,
    },
    {
      label: 'Tác giả',
      value: 2,
    },
  ];
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const DEFAULT_PAGE_SIZE = 5;

  const DEFAULT_SECTION = {};

  const selector = useSelector(
    (rootState) => rootState.filter.booksPageFilterEnige
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterEngine, setShowFilterEngine] = useState(false);
  const [defaultFilterType, setDefaultFilterType] = useState(0);
  const [commonSearchValue, setCommonSearchValue] = useState('');
  const [bookSection, setBookSection] = useState({});

  //Data tai lieu
  const [documentNew, setDocumentNew] = useState({
    data: [],
    totalRecord: 0,
    isLoading: false,
  });

  const [EDocumentNew, setEDocumentNew] = useState({
    data: [],
    totalRecord: 0,
    isLoading: false,
  });

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    callGetNewPaperDocuments();
    callGetElectronicDocuments();
  }, []);

  const callGetNewPaperDocuments = () => {
    getNewPaperDocuments(
      (res) => {
        let _data = res.data.pageData,
          _totalRecord = res.data.totalRecord;

        setDocumentNew({
          data: _data,
          isLoading: false,
          totalRecord: _totalRecord,
        });

        setIsLoading(false);
      },
      (err) => {
        setDocumentNew((p) => ({
          ...p,
          isLoading: false,
        }));
        setIsLoading(false);
      },
      () => {
        setDocumentNew((p) => ({
          ...p,
          isLoading: true,
        }));
        setIsLoading(true);
      }
    );
  };

  const callGetElectronicDocuments = () => {
    getElectronicDocuments(
      (res) => {
        let _data = res.data.pageData,
          _totalRecord = res.data.totalRecord;

        setEDocumentNew({
          data: _data,
          isLoading: false,
          totalRecord: _totalRecord,
        });

        setIsLoading(false);
      },
      (err) => {
        setEDocumentNew((p) => ({
          ...p,
          isLoading: false,
        }));

        setIsLoading(false);
      },
      () => {
        setEDocumentNew((p) => ({
          ...p,
          isLoading: true,
        }));
        setIsLoading(true);
      }
    );
  };

  const handleClickSeeAll = (section) => {
    navigate(section);
  };

  const renderSection = (
    title,
    document = {},
    section = DOCUMENT_SECTION.DOCUMENT_NEW
  ) => {
    const data = document?.data?.map((book) => {
      return (
        <Book
          key={book.bookID}
          className="toe-book-page__body-content__book"
          bookTitle={book.bookName}
          bookAuthor={ParseJson(book.author)?.[0]}
          bookType={book.bookFormat}
          onClick={() => {
            navigate(section + '/' + book.bookID);
          }}
        />
      );
    });

    return (
      <div className="toe-book-page__body-section">
        <div className="toe-book-page__body-type toe-font-title">{title}</div>
        <div
          className={buildClass([
            'toe-book-page__body-content',
            document?.isLoading && 'js-loading',
          ])}
        >
          {document?.isLoading ? renderSkeleton(5) : data}
        </div>
        <div className="toe-book-page__body-btn">
          <Button
            shape={BUTTON_SHAPE.NORMAL}
            type={BUTTON_TYPE.RIGHT_ICON}
            rightIcon={<Chip label={document?.totalRecord} />}
            onClick={() => {
              handleClickSeeAll(section);
            }}
            name={'Xem tất cả'}
          />
        </div>
      </div>
    );
  };

  const renderReport = (title) => {
    return (
      <div className="toe-book-page__body-section">
        <div className="toe-book-page__body-type toe-font-title">{title}</div>
      </div>
    );
  };

  const renderSkeleton = (number) => {
    return Array.from(Array(number)).map((item, _) => (
      <div className="skeleton-book">
        <Skeleton key={_} height="200px" width="150px" />
      </div>
    ));
  };

  return (
    <Layout>
      <div className="toe-book-page">
        <Banner breadCrumbs={[{ label: 'mượn trả tài liệu', url: pathname }]} />
        <div className="toe-book-page__body-wrapper">
          <div className="toe-book-page__body">
            <div className="toe-book-page__body-main">
              <div
                className="toe-book-page__body-type toe-font-title"
                style={{ marginBottom: 8 }}
              >
                Tìm kiếm
              </div>
              <div className="toe-book-page__search">
                <Dropdown
                  options={filterTypeOptions}
                  defaultValue={defaultFilterType}
                  className="toe-book-page__search-dropdown-filter"
                  wrapperClass="toe-book-page__search-dropdown-filter__wrapper"
                />
                <Input
                  autoFocus
                  onChange={(e) => setCommonSearchValue(e)}
                  placeholder={'Tìm kiếm sách, tin tức, thông báo, tài liệu...'}
                />
                <Button
                  type={BUTTON_TYPE.LEFT_ICON}
                  leftIcon={<SearchOutlined />}
                  name={'Tìm kiếm'}
                  disabled={!commonSearchValue}
                  onClick={() => {}}
                />
                <Tooltip title="Bộ lọc">
                  <div
                    className="btn-show-advanced-filter"
                    onClick={() => setShowFilterEngine(true)}
                  >
                    <i className="pi pi-filter"></i>
                  </div>
                </Tooltip>
              </div>
              <div className="toe-book-page__search-engine"></div>
              {renderSection(
                SECTION_TEXT.DOCUMENT_NEW,
                documentNew,
                DOCUMENT_SECTION.DOCUMENT_NEW
              )}
              {renderSection(
                SECTION_TEXT.BORROWED_DOCUMENTS_A_LOT,
                {},
                DOCUMENT_SECTION.BORROWED_DOCUMENTS_A_LOT
              )}
              {renderSection(
                SECTION_TEXT.E_DOCUMENT_NEW,
                EDocumentNew,
                DOCUMENT_SECTION.BORROWED_DOCUMENTS_A_LOT
              )}
              {renderSection(
                SECTION_TEXT.BORROWED_EDOCUMENTS_A_LOT,
                DOCUMENT_SECTION.BORROWED_EDOCUMENTS_A_LOT
              )}
              {renderReport('Thống kê')}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <SideBar
        show={showFilterEngine}
        onClose={() => setShowFilterEngine(false)}
        title={'Bộ lọc nâng cao'}
        bottomRightButtons={[
          <Button
            name={'Hủy'}
            theme={BUTTON_THEME.THEME_6}
            onClick={() => setShowFilterEngine(false)}
          />,
          <Button name={'Tìm kiếm'} />,
        ]}
      >
        <FilterEngine
          defaultControls={selector.controls}
          defaultFilter={selector.filter}
          onChange={({ filter, controls }) => {
            dispatch(
              filterAction.changeBooksPageFilterEnige({ controls, filter })
            );
          }}
        />
      </SideBar>
    </Layout>
  );
}

export default BooksPage;
