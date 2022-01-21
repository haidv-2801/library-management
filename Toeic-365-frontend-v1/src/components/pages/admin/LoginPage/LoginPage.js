import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoginBg from '../../../../assets/images/login.svg';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Modal from '../../../atomics/base/Modal/Modal';
import Button from '../../../atomics/base/Button/Button';
import { LoginOutlined, LoadingOutlined } from '@ant-design/icons';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import baseApi from '../../../../api/baseApi';
import { ADMIN_ENDPOINT } from '../../../../constants/endpoint';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './loginPage.scss';

import {
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
} from '../../../../constants/commonConstant';
import { useNavigate } from 'react-router-dom';

LoginPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

LoginPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function LoginPage() {
  const [loginInfo, setloginInfo] = useState({});
  const [validate, setvalidate] = useState({ email: true, password: true });
  const [isLoading, setIsLoading] = useState(false);
  const regex = new RegExp(REGEX.EMAIL);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!validate.email || !validate.password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin');
    }, 1000);
  };

  const isEmail = (email) => {
    return regex.test(email);
  };

  const isPassw = (passw) => {
    return passw?.trim()?.length >= 6;
  };

  const handleChangeControl = (e) => {
    switch (e.target.name) {
      case 'email':
        setvalidate({ ...validate, email: isEmail(e.target.value) });
        break;
      case 'password':
        setvalidate({ ...validate, password: isPassw(e.target.value) });
        break;
    }
    setloginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={buildClass(['toe-login-page'])}>
      <div className="toe-login-page__head">
        <img src={MainLogo} alt="logo" />
        <b className="name-app">
          TOEIC<span style={{ color: '#43c1c9' }}>365</span>
        </b>
      </div>
      <div className="toe-login-page__body"></div>
      <img className="toe-login-page-bg" src={LoginBg} alt="login" />
      <Modal
        title={' Chào mừng bạn đến với Toeic-365! 👋 '}
        children={
          <div className="toe-login-page__modal-body">
            <div className="toe-login-page__modal-body__des toe-font-body">
              Vui lòng đăng nhập để trải nghiệm website!{' '}
              <span
                className="text-high-light"
                onClick={() => navigate('/register')}
              >
                Tôi chưa có tài khoản
              </span>
            </div>
            <div className="toe-login-page__modal-body__group-input">
              <span className="p-float-label">
                <InputText
                  disabled={isLoading}
                  id="email"
                  name="email"
                  autoFocus
                  className={buildClass([
                    !validate.email && 'toe-control-validate',
                  ])}
                  onChange={handleChangeControl}
                  placeholder="Email"
                  onKeyPress={(e) => {
                    if (e.charCode === KEY_CODE.ENTER) {
                      handleLogin();
                    }
                  }}
                />
                {!validate.email && (
                  <span className="toe-label-validate">
                    Vui lòng nhập email hợp lệ.
                  </span>
                )}
              </span>

              <span className="p-float-label">
                <Password
                  disabled={isLoading}
                  id="password"
                  name="password"
                  className={buildClass([
                    !validate.password && 'toe-control-validate',
                  ])}
                  onChange={handleChangeControl}
                  toggleMask
                  placeholder="Mật khẩu"
                  weakLabel="Yếu"
                  mediumLabel="Vừa"
                  strongLabel="Mạnh"
                  onKeyPress={(e) => {
                    if (e.charCode === KEY_CODE.ENTER) {
                      handleLogin();
                    }
                  }}
                  panelStyle={{ display: 'none' }}
                />
                {!validate.password && (
                  <span className="toe-label-validate">
                    Mật khẩu ít nhất 6 kí tự.
                  </span>
                )}
              </span>
            </div>
          </div>
        }
        className="toe-login-page__modal"
        noXIcon
        footerRight={[
          <Button
            onClick={handleLogin}
            rightIcon={isLoading ? <LoadingOutlined /> : <LoginOutlined />}
            type={BUTTON_TYPE.RIGHT_ICON}
            name="Đăng nhập"
            disabled={
              !isEmail(loginInfo?.email) || !isPassw(loginInfo?.password)
            }
          />,
        ]}
      />
    </div>
  );
}

export default LoginPage;
