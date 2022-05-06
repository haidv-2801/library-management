import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BOOK_FORMAT } from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import Banner from '../../../molecules/Banner/Banner';
import Book from '../../../molecules/Book/Book';
import Paginator from '../../../molecules/Paginator/Paginator';
import Footer from '../../../sections/User/FooterLib/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './booksPageSeeAll.scss';

BooksPageSeeAll.propTypes = {
  titlePage: PropTypes.string,
};

BooksPageSeeAll.defaultProps = { titlePage: '' };

const fake = Array.from(Array(8).keys()).map((item, _) => (
  <Book
    key={_}
    className="toe-book-see-all-page__body-content__book"
    bookTitle="Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ trong sản xuất may công nghiệp"
    bookAuthor="Nguyễn Thị Thảo"
    bookType={BOOK_FORMAT.EBOOK}
  />
));

function BooksPageSeeAll(props) {
  const { children, titlePage } = props;
  const VIEW_TYPE = {
    LARGE: 0,
    SMALL: 1,
  };

  const params = useParams();
  const { pathname } = useLocation();
  const breadCrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((item, _) => ({ label: item, url: _ === 0 ? '/' + item : item }));

  const navigate = useNavigate();
  const [viewType, setViewType] = useState(VIEW_TYPE.SMALL);

  const handleViewDetail = () => {
    navigate('2342');
  };

  const fake = useMemo(() => {
    return Array.from(Array(8).keys()).map((item, _) => (
      <div key={_} className="toe-book-see-all-page__body-content__item">
        <Book
          className="toe-book-see-all-page__body-content__book"
          bookTitle="Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ trong sản xuất may công nghiệp"
          bookAuthor="Nguyễn Thị Thảo"
          bookType={BOOK_FORMAT.EBOOK}
          onClick={handleViewDetail}
        />
        {viewType === VIEW_TYPE.SMALL && (
          <div className="toe-book-see-all-page__body-content__item-info">
            <h2
              onClick={handleViewDetail}
              className="toe-book-see-all-page__body-content__item-info__row toe-font-label"
            >
              Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ
              trong sản xuất may công nghiệp
            </h2>
            <div className="toe-book-see-all-page__body-content__item-info__row">
              <span className="toe-font-label">Loại tài liệu:</span>{' '}
              <span className="toe-font-body">Tài liệu giấy</span>
            </div>
            <div className="toe-book-see-all-page__body-content__item-info__row">
              <span className="toe-font-label">Tác giả:</span>
              <span className="toe-font-body">Đỗ Văn Hải</span>
            </div>
            <div className="toe-book-see-all-page__body-content__item-info__row">
              <span className="toe-font-label">Nhà xuất bản:</span>
              <span className="toe-font-body">Kim Đồng</span>
            </div>
            <div className="toe-book-see-all-page__body-content__item-info__row">
              <span className="toe-font-label">Thông tin xếp giá:</span>
              <span className="toe-font-body">C1</span>
            </div>
          </div>
        )}
      </div>
    ));
  }, [viewType]);

  const renderReport = (title) => {
    return (
      <div className="toe-book-see-all-page__body-section">
        <div className="toe-book-see-all-page__body-type toe-font-title">
          {title}
        </div>
      </div>
    );
  };

  const renderSection = (title) => {
    return (
      <div className="toe-book-see-all-page__body-section">
        <div className="toe-book-see-all-page__body-type toe-font-title">
          {title}
        </div>
        <div
          className={buildClass([
            'toe-book-see-all-page__body-content',
            viewType === VIEW_TYPE.SMALL && 'view-type-small',
          ])}
        >
          {fake}
        </div>
      </div>
    );
  };

  const handleChangeViewType = (viewtype) => {
    setViewType(viewtype);
  };

  return (
    <Layout>
      <div className="toe-book-see-all-page">
        <Banner breadCrumbs={breadCrumbs} />
        <div className="toe-book-see-all-page__body-wrapper">
          <div className="toe-book-see-all-page__body">
            <div className="toe-book-see-all-page__body-main">
              <div className="toe-book-see-all-page__body-main__left toe-font-body">
                {renderReport('Tài nguyên khác')}
                <div className="__other-resource">Z39.50</div>
                <div className="__other-resource">OAI/PMH</div>
              </div>
              <div className="toe-book-see-all-page__body-main__right">
                {renderReport('Tài liệu mượn nhiều')}
                <div className="toe-book-see-all-page__body-main__right__nav-view-item">
                  <div
                    onClick={() => handleChangeViewType(VIEW_TYPE.SMALL)}
                    className={buildClass([
                      'nav-view-item',
                      viewType === VIEW_TYPE.SMALL && 'nav-view-item--selected',
                    ])}
                  >
                    <i className="pi pi-list"></i>
                  </div>
                  <div
                    onClick={() => handleChangeViewType(VIEW_TYPE.LARGE)}
                    className={buildClass([
                      'nav-view-item',
                      viewType === VIEW_TYPE.LARGE && 'nav-view-item--selected',
                    ])}
                  >
                    <i className="pi pi-th-large"></i>
                  </div>
                </div>
                {renderSection()}
              </div>
            </div>
          </div>
          <Paginator totalRecords={100} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default BooksPageSeeAll;
