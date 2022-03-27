import PropTypes from 'prop-types';
import React from 'react';
import { buildClass } from '../../../constants/commonFunction';
import { BookOutlined } from '@ant-design/icons';
import SmartText from '../../atomics/base/SmartText/SmartText';
import './book.scss';
import { Tooltip } from 'antd';

Book.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Book.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function Book(props) {
  const { id, style, className } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-book', 'toe-font-body', className])}
    >
      <Tooltip title="Tài liệu giấy">
        <div className="toe-book__type">
          <BookOutlined />
        </div>
      </Tooltip>
      <div className="toe-book__title">
        <SmartText rows={7}>
          {' '}
          Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ
          trong sản xuất may công nghiệp
        </SmartText>
      </div>
      <div className="toe-book__author">Nguyễn Thị Thảo</div>
    </div>
  );
}

export default Book;
