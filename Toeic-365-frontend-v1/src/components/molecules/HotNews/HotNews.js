import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './hotNews.scss';
import moment from 'moment';

HotNews.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

HotNews.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function HotNews(props) {
  const { id, style, className } = props;

  const renderCommonItems = () => {
    const arr = Array.from(Array(10).keys());

    return arr.map((item) => (
      <div className="toe-hot-news__section-content">
        <div className="toe-hot-news__section-content__img">
          <img
            src={
              'https://images.unsplash.com/photo-1647887977201-46da49bacae7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            alt="Image"
          />
        </div>
        <div className="toe-hot-news__section-content__info">
          <div className="toe-hot-news__section-content__desc">
            Thư viện Trường ĐH Công nghiệp Hà Nội tổ chức chương trình Hướng dẫn
            khai thác, sử dụng thư viện cho sinh viên khóa mới
          </div>
          <div className="toe-hot-news__section-content__date">
            Thứ Sáu, 07:46 14/01/2022
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-hot-news toe-font-body', className])}
    >
      <div className="toe-hot-news__section">
        <h2 className="toe-hot-news__section-title toe-font-large-title">
          Tin tiêu điểm
        </h2>
        {renderCommonItems()}
      </div>
      <div className="toe-hot-news__section">
        <h2 className="toe-hot-news__section-title toe-font-large-title">
          Giới thiệu thư viện
        </h2>
        <div className="toe-hot-news__section-content"></div>
      </div>
    </div>
  );
}

export default HotNews;
