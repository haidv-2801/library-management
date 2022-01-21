import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import RegisterBg from '../../../../assets/images/register.svg';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Modal from '../../../atomics/base/Modal/Modal';
import Button from '../../../atomics/base/Button/Button';
import { LoginOutlined } from '@ant-design/icons';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import baseApi from '../../../../api/baseApi';
import { ADMIN_ENDPOINT } from '../../../../constants/endpoint';

import './userPage.scss';
import {
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
} from '../../../../constants/commonConstant';

UserPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

UserPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function UserPage(props) {
  const { id, style, className } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-admin-user-page', className])}
    ></div>
  );
}

export default UserPage;
