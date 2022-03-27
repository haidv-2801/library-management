import PropTypes from 'prop-types';
import React from 'react';
import { buildClass } from '../../../constants/commonFunction';
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
