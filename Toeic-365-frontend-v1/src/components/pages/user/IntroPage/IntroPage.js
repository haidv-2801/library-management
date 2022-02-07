import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import Layout from '../../../sections/User/Layout/Layout';
import './introPage.scss';

function IntroPage(props) {
  const params = useParams();
  debugger;
  return <Layout>intro</Layout>;
}

export default IntroPage;
