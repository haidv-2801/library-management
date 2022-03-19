import React, { useState, useRef, useContext } from 'react';
import PopupSelection from '../../atomics/base/PopupSelection/PopupSelection';
import Avatar from '../../../assets/images/me.jpg';
import { buildClass } from '../../../constants/commonFunction';
import { AuthContext } from '../../../contexts/authContext';
import useOnClickOutside from '../../../hooks/useClickOutSide';
import { useNavigate, useLocation } from 'react-router-dom';
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
  };

  const POPUP_SELECTION_OPTIONS = [
    {
      label: <span className="toe-font-label">Trang quản trị</span>,
      value: POPUP_SELECTION_VALUES.ADMIN_PAGE,
      isHide: !authCtx.isSysAdmin() || location.pathname.includes('/admin'),
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

  const popupSelectionRef = useRef();
  useOnClickOutside((popupSelectionRef, () => setIsShowPopupSelection(false)));

  const [isShowPopupSelection, setIsShowPopupSelection] = useState(false);
  const [userSelectValue, setUserSelectValue] = useState();
  const handleShowOption = () => {
    setUserSelectValue(null);
    setIsShowPopupSelection(true);
  };

  return (
    <div className={buildClass(['toe-user-info'])}>
      <div className="user-name">{authCtx.auth()?.fullName}</div>
      <div onClick={handleShowOption} className="user-avatar">
        <img src={Avatar} alt="avatar" />
      </div>
      {isShowPopupSelection && (
        <span ref={popupSelectionRef}>
          <PopupSelection
            defaultValue={userSelectValue}
            onChange={(data) => {
              setUserSelectValue(data.value);
              if (data.value === POPUP_SELECTION_VALUES.LOGOUT) {
                // history('/login');
                //Xóa cache chrome
                authCtx.logout();
                window.location.replace('/home');
              } else if (
                data.value === POPUP_SELECTION_VALUES.USER_INFOMATION
              ) {
                //
              } else if (data.value === POPUP_SELECTION_VALUES.ADMIN_PAGE) {
                navigate('/admin');
              }
              setIsShowPopupSelection(false);
            }}
            onClose={() => setIsShowPopupSelection(false)}
            options={POPUP_SELECTION_OPTIONS}
          />
        </span>
      )}
    </div>
  );
};

export default UserInfo;
