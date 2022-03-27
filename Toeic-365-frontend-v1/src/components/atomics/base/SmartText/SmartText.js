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
};

SmartText.defaultProps = {
  onEllipsis: () => {},
  rows: 1,
  maxWidth: '100%',
  className: '',
  style: {},
};

function SmartText(props) {
  const { onEllipsis, rows, children, maxWidth, className, style } = props;

  return (
    <span
      style={{ maxWidth: maxWidth, ...style }}
      className={buildClass(['toe-smarttext toe-font-body', className])}
    >
      <Paragraph
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
