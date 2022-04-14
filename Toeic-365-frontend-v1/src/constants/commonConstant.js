const TEXT_FALL_BACK = {
  TYPE_1: '- - -',
  TYPE_2: '--',
  TYPE_3: '- -',
  TYPE_4: '---',
};

const PATH_NAME = {
  HOME: '/trang-chu',
  REGISTER: '/dang-ky',
  LOGIN: '/dang-nhap',
  ABOUT: '/gioi-thieu',
  USER: '/nguoi-dung',
  NEWS: '/tin-tuc',
  NOTIFICATION: '/thong-bao',
  RESOURCES: '/tai-nguyen-bo-suu-tap',
  SERVICES: '/dich-vu-tien-ich',
  BORROWING_RETURNING_BOOK: '/muon-tra-tai-lieu',
  NEW_BOOKS_INTRODUCTION: '/gioi-thieu-sach-moi',

  //admin
  ADMIN: '/admin',
  ADMIN_DASBOARD: '/admin/dashboard',
  ADMIN_POST_PAGE: '/admin/post',
  ADMIN_CREATE_POST_PAGE: '/admin/tin-tuc/post/new',
};

const BUTTON_TYPE = {
  NORMAL: 1,
  LEFT_ICON: 2,
  RIGHT_ICON: 3,
};

const BUTTON_SHAPE = {
  ROUND: 1,
  NORMAL: 2,
};

const BUTTON_THEME = {
  /**
   * nền xanh chữ trắng
   */
  THEME_1: 1,
  /**
   * nền trắng chữ đen viền xanh
   */
  THEME_2: 2,
  /**
   * nền trắng viền đen
   */
  THEME_3: 3,
  /**
   * nền trắng viền đỏ chữ xanh
   */
  THEME_4: 4,
  /**
   * nền đỏ chữ trắng hover-> nền trắng viền đỏ chữ xanh
   */
  THEME_5: 5,
  /**
   * nền trắng không viền
   */
  THEME_6: 6,
};

const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
  //eslint-disable-next-line
  PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/, //ít nhất 8 kí tự
};

const KEY_CODE = {
  ENTER: 13,
};

const CHECKBOX_TYPE = {
  CIRCLE: 1,
  SQUARE: 2,
};

const DATE_FORMAT = {
  TYPE_1: 'DD-MM-YYYY HH:mm:ss',
  TYPE_2: 'HH:mm DD-MM-YYYY',
};

const OPERATOR = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  CONTAINS: 'CONTAINS',
  START_WIDTH: 'START_WIDTH',
  END_WIDTH: 'END_WIDTH',
  EQUAL: '=',
  NOT_EQUAL: '<>',
};

const PAGEGING = [10, 20, 50];

const POST_TYPE = {
  NEWS: 0,
  NOTIFICATION: 1,
  ABOUT_THE_BOOK: 2,
};

const BOOK_FORMAT = {
  EBOOK: 0,
  PAPER_BACK: 1,
};

const GUID_NULL = '00000000-0000-0000-0000-000000000000';

/**
 * Menu type trong header
 * 0: là trang html render khi đó render path dạng: /hmtl/ + slug
 * 1: là redirect đến trang khác render khi đó render path dạng: link
 * 2: là trang bình thường khi đó render path dạng: slug
 * 3: thường là menu chứa menu con khi click vào không có sk
 */
const MENU_TYPE = {
  HTML_RENDER: 0,
  REDIRECT: 1,
  NORMAL: 2,
  NONE_EVENT: 3,
};

const FIXED_MENU_ID = {
  NEWS: '8d0fb05d-5ca6-4cf6-adfb-75e50d2a88c5',
  NOTIFICATION: 'be71f925-721b-4892-9a39-c450ea8ea88d',
  NEW_BOOKS_INTRODUCTION: 'df867bd4-8f77-4418-afa3-5b49bd4270a5',
};

/**
 * Số page tối đa
 */
const MAXIMUM_PAGESIZE = 9999;

/**
 * Gắn thêm vào body filter base
 */
const ACTIVE_RECORD_FILTER = [
  OPERATOR.AND,
  ['IsDeleted', OPERATOR.EQUAL, '0'],
  OPERATOR.AND,
  ['Status', OPERATOR.EQUAL, '1'],
];

const STATUS_CODE = {
  UNAUTHORIZE: 401,
  BAD_REQUEST: 300,
};

const DAYS_OF_WEEK = [
  '',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
];

export {
  STATUS_CODE,
  DAYS_OF_WEEK,
  ACTIVE_RECORD_FILTER,
  MAXIMUM_PAGESIZE,
  FIXED_MENU_ID,
  MENU_TYPE,
  GUID_NULL,
  BUTTON_SHAPE,
  BOOK_FORMAT,
  TEXT_FALL_BACK,
  BUTTON_THEME,
  BUTTON_TYPE,
  REGEX,
  KEY_CODE,
  PATH_NAME,
  CHECKBOX_TYPE,
  DATE_FORMAT,
  OPERATOR,
  PAGEGING,
  POST_TYPE,
};
