import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoginBg from '../../../../assets/images/login.svg';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Modal from '../../../atomics/base/Modal/Modal';
import Button from '../../../atomics/base/Button/Button';
import { LoginOutlined } from '@ant-design/icons';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './loginPage.scss';
import { BUTTON_TYPE } from '../../../../constants/commonConstant';
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
  const navigate = useNavigate();
  const handleLogin = () => {};

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
                  id="email"
                  name="email"
                  onChange={(e) =>
                    setloginInfo({
                      ...loginInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Email"
                />
              </span>

              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setloginInfo({
                      ...loginInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  toggleMask
                  placeholder="Mật khẩu"
                />
              </span>
            </div>
          </div>
        }
        className="toe-login-page__modal"
        noXIcon
        footerRight={[
          <Button
            onClick={handleLogin}
            rightIcon={<LoginOutlined />}
            type={BUTTON_TYPE.RIGHT_ICON}
            name="Đăng nhập"
          />,
        ]}
      />
    </div>
  );
}

export default LoginPage;
