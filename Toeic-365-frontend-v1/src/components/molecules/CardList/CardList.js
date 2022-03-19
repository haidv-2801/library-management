import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import { Card } from 'primereact/card';
import { format } from 'react-string-format';
import { Image } from 'primereact/image';
import SmartText from '../../atomics/base/SmartText/SmartText';
import CardItem from '../Card/Card';
import './cardList.scss';

CardList.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  cards: PropTypes.array,
  isLoading: PropTypes.bool,
};

CardList.defaultProps = {
  id: '',
  className: '',
  style: {},
  cards: [],
  isLoading: false,
};

function CardList(props) {
  const { id, style, className, cards, isLoading } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-card-list', className])}
    >
      {cards.length
        ? cards.map((card) => {
            return (
              <CardItem
                key={card.id}
                title={card?.title}
                subTitle={card?.subTitle}
                imgSrc={card?.imgSrc}
                description={card?.description}
                isLoading={isLoading}
              />
            );
          })
        : null}
    </div>
  );
}

export default CardList;
