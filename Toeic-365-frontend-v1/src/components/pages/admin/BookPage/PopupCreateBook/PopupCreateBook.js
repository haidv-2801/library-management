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
  MAXIMUM_FILE_SIZE,
  ACCEPT_FILE,
} from '../../../../../constants/commonConstant';
import SmartText from '../../../../atomics/base/SmartText/SmartText';
import Input from '../../../../atomics/base/Input/Input';
import Modal from '../../../../atomics/base/ModalV2/Modal';
import UpLoadImage from '../../../../molecules/UpLoadImage/UpLoadImage';
import { Password } from 'primereact/password';
import InputPassword from '../../../../atomics/base/InputPassword/InputPassword';
import FilterEngine from '../../../../molecules/FilterEngine/FilterEngine';
import { FileUpload } from 'primereact/fileupload';
import { Upload, message, Button as ButtonAntd } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Dropdown from '../../../../molecules/Dropdown/Dropdown';
import TreeSelect from '../../../../atomics/base/TreeSelect/TreeSelect';
import './popupCreateBook.scss';

PopupCreateBook.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  title: PropTypes.any,
  dataCategory: PropTypes.object,
};

PopupCreateBook.defaultProps = {
  id: '',
  className: '',
  style: {},
  show: false,
  onClose: () => {},
  onChange: () => {},
  defaultValue: null,
  title: null,
  dataCategory: {},
};

function PopupCreateBook(props) {
  const {
    show,
    id,
    className,
    style,
    onClose,
    defaultValue,
    onChange,
    title,
    dataCategory,
  } = props;
  const [dataCreate, setDataCreate] = useState(defaultValue ?? {});

  useEffect(() => {
    onChange(dataCreate);
  }, [dataCreate]);

  const onBasicUpload = (data) => {};

  const onSelectImage = (data) => {
    debugger;
  };

  return (
    <Modal
      {...props}
      onClose={onClose}
      show={show}
      id={id}
      style={style}
      title={title}
      className={buildClass(['toe-popup-create-book', className])}
    >
      <div className="toe-popup-create-book__body flex">
        <div className="row">
          <div className="col">
            <Input label={'Mã ấn phẩm'} />
          </div>
          <div className="col">
            {' '}
            <Input label={'Tên ấn phẩm'} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Dropdown label={'Ngôn ngữ'} />
          </div>
          <div className="col">
            <Input label={'Tên khác'} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input label={'Tác giả'} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {' '}
            <Dropdown label={'Loại lưu trữ'} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TreeSelect
              label="Thể loại"
              placeholder="Nhấp để chọn"
              value={paging.menuID}
              options={dataCategory.data}
              prefixValue={'Thể loại'}
              onChange={(data) => {
                setDataCreate({ ...dataCreate, categoryID: data.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input label={'Nhà xuất bản'} />
          </div>
          <div className="col">
            {' '}
            <Input label={'Mã ISBN'} />
          </div>
          <div className="col">
            {' '}
            <Input label={'Mã ISSN'} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="col__label toe-font-label">Hình ảnh</div>
            <UpLoadImage onChange={onSelectImage} />
          </div>
          <div className="col">
            <div className="col__label toe-font-label">File</div>
            <Upload accept={ACCEPT_FILE}>
              <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
            </Upload>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row"></div>
        <div className="row"></div>
      </div>
    </Modal>
  );
}

export default PopupCreateBook;
