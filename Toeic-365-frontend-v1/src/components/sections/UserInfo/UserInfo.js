import React, { useState, useRef, useContext } from 'react';
import PopupSelection from '../../atomics/base/PopupSelection/PopupSelection';
import PopupSelectionV1 from '../../atomics/base/PopupSelectionV1/PopupSelection';
import Avatar from '../../../assets/images/me.jpg';
import { buildClass } from '../../../constants/commonFunction';
import { AuthContext } from '../../../contexts/authContext';
import useOnClickOutside from '../../../hooks/useClickOutSide';
import { useNavigate, useLocation } from 'react-router-dom';
import './userInfo.scss';
import { PATH_NAME } from '../../../constants/commonConstant';

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
  };

  const POPUP_SELECTION_OPTIONS = [
    {
      label: <span className="toe-font-label">Trang quản trị</span>,
      value: POPUP_SELECTION_VALUES.ADMIN_PAGE,
      isHide: !authCtx.isSysAdmin() || location.pathname.includes('/admin'),
    },
    {
      label: <span className="toe-font-label">Trang khách</span>,
      value: POPUP_SELECTION_VALUES.GUEST_PAGE,
      isHide: !authCtx.isSysAdmin() || !location.pathname.includes('/admin'),
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

  return (
    <div className={buildClass(['toe-user-info'])}>
      <div className="user-name">{authCtx.auth()?.userName}</div>
      <PopupSelectionV1
        defaultValue={userSelectValue}
        onChange={(data) => {
          setUserSelectValue(data.value);
          if (data.value === POPUP_SELECTION_VALUES.LOGOUT) {
            // history('/login');
            //Xóa cache chrome
            authCtx.logout();
            // window.location.replace(PATH_NAME.HOME);
            window.location.replace(PATH_NAME.LOGIN);
          } else if (data.value === POPUP_SELECTION_VALUES.USER_INFOMATION) {
            navigate(PATH_NAME.USER);
          } else if (data.value === POPUP_SELECTION_VALUES.ADMIN_PAGE) {
            navigate(PATH_NAME.ADMIN_DASBOARD);
          } else if (data.value === POPUP_SELECTION_VALUES.GUEST_PAGE) {
            navigate('/');
          }
        }}
        options={POPUP_SELECTION_OPTIONS}
      >
        <div className="user-avatar">
          <img
            src={
              authCtx.auth()?.avatar
                ? authCtx.auth()?.avatar
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png'
            }
            alt="avatar"
          />
        </div>
      </PopupSelectionV1>
    </div>
  );
};

export default UserInfo;
