export const TEXT_FALL_BACK = {
  TYPE_1: '- - -',
  TYPE_2: '--',
  TYPE_3: '- -',
  TYPE_4: '---',
};

export const PATH_NAME = {
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

export const BUTTON_TYPE = {
  NORMAL: 1,
  LEFT_ICON: 2,
  RIGHT_ICON: 3,
};

export const BUTTON_SHAPE = {
  ROUND: 1,
  NORMAL: 2,
};

export const BUTTON_THEME = {
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

export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
  //eslint-disable-next-line
  PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/, //ít nhất 8 kí tự
};

export const KEY_CODE = {
  ENTER: 13,
};

export const CHECKBOX_TYPE = {
  CIRCLE: 1,
  SQUARE: 2,
};

export const DATE_FORMAT = {
  TYPE_1: 'DD-MM-YYYY HH:mm:ss',
  TYPE_2: 'HH:mm DD-MM-YYYY',
};

export const OPERATOR = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  CONTAINS: 'CONTAINS',
  START_WIDTH: 'START_WIDTH',
  END_WIDTH: 'END_WIDTH',
  EQUAL: '=',
  NOT_EQUAL: '<>',
};

export const PAGEGING = [10, 20, 50];

export const POST_TYPE = {
  NEWS: 0,
  NOTIFICATION: 1,
  ABOUT_THE_BOOK: 2,
};

export const BOOK_FORMAT = {
  EBOOK: 0, //Tài liệu điện tử
  PAPER_BACK: 1, //Tài liệu giấy
};

export const GUID_NULL = '00000000-0000-0000-0000-000000000000';

/**
 * Menu type trong header
 * 0: là trang html render khi đó render path dạng: /hmtl/ + slug
 * 1: là redirect đến trang khác render khi đó render path dạng: link
 * 2: là trang bình thường khi đó render path dạng: slug
 * 3: thường là menu chứa menu con khi click vào không có sk
 */
export const MENU_TYPE = {
  HTML_RENDER: 0,
  REDIRECT: 1,
  NORMAL: 2,
  NONE_EVENT: 3,
};

export const FIXED_MENU_ID = {
  NEWS: '8d0fb05d-5ca6-4cf6-adfb-75e50d2a88c5',
  NOTIFICATION: 'be71f925-721b-4892-9a39-c450ea8ea88d',
  NEW_BOOKS_INTRODUCTION: 'df867bd4-8f77-4418-afa3-5b49bd4270a5',
};

/**
 * Số page tối đa
 */
export const MAXIMUM_PAGESIZE = 9999;

/**
 * Gắn thêm vào body filter base
 */
export const ACTIVE_RECORD_FILTER = [
  OPERATOR.AND,
  ['IsDeleted', OPERATOR.EQUAL, '0'],
  OPERATOR.AND,
  ['Status', OPERATOR.EQUAL, '1'],
];

export const STATUS_CODE = {
  UNAUTHORIZE: 401,
  BAD_REQUEST: 300,
};

/**
 * !Loại bạn đọc
 */
export const MEMBER_TYPE = {
  GUEST: 2,
  STUDENT: 1,
  LECTURER: 0,
};

export const DAYS_OF_WEEK = [
  '',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
];

export const ADMIN_BOOK_PAGE_BOLUMN_SEARCH = [
  { label: 'Mã sách', value: 'BookCode' },
  { label: 'Tên sách', value: 'BookName' },
  { label: 'Mô tả', value: 'Description' },
  { label: 'Tác giả', value: 'Author' },
  { label: 'Nhà xuất bản', value: 'Publisher' },
];

export const MAXIMUM_FILE_SIZE = 1000000;

