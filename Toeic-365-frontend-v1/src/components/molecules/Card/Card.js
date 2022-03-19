import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import { Skeleton } from 'primereact/skeleton';
import './card.scss';

CardItem.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  imgSrc: PropTypes.any,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  footer: PropTypes.any,
  description: PropTypes.any,
  isLoading: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CardItem.defaultProps = {
  id: '',
  className: '',
  style: {},
  onClick: () => {},
  imgSrc: null,
  title: null,
  subTitle: null,
  subTitle: null,
  footer: null,
  description: null,
  width: '20em',
  isLoading: false,
};

function CardItem(props) {
  const {
    id,
    style,
    className,
    onClick,
    imgSrc,
    title,
    subTitle,
    footer,
    description,
    isLoading,
    width,
  } = props;

  const header = () => {
    return (
      <div className="toe-card-img">
        <Image
          src={
            'https://images.unsplash.com/photo-1640622304964-3e2c2c0cd7cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          }
          alt="Image"
          width="auto"
          height={100}
          preview
        />
      </div>
    );
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-card toe-font-body', className])}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="custom-skeleton p-4">
          <Skeleton className="mb-3" width="100%" height="150px"></Skeleton>
          <div className="flex">
            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
            <div>
              <Skeleton width="14rem" className="mb-2"></Skeleton>
              <Skeleton width="10rem" className="mb-2"></Skeleton>
              <Skeleton height=".5rem" className="mb-1"></Skeleton>
            </div>
          </div>
        </div>
      ) : (
        <Card
          title={<SmartText>{title}</SmartText>}
          style={{ width: width }}
          subTitle={<SmartText>{subTitle}</SmartText>}
          footer={footer}
          header={header()}
        >
          <p className="m-0" style={{ lineHeight: '1.5' }}>
            <SmartText rows={4}>{description}</SmartText>
          </p>
        </Card>
      )}
    </div>
  );
}

export default CardItem;
