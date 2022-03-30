import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TEXT_FALL_BACK } from '../../../../constants/commonConstant';
import { slugify } from '../../../../constants/commonFunction';
import Input from '../../../atomics/base/Input/Input';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './userProfile.scss';

UserProfile.propTypes = {
  titlePage: PropTypes.string,
};

UserProfile.defaultProps = { titlePage: '' };

function UserProfile(props) {
  const { children, titlePage } = props;

  const MENU_NAME = {
    ACCOUNT: 'Tài khoản',
    SECURITY: 'Bảo mật',
    NOTIFICATION: 'Thông báo',
    BORROW_RETURN: 'Mượn trả',
  };

  const userMenu = [
    { label: MENU_NAME.ACCOUNT, value: slugify(MENU_NAME.ACCOUNT) },
    { label: MENU_NAME.SECURITY, value: slugify(MENU_NAME.SECURITY) },
    { label: MENU_NAME.NOTIFICATION, value: slugify(MENU_NAME.NOTIFICATION) },
    { label: MENU_NAME.BORROW_RETURN, value: slugify(MENU_NAME.BORROW_RETURN) },
  ];

  const params = useParams();
  const [currentView, setCurrentView] = useState(userMenu[0]);

  const renderMenu = () => {
    return userMenu.map((menu, _) => (
      <div
        key={_}
        onClick={() => setCurrentView(menu)}
        className="user-profile__menu-item"
      >
        {menu.label}
      </div>
    ));
  };

  const handleChangeMenuView = (value) => {
    let view = accountView();

    switch (value) {
      case MENU_NAME.ACCOUNT:
        view = accountView();
        break;
      case MENU_NAME.SECURITY:
        view = secureView();
        break;
      case MENU_NAME.NOTIFICATION:
        view = notifyView();
        break;
      case MENU_NAME.BORROW_RETURN:
        view = borrowReturnView();
        break;

      default:
        view = accountView();
        break;
    }

    return view;
  };

  const accountView = () => {
    return null;
  };

  const secureView = () => {
    return null;
  };

  const notifyView = () => {
    return null;
  };

  const borrowReturnView = () => {
    return null;
  };

  return (
    <Layout>
      <div className="toe-user-profile-page">
        <div className="toe-user-profile-page__body-wrapper">
          <div className="user-profile__frame">
            <div className="user-profile__frame-left">
              <div className="user-profile__avt">
                <div className="user-profile__avt-img">
                  <img
                    src={require('../../../../assets/images/me.jpg')}
                    alt="avatar"
                  />
                </div>
                <div className="user-profile__avt-name toe-font-title">
                  DO VAN HAI
                </div>
              </div>
              <div className="user-profile__menu toe-font-body">
                {renderMenu()}
              </div>
            </div>
            <div className="user-profile__frame-right">
              <div className="user-profile__frame-right__title toe-font-title">
                {currentView?.label || TEXT_FALL_BACK.TYPE_1}
              </div>
              <div className="user-profile__frame-right__body toe-font-body">
                <div className="frame-right__body-row">
                  <Input label={'Họ'} placeholder={'Nhập họ'} />
                  <Input label={'Tên'} placeholder={'Nhập tên'} />
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'Email'}
                    defaultValue="haidv2801@gmail.com"
                    disabled
                    placeholder={'Nhập email'}
                  />
                  <Input label={'SĐT'} placeholder={'Nhập số điện thoại'} />
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'Ngày tham gia'}
                    disabled
                    placeholder={TEXT_FALL_BACK.TYPE_1}
                    defaultValue="20/10/2021"
                  />
                </div>
                <div className="frame-right__body-row">
                  <div className="toe-font-label">Trạng thái</div>
                </div>
                <div className="frame-right__body-row">
                  <TextAreaBase
                    label="Địa chỉ"
                    placeholder={'Nhập địa chỉ VD: quận huyện..'}
                  />
                </div>
                <div className="frame-right__body-row bottom-buttons"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
