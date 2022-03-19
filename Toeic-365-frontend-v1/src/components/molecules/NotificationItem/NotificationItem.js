import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './notificationItem.scss';
import moment from 'moment';

NotificationItem.propTypes = {
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

NotificationItem.defaultProps = {
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

function NotificationItem(props) {
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
      className={buildClass(['toe-notification-item toe-font-body', className])}
      onClick={onClick}
    >
      <div className="toe-notification-item__image">
        {isLoading ? (
          <Skeleton height="100%"></Skeleton>
        ) : (
          <img
            src={
              'https://images.unsplash.com/photo-1640622304964-3e2c2c0cd7cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            alt="Image"
          />
        )}
      </div>
      {isLoading ? (
        <div className="toe-notification-item__info">
          <div className="toe-notification-item__title">
            <Skeleton width="40rem" height="2rem"></Skeleton>
          </div>
          <div className="toe-notification-item__date toe-font-hint">
            <Skeleton width="30rem" height="1rem"></Skeleton>
          </div>
          <div className="toe-notification-item__desc">
            <Skeleton width="40rem" height="1rem"></Skeleton>
          </div>
        </div>
      ) : (
        <div className="toe-notification-item__info">
          <div className="toe-notification-item__title">
            <SmartText>{title}</SmartText>
          </div>
          <div className="toe-notification-item__date toe-font-hint">
            Ngày tạo: {moment(date).format(DATE_FORMAT.TYPE_1)} - Lượt xem:{' '}
            {1100}
          </div>
          <div className="toe-notification-item__desc">
            <SmartText rows={2}>{description}</SmartText>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationItem;
