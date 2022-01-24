import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import Layout from '../../../sections/User/Layout/Layout';
import './examPage.scss';

ExamPage.propTypes = {};

ExamPage.defaultProps = {};

function ExamPage(props) {
  return <Layout>exam</Layout>;
}

export default ExamPage;
