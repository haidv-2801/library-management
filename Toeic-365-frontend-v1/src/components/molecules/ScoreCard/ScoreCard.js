import PropTypes from 'prop-types';
import React from 'react';
import { buildClass } from '../../../constants/commonFunction';
import './scoreCard.scss';

ScoreCard.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  icon: PropTypes.any,
  backgroundColor: PropTypes.string,
};

ScoreCard.defaultProps = {
  id: '',
  className: '',
  style: {},
  src: '',
  label: null,
  value: null,
  icon: null,
  backgroundColor: null,
};

function ScoreCard(props) {
  const { id, style, className, label, value, icon, backgroundColor } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-audio-score-card', className])}
    >
      <div className="toe-audio-score-card__label toe-font-title">
        {icon && <div className="toe-audio-score-card__icon"></div>}
        {label}
      </div>
      <div className="toe-audio-score-card__value toe-font-large-title ">
        {value}
      </div>
    </div>
  );
}

export default ScoreCard;
