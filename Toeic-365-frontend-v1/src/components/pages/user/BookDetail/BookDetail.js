import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'react-string-format';
import {
  BOOK_FORMAT,
  BUTTON_SHAPE,
  BUTTON_THEME,
  BUTTON_TYPE,
  PATH_NAME,
  TEXT_FALL_BACK,
} from '../../../../constants/commonConstant';
import END_POINT from '../../../../constants/endpoint';
import Book from '../../../molecules/Book/Book';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './bookDetail.scss';
import axios from 'axios';
import baseApi from '../../../../api/baseApi';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import { getBookType } from '../function';
import { ParseJson } from '../../../../constants/commonFunction';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Button from '../../../atomics/base/Button/Button';
import { Tooltip } from 'antd';
import { AuthContext } from '../../../../contexts/authContext';
import { isArray } from 'lodash';

BookDetail.propTypes = {
  titlePage: PropTypes.string,
};

BookDetail.defaultProps = { titlePage: '' };

function BookDetail(props) {
  const { children, titlePage } = props;
  const params = useParams();
  const navigate = useNavigate();
  const cancelRequestRef = useRef();
  const context = useContext(AuthContext);
  const [dataDetail, setDataDetail] = useState({});
  const [isShowPreview, setIsShowPreview] = useState(false);

  useEffect(() => {
    getDetailBook(params?.id);

    return () => {
      if (cancelRequestRef.current) {
        cancelRequestRef.current?.Cancel();
      }
    };
  }, [params?.id]);

  const getDetailBook = (id) => {
    cancelRequestRef.current = axios.CancelToken.source();
    baseApi.get(
      (res) => {
        setDataDetail(res);
      },
      (err) => {},
      () => {},
      format(END_POINT.TOE_GET_BOOK_BY_ID, id),
      null,
      { cancelToken: cancelRequestRef.current?.token }
    );
  };

  const item = () => {
    debugger;
    let authors = ParseJson(dataDetail.author);
    if (isArray(authors))
      authors = authors?.map((item) => <div className="tag">{item}</div>);
    return (
      <div className="toe-book-detail-page__item">
        <Book
          className="toe-book-detail-page__book"
          bookTitle={dataDetail?.bookName}
          bookAuthor={ParseJson(dataDetail?.author)?.[0]}
          bookType={dataDetail?.bookFormat}
          onClick={() => {}}
        />
        <div className="toe-book-detail-page__item-info">
          <h2
            onClick={() => {}}
            className="toe-book-detail-page__item-info__row toe-font-label"
          >
            <SmartText innnerClassName="toe-font-large-title" rows={3}>
              {dataDetail?.bookName}
            </SmartText>
          </h2>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Loại tài liệu:</span>{' '}
            <span className="toe-font-body">
              {getBookType(dataDetail?.bookFormat)}
            </span>
          </div>
          <div
            className="toe-book-detail-page__item-info__row"
            style={{ display: 'flex' }}
          >
            <span className="toe-font-label">Tác giả:</span>
            <span className="toe-font-body infomation-col__title-row__tags">
              {authors}
            </span>
          </div>
          <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Nhà xuất bản:</span>
            <span className="toe-font-body">{dataDetail?.publisher}</span>
          </div>
          {/* <div className="toe-book-detail-page__item-info__row">
            <span className="toe-font-label">Thông tin xếp giá:</span>
            <span className="toe-font-body">C1</span>
          </div> */}
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

  const handleBorrowing = () => {
    if (!context.isLoggedIn) {
      navigate(PATH_NAME.LOGIN);
    } else {
    }
  };

  const handleBuying = () => {};

  const renderInformation = () => {
    return (
      <div className="book-detail__infomation">
        <div className="book-detail__infomation-col">
          <div className="infomation-col__title toe-font-label">
            Thông tin xếp giá
          </div>
          <div className="infomation-col__title-row toe-font-body">
            Tổng số bản: {dataDetail?.amount ?? TEXT_FALL_BACK.TYPE_4}
          </div>
          <div className="infomation-col__title-row toe-font-body">
            Tổng số bản rỗi: {dataDetail?.available ?? TEXT_FALL_BACK.TYPE_4}
          </div>
          <div className="infomation-col__title-row toe-font-body">
            Tổng số bản đang đặt chỗ:{' '}
            {dataDetail?.reserved ?? TEXT_FALL_BACK.TYPE_4}
          </div>
        </div>
        <div className="book-detail__infomation-col">
          <div className="infomation-col__title toe-font-label">Thao tác</div>
          <div className="infomation-col__title-row toe-font-body">
            <a onClick={handleBorrowing}>Đặt mượn</a>
            <span className="toe-font-hint">
              (Yêu cầu có hiệu lực 2 ngày từ khi đặt mượn)
            </span>
          </div>
          <div className="infomation-col__title-row toe-font-body">
            <a onClick={handleBuying}>Đặt mua</a>
          </div>
        </div>
        <div className="book-detail__infomation-col">
          <div className="infomation-col__title toe-font-label">Từ khóa</div>
          <div className="infomation-col__title-row infomation-col__title-row__tags toe-font-body">
            {dataDetail?.bookName?.split(' ').map((item) => (
              <div className="tag">{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handlePreview = () => {
    setIsShowPreview((p) => !p);
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
                  <Tooltip title="Xem trước PDF">
                    <div style={{ width: 'fit-content' }}>
                      <Button
                        className="button-preview"
                        theme={BUTTON_THEME.THEME_4}
                        type={BUTTON_TYPE.LEFT_ICON}
                        leftIcon={
                          isShowPreview ? (
                            <EyeInvisibleOutlined />
                          ) : (
                            <EyeOutlined />
                          )
                        }
                        shape={BUTTON_SHAPE.NORMAL}
                        name={'Xem trước'}
                        onClick={handlePreview}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="__row">{isShowPreview ? 'ádasd' : null}</div>
                <div className="__row">{renderInformation()}</div>
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
