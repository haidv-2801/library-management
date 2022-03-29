import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BOOK_FORMAT } from '../../../../constants/commonConstant';
import Book from '../../../molecules/Book/Book';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './bookDetail.scss';

BookDetail.propTypes = {
  titlePage: PropTypes.string,
};

BookDetail.defaultProps = { titlePage: '' };

function BookDetail(props) {
  const { children, titlePage } = props;
  const params = useParams();

  const item = (params) => {
    return (
      <div className="toe-book-detail-page__item">
        <Book
          className="toe-book-detail-page__book"
          bookTitle="Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ trong sản xuất may công nghiệp"
          bookAuthor="Nguyễn Thị Thảo"
          bookType={BOOK_FORMAT.EBOOK}
          onClick={() => {}}
        />
        <div className="toe-book-detail-page__item-info">
          <h2
            onClick={() => {}}
            className="toe-book-detail-page__item-info__row toe-font-label"
          >
            Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ
            trong sản xuất may công nghiệp
          </h2>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Loại tài liệu:</span>{' '}
            <span className="toe-font-body">Tài liệu giấy</span>
          </div>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Tác giả:</span>
            <span className="toe-font-body">Đỗ Văn Hải</span>
          </div>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Nhà xuất bản:</span>
            <span className="toe-font-body">Kim Đồng</span>
          </div>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Thông tin xếp giá:</span>
            <span className="toe-font-body">C1</span>
          </div>
        </div>
      </div>
    );
  };

  const renderReport = (title) => {
    return (
      <div className="toe-book-detail-page__body-section">
        <div className="toe-book-detail-page__body-type toe-font-title">
          {title}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="toe-book-detail-page">
        <div className="toe-book-detail-page__body-wrapper">
          <div className="toe-book-detail-page__body">
            <div className="toe-book-detail-page__body-main">
              <div className="toe-book-detail-page__body-main__left toe-font-body">
                <div className="__row">{item()}</div>
                <div className="__row">
                  <div className="book-detail__infomation">
                    <div className="book-detail__infomation-col">
                      <div className="infomation-col__title toe-font-label">
                        Thông tin xếp giá
                      </div>
                      <div className="infomation-col__title-row toe-font-body">
                        Tổng số bản: 0
                      </div>
                      <div className="infomation-col__title-row toe-font-body">
                        Tổng số bản rỗi: 0
                      </div>
                      <div className="infomation-col__title-row toe-font-body">
                        Tổng số bản đang đặt chỗ: 0
                      </div>
                    </div>
                    <div className="book-detail__infomation-col">
                      <div className="infomation-col__title toe-font-label">
                        Đặt mượn
                      </div>
                    </div>
                    <div className="book-detail__infomation-col">
                      <div className="infomation-col__title toe-font-label">
                        Từ khóa
                      </div>
                    </div>
                  </div>
                </div>
                <div className="__row"></div>
                <div className="__row"></div>
              </div>
              <div className="toe-book-detail-page__body-main__right toe-font-body">
                {renderReport('Tài nguyên khác')}
                <div className="__other-resource">Z39.50</div>
                <div className="__other-resource">OAI/PMH</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default BookDetail;
