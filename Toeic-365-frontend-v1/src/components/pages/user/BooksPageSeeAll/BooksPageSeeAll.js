import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BOOK_FORMAT } from '../../../../constants/commonConstant';
import Book from '../../../molecules/Book/Book';
import Footer from '../../../sections/User/FooterLib/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import Paginator from '../../../molecules/Paginator/Paginator';
import './booksPageSeeAll.scss';
import { buildClass } from '../../../../constants/commonFunction';

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
  const navigate = useNavigate();
  const [viewType, setViewType] = useState(VIEW_TYPE.SMALL);

  const fake = Array.from(Array(8).keys()).map((item, _) => (
    <div className="toe-book-see-all-page__body-content__item">
      <Book
        key={_}
        className="toe-book-see-all-page__body-content__book"
        bookTitle="Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ trong sản xuất may công nghiệp"
        bookAuthor="Nguyễn Thị Thảo"
        bookType={BOOK_FORMAT.EBOOK}
        onClick={() => {
          navigate('id=2342');
        }}
      />
      {viewType === VIEW_TYPE.SMALL && (
        <div className="toe-book-see-all-page__body-content__item-info">
          <h2 className="toe-book-see-all-page__body-content__item-info__row toe-font-label">
            Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ
            trong sản xuất may công nghiệp
          </h2>
          <div className="toe-book-see-all-page__body-content__item-info__row">
            <span className="toe-font-lalel">Loại tài liệu:</span>
          </div>
          <div className="toe-book-see-all-page__body-content__item-info__row">
            <span className="toe-font-lalel">Tác giả:</span>
          </div>
          <div className="toe-book-see-all-page__body-content__item-info__row">
            <span className="toe-font-lalel">Nhà xuất bản:</span>
          </div>
          <div className="toe-book-see-all-page__body-content__item-info__row">
            <span className="toe-font-lalel">Thông tin xếp giá:</span>
          </div>
        </div>
      )}
    </div>
  ));

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
        <div className="toe-book-see-all-page__body-wrapper">
          <div className="toe-book-see-all-page__body">
            <div className="toe-book-see-all-page__body-main">
              <div className="toe-book-see-all-page__body-main__left">
                {renderReport('Tài nguyên khác')}
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
