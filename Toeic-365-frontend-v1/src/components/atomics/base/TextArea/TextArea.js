import React from 'react';
import { Input } from 'antd';
import './textArea.scss';

const TextAreaBase = (props) => {
  return <Input.TextArea className="toe-textarea toe-font-body" {...props} />;
};

export default TextAreaBase;
