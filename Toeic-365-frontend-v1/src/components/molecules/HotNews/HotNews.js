import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import './hotNews.scss';

HotNews.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

HotNews.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
};

function HotNews(props) {
  const { id, style, className, onClick } = props;
  const navigate = useNavigate();

  const handleSeeDetailNew = (item) => {
    navigate(PATH_NAME.NEWS + '/slug/234234');
  };

  const renderCommonItems = () => {
    const arr = Array.from(Array(10).keys());

    return arr.map((item, _) => (
      <div
        onClick={(item) => handleSeeDetailNew(item)}
        key={_}
        className="toe-hot-news__section-content"
      >
        <div className="toe-hot-news__section-content__img">
          {/* <img
            src={
              'https://images.unsplash.com/photo-1647887977201-46da49bacae7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            alt="Image"
          /> */}
          <img src={require('../../../assets/images/me.jpg')} alt="Image" />
        </div>
        <div className="toe-hot-news__section-content__info">
          <div className="toe-hot-news__section-content__desc">
            Thư viện Trường ĐH Công nghiệp Hà Nội tổ chức chương trình Hướng dẫn
            khai thác, sử dụng thư viện cho sinh viên khóa mới
          </div>
          <div className="toe-hot-news__section-content__date">
            Thứ Sáu, 07:46 14/01/2022
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-hot-news toe-font-body', className])}
    >
      <div className="toe-hot-news__section">
        <h2 className="toe-hot-news__section-title toe-font-large-title">
          Tin tiêu điểm
        </h2>
        {renderCommonItems()}
      </div>
      <div className="toe-hot-news__section">
        <h2 className="toe-hot-news__section-title toe-font-large-title">
          Giới thiệu thư viện
        </h2>
        <div className="toe-hot-news__section-content"></div>
      </div>
    </div>
  );
}

export default HotNews;
