import { CameraOutlined, SaveOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format } from 'react-string-format';
import baseApi from '../../../../api/baseApi';
import {
  getAccountName,
  getFullName,
  getUserID,
  getUserName,
} from '../../../../constants/commonAuth';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  COMMON_AVATAR,
  DATE_FORMAT,
  GUID_NULL,
  LOCAL_STORATE_KEY,
  MAXIMUM_PAGESIZE,
  MEMBER_TYPE,
  OPERATOR,
  PATH_NAME,
  RESERVATION_STATUS,
  SORT_TYPE,
  TEXT_FALL_BACK,
} from '../../../../constants/commonConstant';
import {
  buildClass,
  DROPDOWN_STATUS,
  getMemberTypeText,
  getOrderStatus,
  ParseJson,
  requireRegisterView,
  slugify,
} from '../../../../constants/commonFunction';
import END_POINT, { GEOTARGET_ENDPOINT } from '../../../../constants/endpoint';
import {
  AuthContext,
  getLocalStorage,
  setLocalStorage,
} from '../../../../contexts/authContext';
import { CartContext } from '../../../../contexts/cartContext';
import Button from '../../../atomics/base/Button/Button';
import DatePicker from '../../../atomics/base/DatePicker/DatePicker';
import Input from '../../../atomics/base/Input/Input';
import InputPassword from '../../../atomics/base/InputPassword/InputPassword';
import Modal from '../../../atomics/base/ModalV2/Modal';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import Spinner from '../../../atomics/base/Spinner/Spinner';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import Book from '../../../molecules/Book/Book';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import Table from '../../../molecules/Table/Table';
import Layout from '../../../sections/User/Layout/Layout';
import { getBookFormat, getBookType } from '../function';
import { isArray, isEmpty } from 'lodash';
import './userProfile.scss';
import { uploadFiles } from '../../../../api/firebase';

UserProfile.propTypes = {
  titlePage: PropTypes.string,
};

UserProfile.defaultProps = { titlePage: '' };

