import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'react-string-format';
import { Toast } from 'primereact/toast';
import {
  BOOK_FORMAT,
  BUTTON_SHAPE,
  BUTTON_THEME,
  BUTTON_TYPE,
  PATH_NAME,
  REQUIRED_FILEDS_BORROWING_BOOK,
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
import { buildClass, ParseJson } from '../../../../constants/commonFunction';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Button from '../../../atomics/base/Button/Button';
import { Tooltip } from 'antd';
import { AuthContext } from '../../../../contexts/authContext';
import { isArray } from 'lodash';
import { getUserID } from '../../../../constants/commonAuth';
import Message from '../../../atomics/base/Message/Message';
import { appAction } from '../../../../redux/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CartContext } from '../../../../contexts/cartContext';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

BookDetail.propTypes = {
  titlePage: PropTypes.string,
};

BookDetail.defaultProps = { titlePage: '' };

function BookDetail(props) {
  const { children, titlePage } = props;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancelRequestRef = useRef();
  const toast = useRef(null);

  const context = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [dataDetail, setDataDetail] = useState({});
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const { pathname, search } = useLocation();

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
        if (!res.available) {
          setErrorMessage('Tài liệu tạm thời không có sẵn');
        }
      },
      (err) => {},
      () => {},
      format(END_POINT.TOE_GET_BOOK_BY_ID, id),
      null,
      { cancelToken: cancelRequestRef.current?.token }
    );
  };

  const bookItem = () => {
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
          image={dataDetail?.image}
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
      dispatch(appAction.changeHistory([pathname + search]));
    } else {
      const userID = getUserID();
      getUserByID(userID)
        .then((res) => {
          //Xem user hiện tại đã đủ thông tin chưa
          const requireFields = Object.values(REQUIRED_FILEDS_BORROWING_BOOK);
          const isEnough = requireFields.every(
            (item) => res[item.en] && res[item.en]?.trim() != ''
          );
          if (isEnough) {
            handleAddToCard(dataDetail);
          } else {
            let err =
                'Vui lòng {0} đầy đủ thông tin {1} để có thể tiếp thục thao tác.',
              lostField = requireFields
                .filter((item) => !res[item.en] || res[item.en]?.trim() === '')
                .map((item) => item.vi);

            setErrorMessage(
              format(
                err,
                <span
                  onClick={() => {
                    navigate(PATH_NAME.USER);
                  }}
                  className="text-underline"
                >
                  cập nhật
                </span>,
                <b style={{ color: '' }}>{lostField.join(', ')}</b>
              )
            );
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Có lỗi xảy ra',
            life: 3000,
          });
        });
    }
  };

  const handleAddToCard = (dataDetail) => {
    const success = cartContext.add({ id: dataDetail?.bookID, amount: 1 });
    if (success) {
      setVisible(true);
      toast.current.show({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thêm sách thành công',
        life: 3000,
      });
    }
  };

  const getUserByID = (id) => {
    return baseApi.get(
      null,
      null,
      null,
      format(END_POINT.TOE_GET_USER_BY_ID, id),
      null,
      null
    );
  };

  const handleBuying = () => {};

  const renderInformation = () => {
    return (
      <div className="book-detail__infomation">
        {errorMessage ? <Message title={errorMessage} /> : null}
        <div className="info">
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
              <a
                id="js-button-add-to-cart"
                className={buildClass([!dataDetail?.available && 'disable'])}
                onClick={handleBorrowing}
              >
                Đặt mượn
              </a>
              <span className="toe-font-hint">
                (Yêu cầu có hiệu lực 2 ngày từ khi đặt mượn)
              </span>
            </div>
            <div className="infomation-col__title-row toe-font-body">
              <a
                className={buildClass([!dataDetail?.available && 'disable'])}
                onClick={handleBuying}
              >
                Đặt mua
              </a>
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
      </div>
    );
  };

  const handlePreview = () => {
    setIsShowPreview((p) => !p);
  };

  const acceptGoToCart = () => {
    navigate(PATH_NAME.USER + '?view=gio-hang');
  };

  const rejectGoToCart = () => {};

  return (
    <Layout>
      <div className="toe-book-detail-page">
        <div className="toe-book-detail-page__body-wrapper">
          <div className="toe-book-detail-page__body">
            <div className="toe-book-detail-page__body-main">
              <div className="toe-book-detail-page__body-main__left toe-font-body">
                <div className="__row">{bookItem()}</div>
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
        <Toast ref={toast}></Toast>
        <ConfirmPopup
          className="toe-font-body"
          target={document.getElementById('js-button-add-to-cart')}
          visible={visible}
          onHide={() => setVisible(false)}
          message="Bạn có muốn đi đến giỏ hàng?"
          icon="pi pi-shopping-cart"
          acceptLabel="Đồng ý"
          rejectLabel="Hủy"
          acceptClassName="btn-accept-go-cart"
          rejectClassName="btn-accept-go-cart"
          accept={acceptGoToCart}
          reject={rejectGoToCart}
        />
      </div>
    </Layout>
  );
}

export default BookDetail;
