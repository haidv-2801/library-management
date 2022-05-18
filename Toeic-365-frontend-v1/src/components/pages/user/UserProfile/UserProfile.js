import { CameraOutlined, SaveOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format } from 'react-string-format';
import { Tooltip as TooltipPrime } from 'primereact/tooltip';
import baseApi from '../../../../api/baseApi';
import {
  getAccountName,
  getUserID,
  getUserName,
} from '../../../../constants/commonAuth';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  COMMON_AVATAR,
  DATE_FORMAT,
  OPERATOR,
  PATH_NAME,
  TEXT_FALL_BACK,
} from '../../../../constants/commonConstant';
import {
  buildClass,
  ParseJson,
  slugify,
} from '../../../../constants/commonFunction';
import END_POINT, { GEOTARGET_ENDPOINT } from '../../../../constants/endpoint';
import { AuthContext, USER_INFO } from '../../../../contexts/authContext';
import { CartContext } from '../../../../contexts/cartContext';
import Button from '../../../atomics/base/Button/Button';
import DatePicker from '../../../atomics/base/DatePicker/DatePicker';
import Input from '../../../atomics/base/Input/Input';
import InputPassword from '../../../atomics/base/InputPassword/InputPassword';
import Modal from '../../../atomics/base/ModalV2/Modal';
import Smarttext from '../../../atomics/base/SmartText/SmartText';
import Spinner from '../../../atomics/base/Spinner/Spinner';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import Book from '../../../molecules/Book/Book';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import Layout from '../../../sections/User/Layout/Layout';
import { Tooltip } from 'antd';
import { getBookType } from '../function';
import './userProfile.scss';
import { cloneDeep } from 'lodash';

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
    CART: 'Giỏ hàng',
  };

  const userMenu = [
    { label: MENU_NAME.CART, value: slugify(MENU_NAME.CART) },
    { label: MENU_NAME.NOTIFICATION, value: slugify(MENU_NAME.NOTIFICATION) },
    { label: MENU_NAME.ACCOUNT, value: slugify(MENU_NAME.ACCOUNT) },
    { label: MENU_NAME.SECURITY, value: slugify(MENU_NAME.SECURITY) },
    { label: MENU_NAME.BORROW_RETURN, value: slugify(MENU_NAME.BORROW_RETURN) },
  ];

  const DEFAULT_BOOK_CHECKOUT = {
    item: null,
    from: null,
    to: null,
  };

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams({
    view: slugify(MENU_NAME.ACCOUNT),
  });
  const cancelRequestRef = useRef(false);
  const toast = useRef(null);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const currentView = searchParams.get('view');
  const [isHoverAvt, setIsHoverAvt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookCheckout, setBookCheckout] = useState(DEFAULT_BOOK_CHECKOUT);

  const CONFIG_BUTTON = {
    theme: BUTTON_THEME.THEME_1,
    disabled: isLoading,
  };

  //data
  const [dataDetail, setDataDetail] = useState({});
  const [dataChangePw, setDataChangePw] = useState({});
  const [dataGeotarget, setDataGeotarget] = useState({
    province_city_s: [],
    districts: [],
    ward_commune_s: [],
  });
  const [dataGeotargetSelected, setDataGeotargetSelected] = useState({
    province_city_s: null,
    districts: null,
    ward_commune_s: null,
  });
  const [isShowPopupChooseTime, setIsShowPopupChooseTime] = useState(false);

  //cart
  const [cart, setCart] = useState([]);

  useEffect(() => {
    switch (currentView) {
      case slugify(MENU_NAME.ACCOUNT):
        setIsLoading(true);
        getUserByID(getUserID())
          .then((res) => {
            if (res?.data?.pageData?.length) {
              setDataDetail(res?.data?.pageData[0]);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            const user = window.localStorage.getItem(
              ParseJson(decodeURIComponent(USER_INFO))
            );
            setDataDetail(user);
          });
        getGeotarget();
        break;
      case slugify(MENU_NAME.SECURITY):
        break;
      case slugify(MENU_NAME.NOTIFICATION):
        break;
      case slugify(MENU_NAME.BORROW_RETURN):
        break;
      case slugify(MENU_NAME.CART):
        // getBooks();
        break;
      default:
        setIsLoading(false);
        break;
    }
  }, [currentView]);

  if (!authCtx.isLoggedIn) {
    navigate(PATH_NAME.LOGIN);
  }

  const getBooks = () => {
    setIsLoading(true);
    baseApi.get(
      (res) => {
        if (res && res?.length) {
          let cartC = cloneDeep(cartCtx.cart);
          if (cartC == null) return;

          cartC = cartC?.map((itm) => ({
            ...res.find((item) => item.bookID === itm.id && item),
            ...itm,
          }));

          setCart(cloneDeep(cartC));
        }
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
      },
      () => {},
      END_POINT.TOE_GET_BOOKS,
      null,
      null
    );
  };

  const renderMenu = () => {
    return userMenu.map((menu, _) => (
      <div
        key={_}
        onClick={() => {
          setSearchParams({ view: menu.value });
        }}
        className={buildClass([
          'user-profile__menu-item',
          currentView === menu.value && 'active-menu',
        ])}
      >
        {menu.label}

        {menu.value === slugify(MENU_NAME.CART) && cartCtx.size ? (
          <Badge
            value={cartCtx.size}
            className="toe-font-body"
            size="normal"
            severity="danger"
          ></Badge>
        ) : null}
      </div>
    ));
  };

  const getGeotarget = (endpoint = null, code = null) => {
    let completeEndpoint = endpoint ?? GEOTARGET_ENDPOINT.VN_CITY_PROVINCE;
    if (endpoint && code) {
      completeEndpoint = format(completeEndpoint, code);
    }
    //Lấy tỉnh thành
    baseApi.get(
      (res) => {
        switch (endpoint) {
          case GEOTARGET_ENDPOINT.VN_DISTRICT:
            setDataGeotarget({
              ...dataGeotarget,
              districts: res.districts.map((item) => ({
                label: item.name,
                value: item.code,
              })),
            });
            break;
          case GEOTARGET_ENDPOINT.VN_WARD_COMMUNE:
            setDataGeotarget({
              ...dataGeotarget,
              ward_commune_s: res.wards.map((item) => ({
                label: item.name,
                value: item.code,
              })),
            });
            break;
          case null:
          default:
            setDataGeotarget({
              ...dataGeotarget,
              province_city_s: res.map((item) => ({
                label: item.name,
                value: item.code,
              })),
            });
            break;
        }
      },
      (err) => {},
      () => {},
      completeEndpoint,
      null,
      null
    );
  };

  const getUserByID = (id) => {
    setIsLoading(true);
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
        columns:
          'PhoneNumber,Email,AccountID,Address,FullName,UserName,Avatar,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate,Status',
      },
      null
    );
  };

  const handleChangeMenuView = (value) => {
    if (isLoading) return <Spinner show />;
    let view = accountView();

    switch (value) {
      case slugify(MENU_NAME.ACCOUNT):
        view = accountView();
        break;
      case slugify(MENU_NAME.SECURITY):
        view = secureView();
        break;
      case slugify(MENU_NAME.NOTIFICATION):
        view = notifyView();
        break;
      case slugify(MENU_NAME.BORROW_RETURN):
        view = borrowReturnView();
        break;
      case slugify(MENU_NAME.CART):
        view = cartView();
        break;

      default:
        view = accountView();
        break;
    }

    return view;
  };

  const getFullAddress = () => {
    let fullAddress = [dataDetail?.address];

    if (dataGeotargetSelected.ward_commune_s) {
      fullAddress.push(
        dataGeotarget.ward_commune_s.find(
          (item) => item.value === dataGeotargetSelected.ward_commune_s
        )?.label
      );
    }

    if (dataGeotargetSelected.districts) {
      fullAddress.push(
        dataGeotarget.districts.find(
          (item) => item.value === dataGeotargetSelected.districts
        )?.label
      );
    }

    if (dataGeotargetSelected.province_city_s) {
      fullAddress.push(
        dataGeotarget.province_city_s.find(
          (item) => item.value === dataGeotargetSelected.province_city_s
        )?.label
      );
    }
    fullAddress = fullAddress.filter(Boolean);
    return fullAddress.join(', ');
  };

  var fullAddressText = getFullAddress();

  const accountView = () => {
    return (
      <>
        <div className="user-profile__frame-right__body toe-font-body">
          <div className="frame-right__body-row">
            <Input
              label={'Tên tài khoản'}
              disabled
              placeholder={'Nhập tên tài khoản'}
              defaultValue={dataDetail?.userName ?? TEXT_FALL_BACK.TYPE_1}
            />
            <Input
              label={'Họ và tên'}
              placeholder={'Nhập họ và tên'}
              hasRequiredLabel
              onChange={(e) => {
                setDataDetail({ ...dataDetail, fullName: e });
              }}
              defaultValue={dataDetail?.fullName}
            />
          </div>
          <div className="frame-right__body-row">
            <Input
              label={'Email'}
              defaultValue={dataDetail?.email}
              disabled
              placeholder={'Nhập email'}
              hasRequiredLabel
            />
            <Input
              label={'SĐT'}
              placeholder={'Nhập số điện thoại'}
              hasRequiredLabel
              onChange={(e) => {
                setDataDetail({ ...dataDetail, phoneNumber: e });
              }}
              defaultValue={dataDetail?.phoneNumber ?? TEXT_FALL_BACK.TYPE_1}
            />
          </div>
          <div className="frame-right__body-row">
            <Input
              label={'Ngày tham gia'}
              disabled
              placeholder={TEXT_FALL_BACK.TYPE_1}
              defaultValue={
                moment(dataDetail?.createdDate).format(DATE_FORMAT.TYPE_3) ??
                TEXT_FALL_BACK.TYPE_1
              }
            />
            <div className="frame-right__body-row status">
              <div className="toe-font-label">Trạng thái</div>
              <div className="toe-font-label">
                {' '}
                <Tag color={dataDetail?.status ? '#87d068' : '#e5e5e5'}>
                  {dataDetail?.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                </Tag>
              </div>
            </div>
          </div>
          <div className="frame-right__body-row">
            <Dropdown
              options={dataGeotarget.province_city_s}
              label={'Tỉnh/Thành phố'}
              filter={true}
              defaultValue={dataGeotargetSelected.province_city_s}
              onChange={({ value }) => {
                setDataGeotargetSelected({
                  province_city_s: value,
                  districts: null,
                  ward_commune_s: null,
                });
                if (value) getGeotarget(GEOTARGET_ENDPOINT.VN_DISTRICT, value);
              }}
            />
            <Dropdown
              options={dataGeotarget.districts}
              label={'Quận/Huyện'}
              filter={true}
              defaultValue={dataGeotargetSelected.districts}
              onChange={({ value }) => {
                setDataGeotargetSelected({
                  ...dataGeotargetSelected,
                  districts: value,
                  ward_commune_s: null,
                });
                if (value)
                  getGeotarget(GEOTARGET_ENDPOINT.VN_WARD_COMMUNE, value);
              }}
            />
            <Dropdown
              options={dataGeotarget.ward_commune_s}
              label={'Phường/Xã'}
              defaultValue={dataGeotargetSelected.ward_commune_s}
              filter={true}
              onChange={({ value }) => {
                setDataGeotargetSelected({
                  ...dataGeotargetSelected,
                  ward_commune_s: value,
                });
              }}
            />
          </div>

          <div className="frame-right__body-row">
            <TextAreaBase
              label="Địa chỉ"
              value={dataDetail?.address}
              placeholder={'Nhập địa chỉ VD: quận huyện..'}
              onChange={(e) => {
                setDataDetail({ ...dataDetail, address: e });
              }}
            />
          </div>
          <div className="frame-right__body-row">
            <Smarttext innnerClassName="toe-font-label">
              Địa chỉ: {getFullAddress()}
            </Smarttext>
          </div>
        </div>
        <div className="frame-right__body-row bottom-buttons">
          <Button
            width={100}
            name={'Lưu'}
            type={BUTTON_TYPE.LEFT_ICON}
            leftIcon={<SaveOutlined />}
            theme={BUTTON_THEME.THEME_1}
            onClick={handleSave}
            {...CONFIG_BUTTON}
          />
        </div>
      </>
    );
  };

  const handleRemoveCartItem = ({ bookID }) => {
    cartCtx.remove(bookID);
    setCart(cart.filter((item) => item.bookID !== bookID));
  };

  const handleCheckout = (item = null) => {
    setIsShowPopupChooseTime(true);
    //Checkout 1 sản phẩm
    if (item) {
      setBookCheckout({ ...bookCheckout, item: [item] });
    }
    //Checkout tất cả cart
    else {
      setBookCheckout({ ...bookCheckout, item: cartCtx.cart });
    }
  };

  const cartView = () => {
    const cart = cartCtx.cart;
    if (!cart || !cart?.length)
      return (
        <div className="nodata">
          Không có dữ liệu.
          <a
            onClick={() => {
              navigate('/muon-tra-tai-lieu/sach');
            }}
            className="nodata__button"
          >
            Mượn sách ngay
          </a>
        </div>
      );

    return (
      <>
        <div className="toe-book-see-all-page__body-section">
          <div
            className={buildClass([
              'toe-book-see-all-page__body-content view-type-small',
            ])}
          >
            {cart.map((item, _) => {
              return (
                <div
                  key={_}
                  className="toe-book-see-all-page__body-content__item toe-book-see-all-page__body-content__item-cart"
                >
                  <Book
                    className="toe-book-see-all-page__body-content__book"
                    bookTitle={item?.bookName}
                    bookAuthor="Nguyễn Thị Thảo"
                    bookType={item?.bookFormat}
                    hasBottomTitle={false}
                    // onClick={() => handleViewDetail(item.bookID)}
                    image={item?.image}
                  />
                  <div className="toe-book-see-all-page__body-content__item-info">
                    <h2
                      // onClick={() => handleViewDetail(item.bookID)}
                      className="toe-book-see-all-page__body-content__item-info__row toe-font-label"
                    >
                      {item?.bookName}
                    </h2>
                    <div className="toe-book-see-all-page__body-content__item-info__row">
                      <span className="toe-font-label">Loại tài liệu:</span>{' '}
                      <span className="toe-font-body">
                        {getBookType(item?.bookFormat)}
                      </span>
                    </div>
                    <div className="toe-book-see-all-page__body-content__item-info__row">
                      <span className="toe-font-label">Tác giả:</span>
                      <span className="toe-font-body list-author">
                        {ParseJson(item?.author)?.join(', ')}
                      </span>
                    </div>
                    <div className="toe-book-see-all-page__body-content__item-info__row">
                      <span className="toe-font-label">Nhà xuất bản:</span>
                      <span className="toe-font-body">{item?.publisher}</span>
                    </div>
                  </div>
                  <div className="toe-book-see-all-page__body-content__cart-control toe-font-body">
                    <div
                      className="row remove toe-font-label"
                      style={{ color: 'red', fontSize: 13 }}
                      onClick={() => handleRemoveCartItem(item)}
                    >
                      Xóa <i className="pi pi-trash"></i>
                    </div>
                    <div className="row" onClick={() => handleCheckout(item)}>
                      Gửi yêu cầu mượn
                      <i className={'pi pi-send'}></i>
                    </div>

                    <div className="row amount toe-font-label">
                      Số lượng: {item?.quantity ?? 0}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="toe-font-title total-record">
            Tổng: {cartCtx.total} bản ghi
          </div>
        </div>
        <div className="frame-right__body-row bottom-buttons">
          <Button
            className="button-send-request"
            name={'Gửi yêu cầu mượn'}
            type={BUTTON_TYPE.RIGHT_ICON}
            rightIcon={
              <i
                className={!isLoading ? 'pi pi-send' : 'pi pi-spin pi-spinner'}
              ></i>
            }
            theme={BUTTON_THEME.THEME_1}
            {...CONFIG_BUTTON}
            disabled={isLoading || !cartCtx.total}
            onClick={() => handleCheckout()}
          />
        </div>
      </>
    );
  };

  const secureView = () => {
    return (
      <>
        <InputPassword
          autoFocus
          className="mb-3"
          hasRequiredLabel
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          onChange={(d) =>
            setDataChangePw({
              ...dataChangePw,
              oldPassword: d.target.value,
            })
          }
        />
        <InputPassword
          className="mb-3"
          hasRequiredLabel
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          onChange={(d) =>
            setDataChangePw({
              ...dataChangePw,
              password: d.target.value?.trim(),
            })
          }
        />
        <InputPassword
          className="mb-3"
          hasRequiredLabel
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          onChange={(d) =>
            setDataChangePw({
              ...dataChangePw,
              rePassword: d.target.value?.trim(),
            })
          }
        />
        <div className="frame-right__body-row bottom-buttons">
          <Button
            width={100}
            name={'Lưu'}
            type={BUTTON_TYPE.LEFT_ICON}
            leftIcon={<SaveOutlined />}
            theme={BUTTON_THEME.THEME_1}
            onClick={handleChangePw}
            {...CONFIG_BUTTON}
          />
        </div>
      </>
    );
  };

  const notifyView = () => {
    return null;
  };

  const borrowReturnView = () => {
    return null;
  };

  const handleSave = () => {
    if (cancelRequestRef.current) return;
    cancelRequestRef.current = true;
    let _body = {
      ...dataDetail,
      modifiedDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      modifiedBy: getUserName(),
      address: fullAddressText,
    };

    baseApi.put(
      (res) => {
        if (res.data > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Cập nhật thành công',
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Cập nhật thất bại',
            life: 3000,
          });
        }
        cancelRequestRef.current = false;
      },
      (err) => {
        let errMessage = err?.response?.data?.data || 'Có lỗi xảy ra';
        toast.current.show({
          severity: 'error',
          summary: 'Cập nhật thất bại',
          detail: errMessage,
          life: 3000,
        });
        cancelRequestRef.current = false;
      },
      () => {},
      format(END_POINT.TOE_UPDATE_USER, dataDetail.accountID),
      _body,
      null,
      null
    );
  };

  const handleChangePw = () => {
    let _body = {
      ...dataChangePw,
      modifiedDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      modifiedBy: getUserName(),
    };

    baseApi.put(
      (res) => {
        if (+res.data > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Cập nhật thành công',
            life: 3000,
          });
        } else {
          let errMessage = res?.messasge || 'Có lỗi xảy ra';
          toast.current.show({
            severity: 'error',
            summary: 'Cập nhật thất bại',
            detail: errMessage,
            life: 3000,
          });
        }
      },
      (err) => {
        let errMessage = err?.response?.data?.messasge || 'Có lỗi xảy ra';
        toast.current.show({
          severity: 'error',
          summary: 'Cập nhật thất bại',
          detail: errMessage,
          life: 3000,
        });
      },
      () => {},
      format(END_POINT.TOE_UPDATE_USER_PASSWORD, dataDetail.accountID),
      _body,
      null,
      null
    );
  };

  const getLabelByView = (view) => {
    let _label = MENU_NAME.ACCOUNT;
    switch (view) {
      case slugify(MENU_NAME.SECURITY):
        _label = MENU_NAME.SECURITY;
        break;
      case slugify(MENU_NAME.NOTIFICATION):
        _label = MENU_NAME.NOTIFICATION;
        break;
      case slugify(MENU_NAME.BORROW_RETURN):
        _label = MENU_NAME.BORROW_RETURN;
        break;
      case slugify(MENU_NAME.CART):
        _label = MENU_NAME.CART;
        break;
      case slugify(MENU_NAME.ACCOUNT):
      default:
        _label = MENU_NAME.ACCOUNT;
        break;
    }
    return _label;
  };

  const onClosePopupTime = () => {
    setIsShowPopupChooseTime(false);
    setBookCheckout(DEFAULT_BOOK_CHECKOUT);
  };

  const handleAcceptBorrow = () => {
    const body = {
      BookOrderInfomation: JSON.stringify(bookCheckout.item),
      Note: 'note',
      FromDate: bookCheckout.from,
      DueDate: bookCheckout.to,
      createdDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      createdBy: getUserName(),
      modifiedDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      modifiedBy: getUserName(),
    };

    baseApi.post(
      (res) => {
        if (res.data > 0) {
          setIsShowPopupChooseTime(false);
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Gửi yêu cầu thành công',
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Gửi yêu cầu thất bại',
            life: 3000,
          });
        }
      },
      (err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Có lỗi xảy ra',
          life: 3000,
        });
      },
      () => {},
      END_POINT.TOE_INSERT_BOOK_ORDER,
      body,
      null
    );
  };

  const totalBorrowingDay = Math.abs(
    moment(bookCheckout?.from).diff(moment(bookCheckout?.to), 'days')
  );

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
                    onError={(e) => {
                      e.onError = null;
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
                  {dataDetail?.userName ??
                    getAccountName() ??
                    TEXT_FALL_BACK.TYPE_1}
                </div>
              </div>
              <div className="user-profile__menu toe-font-body">
                {renderMenu()}
              </div>
            </div>
            <div className="user-profile__frame-right">
              <div className="user-profile__frame-right__title toe-font-title">
                {getLabelByView(currentView) || TEXT_FALL_BACK.TYPE_1}
              </div>
              {handleChangeMenuView(currentView)}
            </div>
          </div>
        </div>
      </div>
      <Modal
        onClose={onClosePopupTime}
        maximizable={false}
        show={isShowPopupChooseTime}
        innnerClassName="toe-popup-choose-time"
        title={'Thông tin mượn'}
        footerRight={[
          <Button
            onClick={onClosePopupTime}
            theme={BUTTON_THEME.THEME_6}
            name="Hủy"
          />,
          <Button
            disabled={!bookCheckout?.from || !bookCheckout?.to}
            name="Xác nhận"
            onClick={handleAcceptBorrow}
          />,
        ]}
      >
        <div className="toe-popup-choose-time__body">
          <div className="toe-popup-choose-time__row tags toe-font-label">
            Thông tin:{' '}
            <div className="toe-font-body">
              {bookCheckout?.item?.map((item) => (
                <div className="tag">{item?.bookName}</div>
              ))}
            </div>
          </div>

          <div className="toe-popup-choose-time__row toe-font-label">
            Tổng số lượng: <div className="toe-font-body">{cartCtx.total}</div>
          </div>

          <div className="toe-popup-choose-time__row toe-font-label">
            Tổng số ngày:{' '}
            <div className="toe-font-body">
              {isNaN(totalBorrowingDay) ? 0 : totalBorrowingDay}
            </div>
          </div>

          <div className="toe-popup-choose-time__row">
            <div className="_col">
              <div className="_col-label toe-font-label">Từ</div>
              <DatePicker
                onChange={({ value }) => {
                  setBookCheckout({
                    ...bookCheckout,
                    from: value,
                    to: new Date(moment(value).add(10, 'days')),
                  });
                }}
                defaultValue={bookCheckout.from}
              />
            </div>
            <div className="_col">
              <div className="_col-label toe-font-label">Đến</div>
              <DatePicker
                onChange={({ value }) => {
                  setBookCheckout({ ...bookCheckout, to: value });
                }}
                defaultValue={bookCheckout.to}
                disabled={!bookCheckout?.from}
                min={new Date(moment(bookCheckout?.from).add(1, 'days'))}
                max={new Date(moment(bookCheckout?.from).add(10, 'days'))}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Toast ref={toast}></Toast>
    </Layout>
  );
}

export default UserProfile;
