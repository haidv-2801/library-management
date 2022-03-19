import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment';
import { RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './dynamicMenu.scss';

DynamicMenu.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

DynamicMenu.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
};

function DynamicMenu(props) {
  const { id, style, className, onClick } = props;
  const navigate = useNavigate();

  const MENU = [
    {
      key: '/account',
      title: 'Tài khoản thư viện',
    },
    {
      key: '/online-database',
      title: 'Cơ sở dữ liệu trực tuyến',
    },
    {
      key: '/internal-document',
      title: 'Tại liệu nội sinh',
    },
    {
      key: '/services',
      title: 'Dịch vụ thư viện',
    },
  ];

  const handleOnClick = (item) => {
    navigate(item.key);
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-dynamic-menu toe-font-body', className])}
    >
      <div className="toe-dynamic-menu__title">Thư viện của tôi</div>
      <div className="toe-dynamic-menu__item-wrap">
        {MENU.map((item) => {
          return (
            <div
              onClick={() => handleOnClick(item)}
              key={item.key}
              className="toe-dynamic-menu__item"
            >
              {<RightOutlined />} {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DynamicMenu;
