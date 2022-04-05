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
  RESOURCES: '/tai-nguyen-bo-suu-tap',
  SERVICES: '/dich-vu-tien-ich',
  BORROWING_RETURNING_BOOK: '/muon-tra-tai-lieu',
  SEARCH: '/tra-cuu',

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

export {
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
