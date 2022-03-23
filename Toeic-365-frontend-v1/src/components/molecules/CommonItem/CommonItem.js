import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './commonItem.scss';
import moment from 'moment';

CommonItem.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  imgSrc: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  date: PropTypes.any,
  isLoading: PropTypes.bool,
};

CommonItem.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
  imgSrc: null,
  title: null,
  description: null,
  width: '20em',
  isLoading: false,
  date: null,
};

function CommonItem(props) {
  const {
    id,
    style,
    className,
    onClick,
    imgSrc,
    title,
    description,
    date,
    isLoading,
  } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-common-item toe-font-body', className])}
      onClick={onClick}
    >
      <div className="toe-common-item__image">
        {isLoading ? (
          <Skeleton height="100%"></Skeleton>
        ) : (
          <img
            src={
              'https://images.unsplash.com/photo-1647882979170-a4e462043b8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1140&q=80'
            }
            alt="Image"
            preview
          />
        )}
      </div>
      {isLoading ? (
        <div className="toe-common-item__info">
          <div className="toe-common-item__title">
            <Skeleton width="40rem" height="2rem"></Skeleton>
          </div>
          <div className="toe-common-item__date toe-font-hint">
            <Skeleton width="30rem" height="1rem"></Skeleton>
          </div>
          <div className="toe-common-item__desc">
            <Skeleton width="40rem" height="1rem"></Skeleton>
          </div>
        </div>
      ) : (
        <div className="toe-common-item__info">
          <div className="toe-common-item__title">
            <SmartText rows={3}>{title}</SmartText>
          </div>
          <div className="toe-common-item__date toe-font-hint">
            Ngày tạo: {moment(date).format(DATE_FORMAT.TYPE_1)} - Lượt xem:{' '}
            {1100}
          </div>
          <p className="toe-common-item__desc">
            <SmartText rows={3}>{description}</SmartText>
          </p>
          <div style={{ flex: 1 }}></div>
          <div className="toe-common-item__see-more">Xem thêm</div>
        </div>
      )}
    </div>
  );
}

export default CommonItem;
