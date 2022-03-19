import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './notificationList.scss';
import moment from 'moment';
import NotificationItem from '../NotificationItem/NotificationItem';

NotificationList.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

NotificationList.defaultProps = {
  id: '',
  className: '',
  style: {},
  data: [],
  isLoading: false,
};

function NotificationList(props) {
  const { id, style, className, data, isLoading } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-notification-list toe-font-body', className])}
    >
      {data.length
        ? data.map((noti) => {
            return (
              <NotificationItem
                title={noti?.title}
                date={noti?.date}
                description={noti?.description}
                isLoading={isLoading}
              />
            );
          })
        : null}
    </div>
  );
}

export default NotificationList;
