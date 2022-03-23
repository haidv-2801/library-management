import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../constants/commonFunction';
import { BellOutlined } from '@ant-design/icons';
import { BreadCrumb } from 'primereact/breadcrumb';
import './banner.scss';

Banner.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.any,
  icon: PropTypes.any,
  breadCrumbs: PropTypes.array,
};

Banner.defaultProps = {
  id: '',
  className: '',
  style: {},
  title: '',
  icon: null,
  breadCrumbs: [],
};

function Banner(props) {
  const { id, style, className, title, icon, breadCrumbs } = props;
  const navigate = useNavigate();

  const home = {
    icon: 'pi pi-home',
    url: 'https://www.primefaces.org/primereact/showcase',
  };

  console.log(process.env.DEVELOPMENT_DOMAIN);

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-banner', 'toe-font-body', className])}
    >
      <div className="toe-banner__content">
        <div className="toe-banner__content-title">{title}</div>
        <div className="toe-banner__content-icon">{icon}</div>
        <div className="toe-banner__content-breadcrumb">
          <BreadCrumb
            className="toe-banner__breadcrumb toe-font-body"
            model={breadCrumbs}
            home={home}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
