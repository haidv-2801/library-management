import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  DATE_FORMAT,
} from '../../../constants/commonConstant';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment';
import {
  RightOutlined,
  SearchOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { OPERATOR } from '../../../constants/commonConstant';
import Input from '../../atomics/base/Input/Input';
import Button from '../../atomics/base/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import './filterEngine.scss';

FilterEngine.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

FilterEngine.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
};

function FilterEngine(props) {
  const { id, style, className, onClick } = props;

  const operators = [
    { label: 'AND', value: OPERATOR.AND },
    { label: 'OR', value: OPERATOR.OR },
    { label: 'NOT', value: OPERATOR.NOT },
  ];

  const filterTypeOptions = [
    {
      label: 'Tất cả',
      value: 0,
    },
    {
      label: 'Nhan đề',
      value: 1,
    },
    {
      label: 'Tác giả',
      value: 2,
    },
  ];

  const [advancedFilterValue, setAdvancedFilterValue] = useState([
    OPERATOR.AND,
    OPERATOR.AND,
    OPERATOR.AND,
  ]);

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-filter-engine toe-font-body', className])}
    >
      <div className="toe-filter-engine__control">
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[0]}
          options={operators}
        />{' '}
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[0]}
          options={filterTypeOptions}
        />{' '}
        <Input />
      </div>
      <div className="toe-filter-engine__control">
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[1]}
          options={operators}
        />{' '}
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[0]}
          options={filterTypeOptions}
        />{' '}
        <Input />
      </div>
      <div className="toe-filter-engine__control">
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[2]}
          options={operators}
        />{' '}
        <Dropdown
          onChange={(data) => {
            setAdvancedFilterValue(advancedFilterValue);
          }}
          defaultValue={advancedFilterValue[0]}
          options={filterTypeOptions}
        />{' '}
        <Input />
      </div>
      <div className="toe-filter-engine__control">
        <Button
          type={BUTTON_TYPE.LEFT_ICON}
          leftIcon={<RetweetOutlined />}
          name={'Làm mới'}
          theme={BUTTON_THEME.THEME_6}
          onClick={() => {}}
        />
        <Button
          type={BUTTON_TYPE.LEFT_ICON}
          leftIcon={<SearchOutlined />}
          name={'Tìm kiếm'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default FilterEngine;
