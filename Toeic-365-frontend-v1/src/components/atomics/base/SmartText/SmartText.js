import { Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { buildClass } from '../../../../constants/commonFunction';
import './smartText.scss';
const { Paragraph } = Typography;

SmartText.propTypes = {
  style: PropTypes.object,
  onEllipsis: PropTypes.func,
  rows: PropTypes.number,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  innnerClassName: PropTypes.string,
};

SmartText.defaultProps = {
  onEllipsis: () => {},
  rows: 1,
  maxWidth: '100%',
  className: '',
  innnerClassName: '',
  style: {},
};

function SmartText(props) {
  const {
    onEllipsis,
    rows,
    children,
    maxWidth,
    className,
    style,
    innnerClassName,
  } = props;

  return (
    <span
      style={{ maxWidth: maxWidth, ...style }}
      className={buildClass(['toe-smarttext', className, 'toe-font-body'])}
    >
      <Paragraph
        className={buildClass([innnerClassName])}
        ellipsis={{
          rows,
          onEllipsis: onEllipsis,
          tooltip: children,
        }}
      >
        {children}
      </Paragraph>
    </span>
  );
}

export default SmartText;
