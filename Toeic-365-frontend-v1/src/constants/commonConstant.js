const TEXT_FALL_BACK = {
  TYPE_1: '- - -',
  TYPE_2: '--',
  TYPE_3: '- -',
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
};

const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/, //ít nhất 8 kí tự
};

const KEY_CODE = {
  ENTER: 13,
};

export { TEXT_FALL_BACK, BUTTON_THEME, BUTTON_TYPE, REGEX, KEY_CODE };