function UserProfile(props) {
  const { children, titlePage } = props;

  const MENU_NAME = {
    ACCOUNT: 'Tài khoản',
    SECURITY: 'Bảo mật',
    LIBRARY_CARD: 'Thẻ thư viện',
    BORROW_RETURN: 'Mượn trả',
    CART: 'Giỏ mượn',
  };

  const TAB_VIEW_VALUE = {
    LOANING: 0,
    WAITING: 1,
    HISTORY: 2,
  };

  const TAB_VIEW_LIST = [
    { label: 'Đang mượn', value: RESERVATION_STATUS.CANCELED },
    { label: 'Chờ xử lý', value: TAB_VIEW_VALUE.WAITING },
    { label: 'Lịch sử', value: TAB_VIEW_VALUE.HISTORY },
  ];

  const userMenu = [
    { label: MENU_NAME.CART, value: slugify(MENU_NAME.CART) },
    { label: MENU_NAME.LIBRARY_CARD, value: slugify(MENU_NAME.LIBRARY_CARD) },
    { label: MENU_NAME.ACCOUNT, value: slugify(MENU_NAME.ACCOUNT) },
    { label: MENU_NAME.SECURITY, value: slugify(MENU_NAME.SECURITY) },
    { label: MENU_NAME.BORROW_RETURN, value: slugify(MENU_NAME.BORROW_RETURN) },
  ];

  const DEFAULT_BOOK_CHECKOUT = {
    item: null,
    from: null,
    to: null,
  };

  const MEMBERS = [
    { label: 'Sinh viên', value: MEMBER_TYPE.STUDENT },
    { label: 'Giảng viên', value: MEMBER_TYPE.LECTURER },
    { label: 'Bạn đọc ngoài trường', value: MEMBER_TYPE.GUEST },
  ];

  const MIN_PAGE_SIZE = 5;

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams({
    view: slugify(MENU_NAME.ACCOUNT),
  });
  const cancelRequestRef = useRef(false);
  const toast = useRef(null);
  const inputFile = useRef(null);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const currentView = searchParams.get('view');
  const [isHoverAvt, setIsHoverAvt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookCheckout, setBookCheckout] = useState(DEFAULT_BOOK_CHECKOUT);
  const [isRequestBorrowing, setIsRequestBorrowing] = useState(false);
  const [image, setImage] = useState(
    getLocalStorage(LOCAL_STORATE_KEY.AVATAR) ?? COMMON_AVATAR
  );
  const [imageToSave, setImageToSave] = useState(null);
  const [loanReportData, setLoanReportData] = useState({
    data: [],
    total: 0,
    loan_status: -1,
  });
  const [expandedSection, setExpandedSection] = useState({
    infoAccount: true,
    infoRegisterCard: false,
  });

  const CONFIG_BUTTON = {
    theme: BUTTON_THEME.THEME_1,
    disabled: isLoading,
  };

  //#region mượn trả

  const [lazyParams, setLazyParams] = useState({ page: 1, rows: 10 });
  const [dataTable, setDataTable] = useState({ isLoading: false, data: [] });
  const [totalRecords, setTotalRecords] = useState(0);

  const COLUMNS = [
    {
      field: 'bookOrderCode',
      header: 'Mã phiếu',
      filterField: 'bookOrderCode',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;
        return <SmartText maxWidth={100}>{row?.bookOrderCode}</SmartText>;
      },
      style: { width: 100, maxWidth: 100 },
    },
    {
      field: 'createdDate',
      sortable: true,
      header: 'Ngày lập',
      filterField: 'createdDate',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;
        return (
          <div className="toe-font-body">
            {moment(row?.createdDate).format(DATE_FORMAT.TYPE_1) ??
              TEXT_FALL_BACK.TYPE_1}
          </div>
        );
      },
      style: { width: 130, maxWidth: 130 },
    },
    {
      field: 'fromDate',
      sortable: true,
      header: 'Từ ngày',
      filterField: 'fromDate',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;
        return (
          <div className="toe-font-body">
            {moment(row?.fromDate).format(DATE_FORMAT.TYPE_3) ??
              TEXT_FALL_BACK.TYPE_1}
          </div>
        );
      },
      style: { width: 140, maxWidth: 140 },
    },
    {
      field: 'dueDate',
      sortable: true,
      header: 'Đến ngày',
      filterField: 'dueDate',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;
        return (
          <div className="toe-font-body">
            {moment(row?.dueDate).format(DATE_FORMAT.TYPE_3) ??
              TEXT_FALL_BACK.TYPE_1}
          </div>
        );
      },
      style: { width: 140, maxWidth: 140 },
    },
    {
      field: 'bookOrderInformation',
      sortable: true,
      header: 'Mã sách',
      filterField: 'bookOrderInformation',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;

        return renderBookOrderInfomation(row.bookOrderInformation);
      },
      style: { width: 140, maxWidth: 140 },
    },
    {
      field: 'orderStatus',
      header: 'Trạng thái',
      filterField: 'orderStatus',
      body: (row) => {
        if (dataTable.isLoading) return <Skeleton></Skeleton>;

        return <div className="toe-font-body">{renderOrderStatus(row)}</div>;
      },
      style: { width: 180, maxWidth: 180 },
    },
  ];

  const CONFIGS = {
    /**
     * *Config
     */
    dataKey: 'bookOrderID',
    sortField: lazyParams?.sortField,
    sortOrder: lazyParams?.sortOrder,
    scrollHeight: 'calc(100% - 500px)',

    /**
     * *Method
     */
    onSort: (event) => {
      console.log(event);
    },
    onSort: (event) => {
      setLazyParams(event);
    },
  };
  //#endregion

  //data
  const [dataDetail, setDataDetail] = useState({});
  const [dataChangePw, setDataChangePw] = useState({});
  const [provinceCity, setProvinceCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wardCommnune, setWardCommnune] = useState([]);
  const [dataGeotarget, setDataGeotarget] = useState({
    province_city_s: [],
    districts: [],
    ward_commune_s: [],
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
            let dataAccount = res?.data?.pageData;
            let dataMember = {},
              dataDetail = {};

            if (dataAccount?.length) {
              dataAccount = dataAccount[0];
              dataDetail = { ...dataAccount };
              dataMember =
                ParseJson(
                  ParseJson(getLocalStorage(LOCAL_STORATE_KEY.MEMBER_INFO))
                ) || {};
              setDataDetail(dataDetail);
              baseApi.get(
                (res) => {
                  // debugger;
                  setDataDetail({ ...dataDetail, cardCode: res });
                },
                null,
                null,
                END_POINT.TOE_GET_NEXT_CARD_CODE,
                null,
                null
              );
            }

            if (dataMember?.CardID)
              getLibraryCardByID(dataMember?.CardID)
                .then((dataLCard) => {
                  let detail = dataAccount;
                  let optionParser = ParseJson(dataLCard.option) || {};

                  getGeotarget().then((res) => {
                    if (optionParser?.districts) {
                      getGeotarget(
                        GEOTARGET_ENDPOINT.VN_DISTRICT,
                        optionParser?.province_city_s
                      ).then((res) => {
                        getGeotarget(
                          GEOTARGET_ENDPOINT.VN_WARD_COMMUNE,
                          optionParser?.districts
                        ).then((res) => {});
                      });
                    }
                  });

                  dataDetail = {
                    ...detail,
                    ...dataLCard,
                    option: optionParser,
                  };

                  setImage(detail.avatar);
                  setLocalStorage(LOCAL_STORATE_KEY.AVATAR, detail.avatar);
                })
                .catch((err) => {})
                .finally(() => {
                  setDataDetail(dataDetail);
                });
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            const user = window.localStorage.getItem(
              ParseJson(decodeURIComponent(LOCAL_STORATE_KEY.USER_INFO))
            );
          })
          .finally(() => {});
        // getGeotarget();
        break;
      case slugify(MENU_NAME.SECURITY):
        break;
      case slugify(MENU_NAME.LIBRARY_CARD):
        break;
      case slugify(MENU_NAME.BORROW_RETURN):
        getBooksLendingFilter();
        break;
      case slugify(MENU_NAME.CART):
        // getBooks();
        break;
      default:
        setIsLoading(false);
        break;
    }
  }, [currentView, loanReportData]);

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

  function getGeotarget(endpoint = null, code = null) {
    let completeEndpoint = endpoint ?? GEOTARGET_ENDPOINT.VN_CITY_PROVINCE;
    if (endpoint && code) {
      completeEndpoint = format(completeEndpoint, code);
    }
    //Lấy tỉnh thành
    return baseApi.get(
      (res) => {
        switch (endpoint) {
          case GEOTARGET_ENDPOINT.VN_DISTRICT:
            // setDataGeotarget({
            //   ...dataGeotarget,
            //   districts: res.districts.map((item) => ({
            //     label: item.name,
            //     value: item.code,
            //   })),
            // });
            setDistricts(
              res.districts.map((item) => ({
                label: item.name,
                value: item.code,
              }))
            );
            break;
          case GEOTARGET_ENDPOINT.VN_WARD_COMMUNE:
            // setDataGeotarget({
            //   ...dataGeotarget,
            //   ward_commune_s: res.wards.map((item) => ({
            //     label: item.name,
            //     value: item.code,
            //   })),
            // });
            setWardCommnune(
              res.wards.map((item) => ({
                label: item.name,
                value: item.code,
              }))
            );
            break;
          case null:
          default:
            // setDataGeotarget({
            //   ...dataGeotarget,
            //   province_city_s: res.map((item) => ({
            //     label: item.name,
            //     value: item.code,
            //   })),
            // });

            setProvinceCity(
              res.map((item) => ({
                label: item.name,
                value: item.code,
              }))
            );
            break;
        }
      },
      (err) => {},
      () => {},
      completeEndpoint,
      null,
      null
    );
  }

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

  const getLibraryCardByID = (id) => {
    return baseApi.get(
      null,
      null,
      null,
      format(END_POINT.TOE_GET_CATEGORY_BY_ID, id),
      null,
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
      case slugify(MENU_NAME.LIBRARY_CARD):
        view = libraryCardView();
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
    let option = dataDetail?.option || {};
    let fullAddress = [option?.address];

    if (option.ward_commune_s) {
      fullAddress.push(
        wardCommnune.find((item) => item.value === option.ward_commune_s)?.label
      );
    }

    if (option.districts) {
      fullAddress.push(
        districts.find((item) => item.value === option.districts)?.label
      );
    }

    if (option.province_city_s) {
      fullAddress.push(
        provinceCity.find((item) => item.value === option.province_city_s)
          ?.label
      );
    }
    fullAddress = fullAddress.filter(Boolean);
    return fullAddress.join(', ');
  };

  console.log('authCtx.isMember()', authCtx.isMember());

  var fullAddressText = getFullAddress();
  const accountView = () => {
    return (
      <>
        <div className="user-profile__frame-right__body toe-font-body">
          <div className="frame-right__body-section">
            <div className="frame-right__body-row">
              <Input
                label={'Email'}
                defaultValue={dataDetail?.email}
                disabled
                placeholder={'Nhập email'}
                hasRequiredLabel
              />
              <Input
                label={'Tên tài khoản'}
                disabled
                placeholder={'Nhập tên tài khoản'}
                defaultValue={dataDetail?.userName}
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
          </div>

          <div className="frame-right__body-section">
            <span
              className="frame-right__body-section__title toe-font-label"
              onClick={() => {
                setExpandedSection({
                  ...expandedSection,
                  infoRegisterCard: !expandedSection.infoRegisterCard,
                });
              }}
            >
              Thông tin đăng kí thẻ thư viện{' '}
              <i
                className={`pi pi-chevron-${
                  expandedSection.infoRegisterCard ? 'down' : 'up'
                }`}
              ></i>
            </span>
            {expandedSection.infoRegisterCard && (
              <span>
                <div className="frame-right__body-row">
                  <Input
                    label={'Số thẻ'}
                    placeholder={'Số thẻ'}
                    disabled
                    defaultValue={dataDetail?.cardCode || null}
                  />
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'SĐT'}
                    placeholder={'Nhập số điện thoại'}
                    hasRequiredLabel
                    onChange={(e) => {
                      setDataDetail({ ...dataDetail, phoneNumber: e });
                    }}
                    defaultValue={dataDetail?.phoneNumber || null}
                  />
                  <div className="_col">
                    <div
                      className="_col-label toe-font-label"
                      style={{ marginBottom: 8 }}
                    >
                      Ngày sinh
                    </div>
                    <DatePicker
                      onChange={({ value }) => {
                        setDataDetail({
                          ...dataDetail,
                          option: {
                            ...(dataDetail?.option || {}),
                            birthDay: new Date(
                              moment(value).startOf('day').toString()
                            ),
                          },
                        });
                      }}
                      max={new Date()}
                      defaultValue={dataDetail?.option?.birthDay}
                    />
                  </div>
                </div>
                <div className="frame-right__body-row">
                  <Input
                    label={'Số CMND/CCCD'}
                    placeholder={'Nhập số CCCD'}
                    hasRequiredLabel
                    onChange={(e) => {
                      setDataDetail({
                        ...dataDetail,
                        option: {
                          ...(dataDetail?.option || {}),
                          identityNumber: e,
                        },
                      });
                    }}
                    defaultValue={dataDetail?.option?.identityNumber || null}
                  />
                  <div className="_col">
                    <div
                      className="_col-label toe-font-label"
                      style={{ marginBottom: 8 }}
                    >
                      Bạn là
                    </div>
                    <Dropdown
                      options={MEMBERS}
                      onChange={({ value }) =>
                        setDataDetail({ ...dataDetail, memberType: value })
                      }
                      defaultValue={dataDetail?.memberType}
                      disabled={authCtx.isMember()}
                    />
                  </div>
                </div>
                {dataDetail?.memberType === MEMBER_TYPE.STUDENT && (
                  <div className="frame-right__body-row">
                    <Input
                      label={'Mã sinh viên'}
                      placeholder={'Nhập mã sinh viên'}
                      hasRequiredLabel
                      onChange={(e) => {
                        setDataDetail({
                          ...dataDetail,
                          option: {
                            ...(dataDetail?.option || {}),
                            studentCode: e,
                          },
                        });
                      }}
                      defaultValue={dataDetail?.option?.studentCode || null}
                    />
                  </div>
                )}
                <div className="frame-right__body-row address">
                  <Dropdown
                    options={provinceCity}
                    label={'Tỉnh/Thành phố'}
                    filter={true}
                    defaultValue={dataDetail?.option?.province_city_s}
                    onChange={({ value }) => {
                      setDataDetail({
                        ...dataDetail,
                        option: {
                          ...dataDetail?.option,
                          province_city_s: value,
                          districts: null,
                          ward_commune_s: null,
                        },
                      });
                      if (value)
                        getGeotarget(GEOTARGET_ENDPOINT.VN_DISTRICT, value);
                    }}
                  />
                  <Dropdown
                    options={districts}
                    label={'Quận/Huyện'}
                    filter={true}
                    defaultValue={dataDetail?.option?.districts}
                    onChange={({ value }) => {
                      setDataDetail({
                        ...dataDetail,
                        option: {
                          ...dataDetail?.option,
                          districts: value,
                          ward_commune_s: null,
                        },
                      });
                      if (value)
                        getGeotarget(GEOTARGET_ENDPOINT.VN_WARD_COMMUNE, value);
                    }}
                  />
                  <Dropdown
                    options={wardCommnune}
                    label={'Phường/Xã'}
                    defaultValue={dataDetail?.option?.ward_commune_s}
                    filter={true}
                    onChange={({ value }) => {
                      setDataDetail({
                        ...dataDetail,
                        option: {
                          ...dataDetail?.option,
                          ward_commune_s: value,
                        },
                      });
                    }}
                  />
                </div>

                <div className="frame-right__body-row">
                  <TextAreaBase
                    label="Địa chỉ"
                    value={dataDetail?.option?.address}
                    placeholder={'Nhập địa chỉ VD: quận huyện..'}
                    onChange={(e) => {
                      setDataDetail({
                        ...dataDetail,
                        option: {
                          ...dataDetail?.option,
                          address: e,
                        },
                      });
                    }}
                  />
                </div>
                <div className="frame-right__body-row">
                  <SmartText innnerClassName="toe-font-label">
                    Địa chỉ: {getFullAddress()}
                  </SmartText>
                </div>
              </span>
            )}
          </div>
        </div>
        <div className="frame-right__body-row bottom-buttons">
          <Button
            {...CONFIG_BUTTON}
            width={80}
            name={'Lưu'}
            type={BUTTON_TYPE.LEFT_ICON}
            leftIcon={<SaveOutlined />}
            theme={
              !authCtx.isMember() ? BUTTON_THEME.THEME_3 : BUTTON_THEME.THEME_1
            }
            onClick={handleSave}
          />
          {authCtx.isMember() ? null : (
            <Button
              {...CONFIG_BUTTON}
              name={'Lưu và đăng ký thành viên'}
              theme={BUTTON_THEME.THEME_1}
              onClick={() => handleSave(true)}
            />
          )}
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
    if (!authCtx.isMember()) {
      return requireRegisterView(navigate);
    }

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
                    bookType={item?.bookFormat}
                    hasBottomTitle={false}
                    image={item?.image}
                    // onClick={() => handleViewDetail(item.bookID)}
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
                        {getBookFormat(item?.bookType)}
                      </span>
                    </div>
                    {/* <div className="toe-book-see-all-page__body-content__item-info__row">
                      <span className="toe-font-label">Tác giả:</span>
                      <span className="toe-font-body list-author">
                        {ParseJson(item?.author)?.join(', ')}
                      </span>
                    </div> */}
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
            name={'Gửi yêu cầu mượn tất cả'}
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

  const libraryCardView = () => {
    const cardInfo = getLocalStorage(LOCAL_STORATE_KEY.MEMBER_INFO);
    if (!cardInfo) {
      return requireRegisterView(navigate);
    }
    return null;
  };

  const borrowReturnView = () => {
    return (
      <div className="loan-report-table">
        <Dropdown
          className="loan-report-table__dropdown"
          defaultValue={loanReportData.loan_status}
          options={DROPDOWN_STATUS}
          hasSubLabel
          onChange={({ value }) =>
            setLoanReportData({
              ...loanReportData,
              loan_status: value,
            })
          }
          prefixValue={'Trạng thái'}
          scrollHeight={350}
        />
        <Table
          data={dataTable.data}
          configs={CONFIGS}
          columns={COLUMNS}
          rowClassName={() => 'cursor-pointer'}
        />
      </div>
    );
  };

  const handleSave = (registerMember = false) => {
    if (cancelRequestRef.current) return;

    setIsLoading(true);
    let uploadImg = Promise.resolve(null);
    if (imageToSave) uploadImg = uploadFiles(imageToSave, 'images');

    uploadImg
      .then((imgPath) => {
        cancelRequestRef.current = true;
        if (imgPath) {
          setImage(imgPath);
          setLocalStorage(LOCAL_STORATE_KEY.AVATAR, imgPath);
        }
        setImageToSave(null);

        let _body = {
          ...dataDetail,
          modifiedDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
          modifiedBy: getUserName(),
          address: fullAddressText,
          avatar: imgPath ? imgPath : dataDetail.avatar,
          option: JSON.stringify(dataDetail?.option || {}),
        };

        let updatePromise = () =>
          baseApi.put(
            (res) => {
              if (res.data > 0) {
                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Cập nhật thành công',
                  life: 3000,
                });
                getLocalStorage(LOCAL_STORATE_KEY.us);
              } else {
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Cập nhật thất bại',
                  life: 3000,
                });
              }
              setIsLoading(false);
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
              setIsLoading(false);
            },
            () => {},
            format(END_POINT.TOE_UPDATE_USER, dataDetail.accountID),
            _body,
            null,
            null
          );

        let insertCardPromise = () =>
          baseApi.post(
            (res) => {
              if (res.data > 0) {
                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Cập nhật thành công',
                  life: 3000,
                });
                getLocalStorage(LOCAL_STORATE_KEY.us);
              } else {
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Cập nhật thất bại',
                  life: 3000,
                });
              }
              setIsLoading(false);
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
              setIsLoading(false);
            },
            () => {},
            format(END_POINT.TOE_INSERT_LIBRARY_CARD),
            _body,
            null,
            null
          );

        let registerMemberPromise = () => {
          let _endpoint = format(
            END_POINT.TOE_UPDATE_LIBRARY_CARD,
            dataDetail?.cardID
          );

          return baseApi.put(
            (res) => {
              debugger;
            },
            (err) => {
              debugger;

              setIsLoading(false);
              cancelRequestRef.current = false;
            },
            () => {},
            _endpoint,
            {
              ..._body,
              joinDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
              cardCode: 'LC000001',
            },
            null,
            null
          );
        };

        Promise.all(
          authCtx.isMember() ? registerMemberPromise() : insertCardPromise(),
          updatePromise()
        )
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
      case slugify(MENU_NAME.LIBRARY_CARD):
        _label = MENU_NAME.LIBRARY_CARD;
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
      BookOrderInformation: JSON.stringify(bookCheckout.item),
      Note: 'note',
      accountID: getUserID(),
      FromDate: new Date(bookCheckout.from).addHours(7),
      DueDate: new Date(bookCheckout.to).addHours(7),
      createdDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      createdBy: getUserName(),
      modifiedDate: new Date(Date.now() + 7 * 60 * 60 * 1000),
      modifiedBy: getUserName(),
      orderStatus: RESERVATION_STATUS.WAITING,
    };

    setIsRequestBorrowing(true);

    baseApi.post(
      (res) => {
        if (res.data) {
          setIsShowPopupChooseTime(false);
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Gửi yêu cầu thành công',
            life: 3000,
          });

          if (bookCheckout.item.length === cartCtx.size) {
            cartCtx.removeAll();
          } else {
            cartCtx.remove(bookCheckout.item[0].bookID);
          }

          setTimeout(() => {
            setBookCheckout(DEFAULT_BOOK_CHECKOUT);
          }, 0);
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Gửi yêu cầu thất bại',
            life: 3000,
          });
        }
        setIsRequestBorrowing(false);
      },
      (err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Có lỗi xảy ra',
          life: 3000,
        });
        setIsRequestBorrowing(false);
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

  const renderSkeleton = () => {
    let number = Math.min(MIN_PAGE_SIZE, totalRecords || MIN_PAGE_SIZE),
      arr = [],
      obj = {};

    for (const column of COLUMNS) {
      obj[column.field] = <Skeleton shape="rectangle"></Skeleton>;
    }

    for (let index = 0; index < number; index++) {
      arr.push(obj);
    }

    return arr;
  };

  const getBooksLendingFilter = (filters = [], body = {}) => {
    let _filter = [
      ['IsDeleted', OPERATOR.EQUAL, '0'],
      OPERATOR.AND,
      ['Status', OPERATOR.EQUAL, '1'],
      OPERATOR.AND,
      ['AccountID', OPERATOR.EQUAL, getUserID()],
    ];

    if (loanReportData.loan_status !== -1) {
      _filter.push(OPERATOR.AND);
      _filter.push(['orderStatus', OPERATOR.EQUAL, loanReportData.loan_status]);
    }

    if (filters.length) {
      _filter.push(OPERATOR.AND);
      _filter.push(filters);
    }

    baseApi.post(
      (res) => {
        let _data = res.data.pageData;
        setDataTable({
          isLoading: false,
          data: _data.map((_) => ({ ..._, key: _.bookOrderID })),
        });
        setTotalRecords(res.data.totalRecords);
      },
      (err) => {
        setDataTable({
          data: [],
          isLoading: false,
        });
      },
      () => {
        setDataTable({
          ...dataTable,
          isLoading: true,
        });
      },
      END_POINT.TOE_BOOK_ORDERS_FILTER_V2,
      {
        filter: btoa(JSON.stringify(_filter)),
        pageSize: MAXIMUM_PAGESIZE,
        pageIndex: 1,
        sort: JSON.stringify([['ModifiedDate', SORT_TYPE.DESC]]),
        ...body,
      },
      null
    );
  };

  function renderBookOrderInfomation(info) {
    if (isLoading) return <Skeleton></Skeleton>;
    let infoParsed = ParseJson(info);
    if (isArray(infoParsed) && !isEmpty(infoParsed)) {
      if (infoParsed.length === 1) {
        return infoParsed[0].bookCode;
      } else {
        let tooltipContent = (
          <div className="tt-wrapper">
            {infoParsed.map((item) => {
              return (
                <div className="tt-row">
                  <div className="tt-row__left">{item.bookCode}</div>|
                  <div className="tt-row__right">{item.bookName}</div>
                </div>
              );
            })}
          </div>
        );

        return (
          <Tooltip
            openClassName="tt-tag-table-order"
            overlayClassName="tt-tag-table-order"
            title={tooltipContent}
          >
            <div
              style={{ backgroundColor: '#ffc107', fontWeight: 700 }}
              className="tag-table-info"
              color={'#000000'}
            >
              {infoParsed.length}+
            </div>
          </Tooltip>
        );
      }
    }
  }

  function renderOrderStatus(row) {
    let status = row?.orderStatus;
    if (isLoading) return <Skeleton></Skeleton>;
    let statusObject = getOrderStatus(status);
    return (
      <div>
        <Tag color={statusObject.color}>{statusObject.label}</Tag>
        {status === RESERVATION_STATUS.CANCELED && (
          <Tooltip title={row.note ?? TEXT_FALL_BACK.TYPE_1}>
            <i className="pi pi-comment"></i>
          </Tooltip>
        )}
        <div></div>
      </div>
    );
  }

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
                  onClick={() => {
                    inputFile.current.click();
                  }}
                >
                  <img
                    src={image}
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
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  ref={inputFile}
                  onChange={(event) => {
                    setImageToSave(event.target.files[0]);
                    setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                  style={{ display: 'none' }}
                />
                <div className="user-profile__avt-name toe-font-title">
                  {dataDetail?.fullName ??
                    getFullName() ??
                    getAccountName() ??
                    TEXT_FALL_BACK.TYPE_1}
                </div>

                <div className="user-profile__avt-name toe-font-label">
                  Loại bạn đọc:{' '}
                  {getMemberTypeText(
                    ParseJson(ParseJson(LOCAL_STORATE_KEY.MEMBER_INFO))
                      ?.MemberType || 99
                  )}
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
              {currentView === slugify(MENU_NAME.ACCOUNT) && accountView()}
              {currentView === slugify(MENU_NAME.SECURITY) && secureView()}
              {currentView === slugify(MENU_NAME.LIBRARY_CARD) &&
                libraryCardView()}
              {currentView === slugify(MENU_NAME.BORROW_RETURN) &&
                borrowReturnView()}
              {currentView === slugify(MENU_NAME.CART) && cartView()}
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
            disabled={
              !bookCheckout?.from || !bookCheckout?.to || isRequestBorrowing
            }
            name="Xác nhận"
            onClick={handleAcceptBorrow}
            type={
              isRequestBorrowing ? BUTTON_TYPE.RIGHT_ICON : BUTTON_TYPE.NORMAL
            }
            rightIcon={<i className="pi pi-spin pi-spinner"></i>}
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
            Tổng số lượng:{' '}
            <div className="toe-font-body">
              {bookCheckout?.item?.reduce(
                (pre, next) => pre + next.quantity,
                0
              ) ?? 0}
            </div>
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
                    from: new Date(moment(value).startOf('day').toString()),
                    to: new Date(
                      moment(value).add(10, 'days').startOf('day').toString()
                    ),
                  });
                }}
                min={new Date()}
                defaultValue={bookCheckout.from}
              />
            </div>
            <div className="_col">
              <div className="_col-label toe-font-label">Đến</div>
              <DatePicker
                onChange={({ value }) => {
                  setBookCheckout({
                    ...bookCheckout,
                    to: new Date(moment(value).startOf('day').toString()),
                  });
                }}
                defaultValue={bookCheckout.to}
                disabled={!bookCheckout?.from}
                min={
                  new Date(
                    moment(bookCheckout?.from)
                      .add(1, 'days')
                      .startOf('day')
                      .toString()
                  )
                }
                max={
                  new Date(
                    moment(bookCheckout?.from).add(10, 'days').startOf('day')
                  )
                }
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

{
  /* <div className="frame-right__body-row status">
<div className="toe-font-label">Trạng thái</div>
<div className="toe-font-label">
  {' '}
  <Tag color={dataDetail?.status ? '#87d068' : '#e5e5e5'}>
    {dataDetail?.status ? 'Hoạt động' : 'Ngừng hoạt động'}
  </Tag>
</div>
</div> */
}
