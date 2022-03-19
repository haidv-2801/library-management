import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './carousel.scss';

Carousel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  numVisible: PropTypes.number,
  numScroll: PropTypes.number,
  options: PropTypes.array,
  header: PropTypes.any,
  itemTemplate: PropTypes.any,
};

Carousel.defaultProps = {
  id: '',
  className: '',
  style: {},
  numScroll: 3,
  numVisible: 3,
  options: [],
  header: null,
  itemTemplate: null,
};

function Carousel(props) {
  const {
    id,
    style,
    className,
    numScroll,
    numVisible,
    options,
    header,
    itemTemplate,
  } = props;

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-carousel toe-font-body', className])}
    >
      <Carousel
        value={options}
        numVisible={numScroll}
        numScroll={numVisible}
        responsiveOptions={responsiveOptions}
        itemTemplate={itemTemplate}
        header={header}
      />
    </div>
  );
}

export default Carousel;
