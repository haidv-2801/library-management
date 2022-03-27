const DEV_HOST = process.env.REACT_APP_DEV_DOMAIN;

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
    };
  } else {
    return {};
  }
})();

export default END_POINT;
