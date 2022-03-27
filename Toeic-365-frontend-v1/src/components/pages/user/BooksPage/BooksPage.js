import { Chip } from 'primereact/chip';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  BOOK_FORMAT,
  BUTTON_SHAPE,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';
import Button from '../../../atomics/base/Button/Button';
import Input from '../../../atomics/base/Input/Input';
import Banner from '../../../molecules/Banner/Banner';
import Book from '../../../molecules/Book/Book';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import FilterEngine from '../../../molecules/FilterEngine/FilterEngine';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import { SearchOutlined } from '@ant-design/icons';
import './booksPage.scss';

BooksPage.propTypes = {
  titlePage: PropTypes.string,
};

BooksPage.defaultProps = { titlePage: '' };

function BooksPage(props) {
  const { children, titlePage } = props;
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
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
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

  const [isLoading, setIsLoading] = useState(false);
  const [showFilterEngine, setShowFilterEngine] = useState(false);
  const [defaultFilterType, setDefaultFilterType] = useState(0);
  const [commonSearchValue, setCommonSearchValue] = useState('');

  const fake = Array.from(Array(8).keys()).map((item, _) => (
    <Book
      key={_}
      className="toe-book-page__body-content__book"
      bookTitle="Lập dự án kinh doanh và triển khai sản xuất đơn hàng áo Măng tô nữ trong sản xuất may công nghiệp"
      bookAuthor="Nguyễn Thị Thảo"
      bookType={BOOK_FORMAT.EBOOK}
      onClick={() => {
        navigate('id=2342');
      }}
    />
  ));

  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderSection = (title) => {
    return (
      <div className="toe-book-page__body-section">
        <div className="toe-book-page__body-type toe-font-title">{title}</div>
        <div className="toe-book-page__body-content">{fake}</div>
        <div className="toe-book-page__body-btn">
          <Button
            shape={BUTTON_SHAPE.NORMAL}
            type={BUTTON_TYPE.RIGHT_ICON}
            rightIcon={<Chip label="9548" />}
            onClick={() => {
              navigate('itme-type');
            }}
            name={'Xem tất cả'}
          />
        </div>
      </div>
    );
  };

  const renderReport = (title) => {
    return (
      <div className="toe-book-page__body-section">
        <div className="toe-book-page__body-type toe-font-title">{title}</div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="toe-book-page">
        <Banner breadCrumbs={[{ label: 'mượn trả tài liệu', url: pathname }]} />
        <div className="toe-book-page__body-wrapper">
          <div className="toe-book-page__body">
            <div className="toe-book-page__body-main">
              <div
                className="toe-book-page__body-type toe-font-title"
                style={{ marginBottom: 8 }}
              >
                Tìm kiếm
              </div>
              <div className="toe-book-page__search">
                <Dropdown
                  options={filterTypeOptions}
                  defaultValue={defaultFilterType}
                  className="toe-book-page__search-dropdown-filter"
                />
                <Input
                  autoFocus
                  onChange={(e) => setCommonSearchValue(e.target.value)}
                  placeholder={'Tìm kiếm sách, tin tức, thông báo, tài liệu...'}
                />
                {!showFilterEngine ? (
                  <Button
                    type={BUTTON_TYPE.LEFT_ICON}
                    leftIcon={<SearchOutlined />}
                    name={'Tìm kiếm'}
                    disabled={!commonSearchValue}
                    onClick={() => {}}
                  />
                ) : null}
                <div>
                  {showFilterEngine
                    ? 'Tắt bộ lọc nâng cao'
                    : 'Hiển thị bộ học nâng cao'}
                </div>
                <InputSwitch
                  checked={showFilterEngine}
                  onChange={(e) => setShowFilterEngine(e.value)}
                />
              </div>
              <div className="toe-book-page__search-engine">
                {' '}
                {showFilterEngine ? <FilterEngine /> : null}
              </div>
              {renderSection('Tài liệu mới')}
              {renderSection('Tài liệu mượn nhiều')}
              {renderSection('Tài liệu số mới')}
              {renderSection('Tài liệu số mượn nhiều')}
              {renderReport('Thống kê')}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default BooksPage;