export const ACCEPT_FILE =
  '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const LANGUAGE = [
  {
    LanguageName: 'Vietnamese',
    LanguageCode: 'vi',
    CriterionID: 1040,
  },
  {
    LanguageName: 'Arabic',
    LanguageCode: 'ar',
    CriterionID: 1019,
  },
  {
    LanguageName: 'Bengali',
    LanguageCode: 'bn',
    CriterionID: 1056,
  },
  {
    LanguageName: 'Bulgarian',
    LanguageCode: 'bg',
    CriterionID: 1020,
  },
  {
    LanguageName: 'Catalan',
    LanguageCode: 'ca',
    CriterionID: 1038,
  },
  {
    LanguageName: 'Chinese (simplified)',
    LanguageCode: 'zh_CN',
    CriterionID: 1017,
  },
  {
    LanguageName: 'Chinese (traditional)',
    LanguageCode: 'zh_TW',
    CriterionID: 1018,
  },
  {
    LanguageName: 'Croatian',
    LanguageCode: 'hr',
    CriterionID: 1039,
  },
  {
    LanguageName: 'Czech',
    LanguageCode: 'cs',
    CriterionID: 1021,
  },
  {
    LanguageName: 'Danish',
    LanguageCode: 'da',
    CriterionID: 1009,
  },
  {
    LanguageName: 'Dutch',
    LanguageCode: 'nl',
    CriterionID: 1010,
  },
  {
    LanguageName: 'English',
    LanguageCode: 'en',
    CriterionID: 1000,
  },
  {
    LanguageName: 'Estonian',
    LanguageCode: 'et',
    CriterionID: 1043,
  },
  {
    LanguageName: 'Filipino',
    LanguageCode: 'tl',
    CriterionID: 1042,
  },
  {
    LanguageName: 'Finnish',
    LanguageCode: 'fi',
    CriterionID: 1011,
  },
  {
    LanguageName: 'French',
    LanguageCode: 'fr',
    CriterionID: 1002,
  },
  {
    LanguageName: 'German',
    LanguageCode: 'de',
    CriterionID: 1001,
  },
  {
    LanguageName: 'Greek',
    LanguageCode: 'el',
    CriterionID: 1022,
  },
  {
    LanguageName: 'Gujarati',
    LanguageCode: 'gu',
    CriterionID: 1072,
  },
  {
    LanguageName: 'Hebrew',
    LanguageCode: 'iw',
    CriterionID: 1027,
  },
  {
    LanguageName: 'Hindi',
    LanguageCode: 'hi',
    CriterionID: 1023,
  },
  {
    LanguageName: 'Hungarian',
    LanguageCode: 'hu',
    CriterionID: 1024,
  },
  {
    LanguageName: 'Icelandic',
    LanguageCode: 'is',
    CriterionID: 1026,
  },
  {
    LanguageName: 'Indonesian',
    LanguageCode: 'id',
    CriterionID: 1025,
  },
  {
    LanguageName: 'Italian',
    LanguageCode: 'it',
    CriterionID: 1004,
  },
  {
    LanguageName: 'Japanese',
    LanguageCode: 'ja',
    CriterionID: 1005,
  },
  {
    LanguageName: 'Kannada',
    LanguageCode: 'kn',
    CriterionID: 1086,
  },
  {
    LanguageName: 'Korean',
    LanguageCode: 'ko',
    CriterionID: 1012,
  },
  {
    LanguageName: 'Latvian',
    LanguageCode: 'lv',
    CriterionID: 1028,
  },
  {
    LanguageName: 'Lithuanian',
    LanguageCode: 'lt',
    CriterionID: 1029,
  },
  {
    LanguageName: 'Malay',
    LanguageCode: 'ms',
    CriterionID: 1102,
  },
  {
    LanguageName: 'Malayalam',
    LanguageCode: 'ml',
    CriterionID: 1098,
  },
  {
    LanguageName: 'Marathi',
    LanguageCode: 'mr',
    CriterionID: 1101,
  },
  {
    LanguageName: 'Norwegian',
    LanguageCode: 'no',
    CriterionID: 1013,
  },
  {
    LanguageName: 'Persian',
    LanguageCode: 'fa',
    CriterionID: 1064,
  },
  {
    LanguageName: 'Polish',
    LanguageCode: 'pl',
    CriterionID: 1030,
  },
  {
    LanguageName: 'Portuguese',
    LanguageCode: 'pt',
    CriterionID: 1014,
  },
  {
    LanguageName: 'Romanian',
    LanguageCode: 'ro',
    CriterionID: 1032,
  },
  {
    LanguageName: 'Russian',
    LanguageCode: 'ru',
    CriterionID: 1031,
  },
  {
    LanguageName: 'Serbian',
    LanguageCode: 'sr',
    CriterionID: 1035,
  },
  {
    LanguageName: 'Slovak',
    LanguageCode: 'sk',
    CriterionID: 1033,
  },
  {
    LanguageName: 'Slovenian',
    LanguageCode: 'sl',
    CriterionID: 1034,
  },
  {
    LanguageName: 'Spanish',
    LanguageCode: 'es',
    CriterionID: 1003,
  },
  {
    LanguageName: 'Swedish',
    LanguageCode: 'sv',
    CriterionID: 1015,
  },
  {
    LanguageName: 'Tamil',
    LanguageCode: 'ta',
    CriterionID: 1130,
  },
  {
    LanguageName: 'Telugu',
    LanguageCode: 'te',
    CriterionID: 1131,
  },
  {
    LanguageName: 'Thai',
    LanguageCode: 'th',
    CriterionID: 1044,
  },
  {
    LanguageName: 'Turkish',
    LanguageCode: 'tr',
    CriterionID: 1037,
  },
  {
    LanguageName: 'Ukrainian',
    LanguageCode: 'uk',
    CriterionID: 1036,
  },
  {
    LanguageName: 'Urdu',
    LanguageCode: 'ur',
    CriterionID: 1041,
  },
];

export const UTC_INTRODUCE_VIDEO = 'https://www.youtube.com/embed/sUU8WhGQWDw';

export const UTC_WEB_TITLE =
  'Trung tâm thông tin thư vện trường đại học giao thông vận tải';
