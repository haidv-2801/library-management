import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass, slugify } from '../../../../../constants/commonFunction';
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
import Modal from '../../../../atomics/base/ModalV2/Modal';
import UpLoadImage from '../../../../molecules/UpLoadImage/UpLoadImage';
import TreeSelect from '../../../../atomics/base/TreeSelect/TreeSelect';
import Dropdown from '../../../../molecules/Dropdown/Dropdown';
import GroupCheck from '../../../../molecules/GroupCheck/GroupCheck';
import { GUID_NULL } from '../../../../../constants/commonConstant';
import './popupCreateMenu.scss';
import InputNumber from '../../../../atomics/base/InputNumber/InputNumber';

PopupCreateMenu.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
};

PopupCreateMenu.defaultProps = {
  id: '',
  className: '',
  style: {},
  show: false,
  onClose: () => {},
  onChange: () => {},
};

function PopupCreateMenu(props) {
  const { show, id, className, style, onClose, onChange } = props;
  const DROPDOWN_OPTIONS = [
    { label: 'Có hiển thị trang chủ', value: true },
    { label: 'Không hiển thị trang chủ', value: false },
  ];

  //#region state
  const [isActive, setIsActive] = useState(true);

  const [data, setData] = useState({
    status: true,
    isShowHome: true,
    title: '',
    slug: '',
    parentID: GUID_NULL,
    displayOrder: 0,
  });
  //#endregion

  //#endregion
  useEffect(() => {
    onChange(data);
  }, [data]);

  //#region

  return (
    <Modal
      {...props}
      onClose={onClose}
      show={show}
      title="Tạo mới menu"
      className="toe-popup-create-menu"
    >
      <div className="toe-popup-create-menu__right">
        <div className="toe-popup-create-menu__row">
          <Input
            autoFocus
            hasRequiredLabel
            label="Tên menu"
            placeholder="Nhập tên menu"
            onChange={(e) => {
              setData({ ...data, title: e, slug: slugify(e) });
            }}
          />
        </div>
        <div className="toe-popup-create-menu__row">
          <Input
            hasRequiredLabel
            label="Alias"
            placeholder="Nhập alias"
            controlled
            value={data.slug}
            onChange={(e) => {
              setData({ ...data, slug: e });
            }}
          />
        </div>
        <div className="toe-popup-create-menu__row">
          <TreeSelect
            hasRequiredLabel
            label="Menu cha"
            placeholder="Nhấp để chọn"
          />
        </div>
        <div className="toe-popup-create-menu__row">
          <InputNumber
            hasRequiredLabel
            label="Mức độ hiển thị"
            placeholder="Nhập mức độ hiển thị"
            onChange={(e) => {
              setData({ ...data, displayOrder: e });
            }}
          />
        </div>
        <div className="toe-popup-create-menu__row">
          <span className="toe-font-label">Loại hiển thị</span>
          <Dropdown
            defaultValue={data.isShowHome}
            onChange={(e) => {
              setData({ ...data, isShowHome: e.value });
            }}
            options={DROPDOWN_OPTIONS}
          />
        </div>
        <div className="toe-popup-create-menu__row">
          {' '}
          <GroupCheck
            onClick={(e) => {
              setData({ ...data, status: !data.status });
            }}
            defaultValue={data.status}
            options={[{ label: 'Hoạt động', value: true }]}
          />
        </div>
      </div>
    </Modal>
  );
}

export default PopupCreateMenu;
