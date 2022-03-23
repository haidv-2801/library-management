const TEXT_FALL_BACK = {
  TYPE_1: '- - -',
  TYPE_2: '--',
  TYPE_3: '- -',
};

const PATH_NAME = {
  HOME: '/home',
  REGISTER: '/register',
  LOGIN: '/login',
};

const BUTTON_TYPE = {
  NORMAL: 1,
  LEFT_ICON: 2,
  RIGHT_ICON: 3,
};

const BUTTON_THEME = {
  THEME_1: 1, //nền xanh chữ trắng
  THEME_2: 2, //nền trắng chữ đen viền xanh
  THEME_3: 3, //nền trắng viền đen
  THEME_4: 4, //nền trắng viền đỏ chữ xanh
  THEME_5: 5, //nền đỏ chữ trắng hover-> nền trắng viền đỏ chữ xanh
  THEME_6: 6, //nền trắng không viền
};

const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
};

const PAGEGING = [10, 20, 50];

export {
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
};
