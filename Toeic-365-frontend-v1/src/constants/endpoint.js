const DEV_HOST = 'http://localhost:8081';
let END_POINT = {
  //user
  TOE_GET_USERS: DEV_HOST + '/api/users',
  TOE_GET_ME: DEV_HOST + '/api/users/me',
  TOE_GET_USER_UPDATE: DEV_HOST + '/api/users/update',
  TOE_GET_USER_DELETE: DEV_HOST + '/api/users/delete/{0}',
  //exam
  TOE_GET_EXAM_INTRO: DEV_HOST + '/api/exams/intro',
  TOE_GET_EXAMS: DEV_HOST + '/api/exams/name',
};

// if (
//   process.env.NODE_ENV.toString().toLowerCase() === 'development' ||
//   process.env.NODE_ENV.toString().toLowerCase() == ''
// ) {
//   END_POINT = {
//     //user
//     TOE_GET_USERS: DEV_HOST + '/api/users',
//     TOE_GET_ME: DEV_HOST + '/api/users/me',
//     TOE_GET_USER_UPDATE: DEV_HOST + '/api/users/update',
//     TOE_GET_USER_DELETE: DEV_HOST + '/api/users/delete/{0}',

//     //exam
//     TOE_GET_EXAM_INTRO: DEV_HOST + 'api/exams/intro',
//     TOE_GET_EXAMS: DEV_HOST + 'api/exams/name',
//   };
// } else {
//   END_POINT = {};
// }

export default END_POINT;
