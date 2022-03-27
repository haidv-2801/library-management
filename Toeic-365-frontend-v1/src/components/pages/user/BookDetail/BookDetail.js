import { Chip } from 'primereact/chip';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  BOOK_FORMAT,
  BUTTON_SHAPE,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';
import Button from '../../../atomics/base/Button/Button';
import Book from '../../../molecules/Book/Book';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './bookDetail.scss';

BookDetail.propTypes = {
  titlePage: PropTypes.string,
};

BookDetail.defaultProps = { titlePage: '' };

function BookDetail(props) {
  const { children, titlePage } = props;

  const params = useParams();

  return (
    <Layout>
      <div className="toe-book-page">
        <div className="toe-book-page__body-wrapper">
          <div className="toe-book-page__body">
            <div className="toe-book-page__body-main"></div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default BookDetail;
