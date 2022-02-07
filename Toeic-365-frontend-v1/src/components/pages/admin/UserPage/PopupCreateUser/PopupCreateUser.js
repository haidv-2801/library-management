import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../../../constants/commonFunction';
import Button from '../../../../atomics/base/Button/Button';
import baseApi from '../../../../../api/baseApi';
import { ADMIN_ENDPOINT } from '../../../../../constants/endpoint';
import {
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
  BUTTON_THEME,
} from '../../../../../constants/commonConstant';
import SmartText from '../../../../atomics/base/SmartText/SmartText';
import Input from '../../../../atomics/base/Input/Input';
import Modal from '../../../../atomics/base/Modal/Modal';
import UpLoadImage from '../../../../molecules/UpLoadImage/UpLoadImage';
import './popupCreateUser.scss';

PopupCreateUser.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

PopupCreateUser.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function PopupCreateUser(props) {
  return (
    <Modal {...props} className="toe-popup-create-user">
      <div className="toe-popup-create-user__left">
        {/* <div className="toe-popup-create-user__left-avatar-wrapper">
          <i class="pi pi-user"></i>
        </div>
        <Button
          type={BUTTON_TYPE.LEFT_ICON}
          leftIcon={<i class="pi pi-upload"></i>}
          theme={BUTTON_THEME.THEME_6}
          name="upload"
        /> */}
        <UpLoadImage />
      </div>
      <div className="toe-popup-create-user__right">
        <div className="toe-popup-create-user__row">
          <Input
            autoFocus
            hasRequiredLabel
            label="Tên người dùng"
            placeholder="Nhập tên người dùng"
          />
        </div>
        <div className="toe-popup-create-user__row">
          <Input hasRequiredLabel label="Email" placeholder="Email" />
        </div>
        <div className="toe-popup-create-user__row">
          <Input
            hasRequiredLabel
            label="Mật khẩu"
            placeholder="Nhập mật khẩu (tối thiểu 8 kí tự)"
          />
        </div>
        <div className="toe-popup-create-user__row">
          <Input
            hasRequiredLabel
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
      </div>
    </Modal>
  );
}

export default PopupCreateUser;
