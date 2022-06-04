import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../../../constants/commonFunction';
import Button from '../../../../atomics/base/Button/Button';
import baseApi from '../../../../../api/baseApi';
import END_POINT, { ADMIN_ENDPOINT } from '../../../../../constants/endpoint';
import {
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
  BUTTON_THEME,
  MAXIMUM_FILE_SIZE,
  ACCEPT_FILE,
  BOOK_FORMAT,
  LANGUAGE,
  ACCEPT_FILE_PDF,
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
import TextArea from '../../../../atomics/base/TextArea/TextArea';
import InputNumber from '../../../../atomics/base/InputNumber/InputNumber';
import RadioButton from '../../../../atomics/base/RadioButton/RadioButton';

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

  const DOCUMENT_TYPE = [
    { label: 'Tài liệu số', value: BOOK_FORMAT.EBOOK },
    { label: 'Tài liệu giấy', value: BOOK_FORMAT.PAPER_BACK },
  ];

  const [dataCreate, setDataCreate] = useState(defaultValue ?? {});

  useEffect(() => {
    getNextBookCode().then((res) =>
      setDataCreate({ ...dataCreate, bookCode: res })
    );
  }, []);

  useEffect(() => {
    onChange(dataCreate);
  }, [dataCreate]);

  const onBasicUpload = (event) => {
    debugger;
    setDataCreate({ ...dataCreate, file: event.target.files[0] });
  };

  const onSelectImage = (data) => {
    setDataCreate({ ...dataCreate, image: data });
  };

  const handleKeydown = (name, event) => {
    switch (name) {
      case 'author':
        if (event.which === KEY_CODE.ENTER) {
          if (
            dataCreate.authorText &&
            !dataCreate?.authors?.some((item) => item === dataCreate.authorText)
          )
            setDataCreate({
              ...dataCreate,
              authors: [
                ...(dataCreate.authors ?? []),
                dataCreate.authorText?.trim(),
              ],
              authorText: '',
            });
        }
        break;

      default:
        break;
    }
  };

  const getNextBookCode = async () => {
    return await baseApi.get(
      null,
      null,
      null,
      END_POINT.TOE_GET_NEXT_BOOK_CODE,
      null,
      null
    );
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
        <div className="row toe-font-title">Thông tin cơ bản</div>
        <div className="row">
          <div className="col">
            <Input
              label={'Mã ấn phẩm'}
              disabled
              defaultValue={dataCreate.bookCode}
            />
          </div>
          <div className="col">
            {' '}
            <Input
              label={'Tên ấn phẩm'}
              onChange={(data) =>
                setDataCreate({ ...dataCreate, bookName: data })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Dropdown
              label={'Ngôn ngữ'}
              placeholder={'Nhấp để chọn'}
              filter={true}
              defaultValue={dataCreate.languageCode}
              options={LANGUAGE.map((item) => ({
                label: item.LanguageName,
                value: item.LanguageCode,
              }))}
              onChange={(data) => {
                setDataCreate({ ...dataCreate, languageCode: data.value });
              }}
            />
          </div>
          <div className="col">
            <InputNumber
              inputId="integeronly"
              label={'Giá tiền'}
              placeholder={'Nhập giá tiền'}
              onChange={(data) => {
                setDataCreate({ ...dataCreate, price: data });
              }}
              value={dataCreate.price}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              label={'Tác giả'}
              onChange={(data) => {
                setDataCreate({
                  ...dataCreate,
                  authorText: data,
                });
              }}
              controlled
              value={dataCreate.authorText}
              onKeyDown={(e) => handleKeydown('author', e)}
            />
            <div className="col__tags row mb-2 mt-2">
              {dataCreate?.authors?.map((item) => (
                <div className="tag toe-font-hint">
                  {item}
                  <span
                    className="tag-remove toe-font-label"
                    onClick={() => {
                      setDataCreate({
                        ...dataCreate,
                        authors: dataCreate.authors.filter((i) => i !== item),
                      });
                    }}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row toe-font-title">Thông tin khác</div>

        <div className="row">
          <div className="col">
            {' '}
            <Dropdown
              label={'Loại lưu trữ'}
              options={DOCUMENT_TYPE}
              defaultValue={dataCreate.bookFormat}
              onChange={(data) =>
                setDataCreate({ ...dataCreate, bookFormat: data.value })
              }
            />
          </div>
          <div className="col">
            <TreeSelect
              label="Thể loại"
              placeholder="Nhấp để chọn"
              value={dataCreate.categoryID}
              options={dataCategory.data}
              prefixValue={'Thể loại'}
              onChange={(data) => {
                setDataCreate({ ...dataCreate, categoryID: data.value });
              }}
            />
          </div>
          <div className="col">
            <Input
              name="Số lượng bản ghi"
              label={'Số lượng bản ghi'}
              defaultValue={dataCreate?.amount ?? 1}
              onChange={(data) => {
                setDataCreate({ ...dataCreate, amount: +data });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              label={'Nhà xuất bản'}
              placeholder="Nhập để chọn"
              onChange={(data) => {
                setDataCreate({ ...dataCreate, publisher: data });
              }}
            />
          </div>
          <div className="col">
            {' '}
            <Input
              label={'Mã ISBN'}
              placeholder="Nhập để chọn"
              onChange={(data) => {
                setDataCreate({ ...dataCreate, ISNB: data });
              }}
            />
          </div>
          <div className="col">
            {' '}
            <Input
              label={'Mã ISSN'}
              placeholder="Nhập để chọn"
              onChange={(data) => {
                setDataCreate({ ...dataCreate, ISSN: data });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextArea
              placeholder={'Nhập mô tả'}
              label={'Mô tả'}
              onChange={(data) =>
                setDataCreate({ ...dataCreate, description: data })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="col__label toe-font-label">Ảnh bìa</div>
            <UpLoadImage onChange={onSelectImage} />
          </div>
          <div className="col">
            <div className="col__label toe-font-label">Tài liệu nội bộ</div>
            <RadioButton
              label="Tài liệu nội bộ"
              onChange={() => {
                setDataCreate({
                  ...dataCreate,
                  isPrivate: !dataCreate.isPrivate,
                });
              }}
              checked={dataCreate.isPrivate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="col__label toe-font-label">File</div>

            <input
              type="file"
              accept={ACCEPT_FILE_PDF}
              onChange={onBasicUpload}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PopupCreateBook;
