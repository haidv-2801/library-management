import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip } from 'antd';
import './smartText.scss';
const { Paragraph } = Typography;

SmartText.propTypes = {
  onEllipsis: PropTypes.func,
  rows: PropTypes.number,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SmartText.defaultProps = {
  onEllipsis: () => {},
  rows: 1,
  maxWidth: '100%',
};

function SmartText(props) {
  const { onEllipsis, rows, children, maxWidth } = props;

  return (
    <div style={{ maxWidth: maxWidth }} className="toe-font-body toe-smarttext">
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
