import React from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import { BellOutlined } from '@ant-design/icons';
import './titleSeparator.scss';

TitleSeparator.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.any,
  icon: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TitleSeparator.defaultProps = {
  id: '',
  className: '',
  style: {},
  title: '',
  icon: null,
  width: 'auto',
};

function TitleSeparator(props) {
  const { id, style, className, title, icon, width } = props;
  return (
    <div
      id={id}
      // style={{ color: 'rgb(67, 193, 201)', width: width, ...style }}
      style={{ width: width, ...style }}
      className={buildClass([
        'toe-title-separator',
        'toe-font-body-big',
        className,
      ])}
    >
      {title}{' '}
      <div className="toe-title-separator__icon">
        <div className="toe-title-separator__line"></div>
        {icon}
        <div className="toe-title-separator__line"></div>
      </div>
    </div>
  );
}

export default TitleSeparator;
