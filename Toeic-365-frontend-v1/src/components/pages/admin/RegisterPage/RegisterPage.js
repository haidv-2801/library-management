import React, { useState } from 'react';
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

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './registerPage.scss';
import { BUTTON_TYPE } from '../../../../constants/commonConstant';

RegisterPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

RegisterPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({});
  const navigate = useNavigate();
  const handleRegister = () => {
    console.log(registerInfo);
  };

  return (
    <div className={buildClass(['toe-register-page'])}>
      <div className="toe-register-page__head">
        <img src={MainLogo} alt="logo" />
        <b className="name-app">
          TOEIC<span style={{ color: '#43c1c9' }}>365</span>
        </b>
      </div>
      <div className="toe-register-page__body"></div>
      <img className="toe-register-page-bg" src={RegisterBg} alt="login" />
      <Modal
        title={' Chào mừng bạn đến với Toeic-365! 👋 '}
        children={
          <div className="toe-register-page__modal-body">
            <div className="toe-register-page__modal-body__des toe-font-body">
              Vui lòng đăng kí tài khoản để trải nghiệm website!{' '}
              <span
                className="text-high-light"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </span>
            </div>
            <div className="toe-register-page__modal-body__group-input">
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="userName"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Tên người dùng"
                />
              </span>
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
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
                    setRegisterInfo({
                      ...registerInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  toggleMask
                  placeholder="Mật khẩu"
                />
              </span>

              <span className="p-float-label">
                <Password
                  id="repassword"
                  name="rePassword"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  toggleMask
                  placeholder="Nhập lại mật khẩu"
                />
              </span>
            </div>
          </div>
        }
        className="toe-register-page__modal"
        noXIcon
        footerRight={[<Button onClick={handleRegister} name="Đăng ký" />]}
      />
    </div>
  );
}

export default RegisterPage;
