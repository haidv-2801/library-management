import { TEXT_FALL_BACK } from './commonConstant';

/**
 * Build ra classname
 * @param {*} arr mảng class và logic
 */
export const buildClass = (arr = []) => {
  return arr.filter(Boolean).join(' ');
};

/**
 * Build query params từ object
 * @param {*} obj object
 */
export const objectToQueryParams = function (obj) {
  var str = [],
    join = '';

  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }

  join = str.join('&');
  if (join.length > 0) join = '?' + join;

  return join;
};

/**
 *Lấy ra tên rút gọn
 *VD: do van hai -> dh
 */
export const getSmallName = (name) => {
  if (name instanceof String || typeof name == 'string') {
    if (name.length < 2) {
      return TEXT_FALL_BACK.TYPE_2;
    } else {
      let words = name?.split(/\s+/);
      if (words.length > 1) {
        return words[0][0] + words[words.length - 1][0];
      } else {
        return words[0][0] + words[0][1];
      }
    }
  }
  return TEXT_FALL_BACK.TYPE_2;
};
