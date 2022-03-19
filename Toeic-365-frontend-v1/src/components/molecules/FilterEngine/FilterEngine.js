import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BUTTON_TYPE, DATE_FORMAT } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Input from '../../atomics/base/Input/Input';
import Button from '../../atomics/base/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import './filterEngine.scss';

FilterEngine.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

FilterEngine.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
};

function FilterEngine(props) {
  const { id, style, className, onClick } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-filter-engine toe-font-body', className])}
    >
      bo loc
    </div>
  );
}

export default FilterEngine;
