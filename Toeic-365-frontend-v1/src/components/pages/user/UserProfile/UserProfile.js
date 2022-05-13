import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseApi from '../../../../api/baseApi';
import { getUserID } from '../../../../constants/commonAuth';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  COMMON_AVATAR,
  OPERATOR,
  TEXT_FALL_BACK,
} from '../../../../constants/commonConstant';
import {
  buildClass,
  ParseJson,
  slugify,
} from '../../../../constants/commonFunction';
import END_POINT from '../../../../constants/endpoint';
import { USER_INFO } from '../../../../contexts/authContext';
import Input from '../../../atomics/base/Input/Input';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import { format } from 'react-string-format';
import './userProfile.scss';
import Button from '../../../atomics/base/Button/Button';
import { Tag } from 'antd';
import { SaveOutlined, CameraOutlined } from '@ant-design/icons';

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
  const [dataDetail, setDataDetail] = useState({});
  const [isHoverAvt, setIsHoverAvt] = useState(false);

  useEffect(() => {
    getUserByID(getUserID())
      .then((res) => {
        if (res?.data?.pageData?.length) {
          setDataDetail(res?.data?.pageData[0]);
        }
      })
      .catch((err) => {
        const user = window.localStorage.getItem(
          ParseJson(decodeURIComponent(USER_INFO))
        );
        setDataDetail(user);
      });
  }, []);

  const renderMenu = () => {
    return userMenu.map((menu, _) => (
      <div
        key={_}
        onClick={() => setCurrentView(menu)}
        className={buildClass([
          'user-profile__menu-item',
          currentView.value === menu.value && 'active-menu',
        ])}
      >
        {menu.label}
      </div>
    ));
  };

  const getUserByID = (id) => {
    const filter = [
      ['IsDeleted', OPERATOR.EQUAL, '0'],
      OPERATOR.AND,
      ['Status', OPERATOR.EQUAL, '1'],
      OPERATOR.AND,
      ['AccountID', OPERATOR.EQUAL, id],
    ];
    return baseApi.post(
      null,
      null,
      null,
      END_POINT.TOE_USER_FILTER,
      {
        filter: btoa(JSON.stringify(filter)),
        pageIndex: 1,
        pageSize: 1,
        columns: 'PhoneNumber,Email,AccountID,Address,FullName',
      },
      null
    );
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
                <div
                  className={buildClass([
                    'user-profile__avt-img',
                    isHoverAvt && 'hover',
                  ])}
                  onMouseOut={() => {
                    setIsHoverAvt(false);
                  }}
                  onMouseOver={() => {
                    setIsHoverAvt(true);
                  }}
                >
                  <img
                    src={
                      dataDetail?.avatar ? dataDetail?.avatar : COMMON_AVATAR
                    }
                    alt="avatar"
                    onerror={(e) => {
                      e.onerror = null;
                      e.src = COMMON_AVATAR;
                    }}
                  />

                  {isHoverAvt && (
                    <div className="user-profile__avt-icon-camera">
                      <CameraOutlined />
                    </div>
                  )}
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
                  <Input
                    label={'Tên tài khoản'}
                    disabled
                    placeholder={'Nhập tên tài khoản'}
                    value={dataDetail?.userName ?? TEXT_FALL_BACK.TYPE_1}
                    controlled
                  />
                  <Input
                    label={'Họ và tên'}
                    placeholder={'Nhập họ và tên'}
                    hasRequiredLabel
                    onChange={(e) => {
                      setDataDetail({ ...dataDetail, fullName: e });
                    }}
                    controlled
                    value={dataDetail?.fullName}
                  />
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'Email'}
                    value={dataDetail?.email}
                    disabled
                    controlled
                    placeholder={'Nhập email'}
                    hasRequiredLabel
                  />
                  <Input
                    label={'SĐT'}
                    value={dataDetail?.phoneNumber}
                    placeholder={'Nhập số điện thoại'}
                    onChange={(e) => {
                      setDataDetail({ ...dataDetail, phoneNumber: e });
                    }}
                    hasRequiredLabel
                    controlled
                  />
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'Ngày tham gia'}
                    disabled
                    placeholder={TEXT_FALL_BACK.TYPE_1}
                    value={dataDetail?.createdDate ?? TEXT_FALL_BACK.TYPE_1}
                    controlled
                  />
                </div>
                <div className="frame-right__body-row status">
                  <div className="toe-font-label">Trạng thái</div>
                  <div className="toe-font-label">
                    {' '}
                    <Tag color={dataDetail?.status ? '#87d068' : '#e5e5e5'}>
                      {dataDetail?.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Tag>
                  </div>
                </div>
                <div className="frame-right__body-row">
                  <TextAreaBase
                    label="Địa chỉ"
                    value={dataDetail?.address}
                    placeholder={'Nhập địa chỉ VD: quận huyện..'}
                  />
                </div>
                <div className="frame-right__body-row bottom-buttons">
                  <Button
                    width={100}
                    name={'Lưu'}
                    type={BUTTON_TYPE.LEFT_ICON}
                    leftIcon={<SaveOutlined />}
                    theme={BUTTON_THEME.THEME_2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
