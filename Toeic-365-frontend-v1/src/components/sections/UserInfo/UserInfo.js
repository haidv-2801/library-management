import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { COMMON_AVATAR, PATH_NAME } from '../../../constants/commonConstant';
import { buildClass, isInAdminPage } from '../../../constants/commonFunction';
import { AuthContext } from '../../../contexts/authContext';
import PopupSelectionV1 from '../../atomics/base/PopupSelectionV1/PopupSelection';
import './userInfo.scss';

const UserInfo = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const POPUP_SELECTION_VALUES = {
    LOGOUT: 1,
    USER_INFOMATION: 2,
    CHANGE_PASSWORD: 3,
    ADMIN_PAGE: 4,
    GUEST_PAGE: 5,
    CART: 6,
  };

  const POPUP_SELECTION_OPTIONS = [
    {
      label: <span className="toe-font-label">Trang quản trị</span>,
      value: POPUP_SELECTION_VALUES.ADMIN_PAGE,
      isHide: !authCtx.isSysAdmin() || isInAdminPage(),
    },
    {
      label: <span className="toe-font-label">Trang khách</span>,
      value: POPUP_SELECTION_VALUES.GUEST_PAGE,
      isHide: !authCtx.isSysAdmin() || !isInAdminPage(),
    },
    {
      label: 'Giỏ hàng',
      value: POPUP_SELECTION_VALUES.CART,
      isHide: isInAdminPage(),
    },
    {
      label: 'Thông tin người dùng',
      value: POPUP_SELECTION_VALUES.USER_INFOMATION,
    },
    {
      label: 'Đổi mật khẩu',
      value: POPUP_SELECTION_VALUES.CHANGE_PASSWORD,
    },
    {
      label: <span style={{ color: 'red' }}>Đăng xuất</span>,
      value: POPUP_SELECTION_VALUES.LOGOUT,
    },
  ];

  const [userSelectValue, setUserSelectValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeOption = (data) => {
    setUserSelectValue(data.value);
    switch (data.value) {
      case POPUP_SELECTION_VALUES.LOGOUT:
        // history('/login');
        //Xóa cache chrome
        authCtx.logout();
        if (isInAdminPage()) {
          window.location.replace(PATH_NAME.LOGIN);
        }
        break;
      case POPUP_SELECTION_VALUES.USER_INFOMATION:
        if (!authCtx.isLoggedIn) {
          navigate(PATH_NAME.LOGIN);
        } else {
          navigate(PATH_NAME.USER);
        }
        break;
      case POPUP_SELECTION_VALUES.ADMIN_PAGE:
        navigate(PATH_NAME.ADMIN_DASBOARD);
        break;
      case POPUP_SELECTION_VALUES.GUEST_PAGE:
        navigate('/');
      case POPUP_SELECTION_VALUES.CHANGE_PASSWORD:
        navigate(PATH_NAME.USER + '?view=bao-mat');
        break;
      case POPUP_SELECTION_VALUES.CART:
        navigate(PATH_NAME.USER + '?view=gio-hang');
        break;
      default:
        break;
    }
  };

  return (
    <div className={buildClass(['toe-user-info'])}>
      <div className="user-name">{authCtx.auth()?.userName}</div>
      <PopupSelectionV1
        defaultValue={userSelectValue}
        onChange={handleChangeOption}
        options={POPUP_SELECTION_OPTIONS}
      >
        <div className="user-avatar">
          <img
            src={
              authCtx.auth()?.avatar ? authCtx.auth()?.avatar : COMMON_AVATAR
            }
            alt="avatar"
          />
        </div>
      </PopupSelectionV1>
    </div>
  );
};

export default UserInfo;
