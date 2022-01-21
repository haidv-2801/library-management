const DEV_HOST = 'http://localhost:8081';

const ADMIN_ENDPOINT = () => {
  if (
    process.env.NODE_ENV.toLowerCase() === 'development' ||
    process.env.NODE_ENV.toLowerCase() == ''
  ) {
    //Dev
    return {
      TOE_GET_USERS: DEV_HOST + '/api/users',
      TOE_GET_ME: DEV_HOST + '/api/users/me',
      TOE_GET_USER_UPDATE: DEV_HOST + '/api/users/update',
      TOE_GET_USER_DELETE: DEV_HOST + '/api/users/delete/{0}',
    };
  } else {
    //Product
    return {};
  }
};

const USER_ENDPOINT = () => {
  if (
    process.env.NODE_ENV.toLowerCase() === 'development' ||
    process.env.NODE_ENV.toLowerCase() == ''
  ) {
    //Dev
    return {};
  } else {
    //Product
    return {};
  }
};
