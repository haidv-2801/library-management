import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip } from 'antd';
import './smartText.scss';
import { buildClass } from '../../../../constants/commonFunction';
const { Paragraph } = Typography;

SmartText.propTypes = {
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
};

function SmartText(props) {
  const { onEllipsis, rows, children, maxWidth, className } = props;

  return (
    <div
      style={{ maxWidth: maxWidth }}
      className={buildClass(['toe-smarttext', className, 'toe-font-body'])}
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
    </div>
  );
}

export default SmartText;
