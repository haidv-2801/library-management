const DEV_HOST = process.env.REACT_APP_DEV_DOMAIN;
const PROD_HOST = process.env.REACT_APP_PROD_DOMAIN;

const END_POINT = (function () {
  if (
    process.env.NODE_ENV.toLowerCase() === 'development' ||
    process.env.NODE_ENV.toLowerCase() == ''
  ) {
    return {
      //login
      TOE_LOGIN: DEV_HOST + '/auth/login',

      //exam
      TOE_GET_EXAM_INTRO: DEV_HOST + '/api/exams/intro',
      TOE_GET_EXAMS: DEV_HOST + '/api/exams/name',
      TOE_GET_EXAM_DETAIL: DEV_HOST + '/api/exams',

      //admin
      /**
       * *Endpoint bài đăng
       */
      TOE_GET_POSTS_FILTER_PAGING: DEV_HOST + 'api/Posts/PostsFilterPaging',
      TOE_GET_POSTS: DEV_HOST + 'api/Posts',
      TOE_UPDATE_POST: DEV_HOST + 'api/Posts/{0}',
      TOE_INSERT_POST: DEV_HOST + 'api/Posts',
      TOE_GET_POST_BY_ID: DEV_HOST + 'api/Posts/{0}',
      TOE_DELETE_POST: DEV_HOST + 'api/Posts/{0}',
      TOE_GET_POSTS_FILTER: DEV_HOST + 'api/Posts/Filter',

      /**
       * *Endpoint menu
       */
      TOE_GET_MENUS_FILTER_PAGING: DEV_HOST + 'api/Menus/MenusFilterPaging',
      TOE_GET_MENUS: DEV_HOST + 'api/Menus',
      TOE_GET_MENUS_POST_COUNT: DEV_HOST + 'api/Menus/MenuPostsCount',
      TOE_UPDATE_MENU: DEV_HOST + 'api/Menus/{0}',
      TOE_INSERT_MENU: DEV_HOST + 'api/Menus',
      TOE_GET_MENU_BY_ID: DEV_HOST + 'api/Menus/{0}',
      TOE_DELETE_MENU: DEV_HOST + 'api/Menus/{0}',
      TOE_GET_MENUS_FILTER: DEV_HOST + 'api/Menus/Filter',

      /**
       * *Endpoint user
       */
      TOE_GET_USERS_FILTER_PAGING:
        DEV_HOST + 'api/Accounts/AccountsFilterPaging',
      TOE_GET_USERS: DEV_HOST + 'api/Accounts',
      TOE_UPDATE_USER: DEV_HOST + 'api/Accounts/{0}',
      TOE_UPDATE_USER_PASSWORD: DEV_HOST + 'api/Accounts/ChangePassword/{0}',
      TOE_DELETE_USER: DEV_HOST + 'api/Accounts/{0}',
      TOE_INSERT_USER: DEV_HOST + 'api/Accounts',
      TOE_GET_USER_BY_ID: DEV_HOST + 'api/Accounts/{0}',
      TOE_USER_LOGIN: DEV_HOST + 'api/Accounts/Login',

      /**
       * *Endpoint book
       */
      TOE_GET_BOOKS_FILTER_PAGING: DEV_HOST + 'api/Books/BooksFilterPaging',
      TOE_GET_BOOKS: DEV_HOST + 'api/BookItems',
      TOE_UPDATE_BOOK: DEV_HOST + 'api/BookItems/{0}',
      TOE_DELETE_BOOK: DEV_HOST + 'api/BookItems/{0}',
      TOE_INSERT_BOOK: DEV_HOST + 'api/BookItems',
      TOE_GET_BOOK_BY_ID: DEV_HOST + 'api/BookItems/{0}',
      TOE_GET_BOOKS_FILTER: DEV_HOST + 'api/BookItems/Filter',

      /**
       * *Endpoint category
       */
      TOE_GET_CATEGORIES: DEV_HOST + 'api/category',
      TOE_UPDATE_CATEGORY: DEV_HOST + 'api/category/{0}',
      TOE_DELETE_CATEGORY: DEV_HOST + 'api/category/{0}',
      TOE_INSERT_CATEGORY: DEV_HOST + 'api/category',
      TOE_GET_CATEGORY_BY_ID: DEV_HOST + 'api/category/{0}',
      TOE_GET_CATEGORIES_FILTER: DEV_HOST + 'api/categorys/Filter',

      /**
       * *Endpoint upload
       */
      TOE_GET_FILE: DEV_HOST + 'uploads/{0}',
      TOE_INSERT_FILE: DEV_HOST + 'api/file/insert',
    };
  } else {
    return {};
  }
})();

export default END_POINT;
