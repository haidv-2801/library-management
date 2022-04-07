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

      //user
      TOE_GET_USERS: DEV_HOST + '/api/users',
      TOE_GET_ME: DEV_HOST + '/api/users/me',
      TOE_GET_USER_UPDATE: DEV_HOST + '/api/users/update',
      TOE_GET_USER_DELETE: DEV_HOST + '/api/users/delete/{0}',

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

      /**
       * *Endpoint menu
       */
      TOE_GET_MENUS_FILTER_PAGING: DEV_HOST + 'api/Menus/MenusFilterPaging',
      TOE_GET_MENUS: DEV_HOST + 'api/Menus',
      TOE_UPDATE_MENU: DEV_HOST + 'api/Menus/{0}',
      TOE_INSERT_MENU: DEV_HOST + 'api/Menus',
      TOE_GET_MENU_BY_ID: DEV_HOST + 'api/Menus/{0}',
      TOE_DELETE_MENU: DEV_HOST + 'api/Menus/{0}',
    };
  } else {
    return {};
  }
})();

export default END_POINT;
