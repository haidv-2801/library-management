import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import HomeHeaderImg from '../../../../assets/images/thuvien_home.jpg';
import Layout from '../../../sections/User/Layout/Layout';
import CardList from '../../../molecules/CardList/CardList';
import Footer from '../../../sections/User/FooterLib/Footer';
import { InputSwitch } from 'primereact/inputswitch';
import { Carousel } from 'primereact/carousel';
import { BUTTON_TYPE } from '../../../../constants/commonConstant';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import TitleSeparator from '../../../atomics/base/TitleSeparator/TitleSeparator';
import CardItem from '../../../molecules/Card/Card';
// import Carousel from '../../../molecules/Carousel/Carousel';
import './homePage.scss';
import NotificationList from '../../../molecules/NotificationList/NotificationList';
import moment from 'moment';
import DynamicMenu from '../../../molecules/DynamicMenu/DynamicMenu';
import Button from '../../../atomics/base/Button/Button';
import Loading from '../../../atomics/base/Loading/Loading';
import { BUTTON_THEME } from '../../../../constants/commonConstant';
import Input from '../../../atomics/base/Input/Input';
import FilterEngine from '../../../molecules/FilterEngine/FilterEngine';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import BackTop from '../../../molecules/BackTop/BackTop';
let FAKE = [
  {
    id: 'c0d5e47b-b4c0-4f8d-9400-1e08b149c6d9',
    title: 'Mrs',
    subTitle: "Devil's Diary",
    description:
      'NDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTD – Mạng thư viện số luận văn, luận án quốc tế',
    imgSrc: 'https://lic.haui.edu.vn/media/79/t79761.jpg',
  },
  {
    id: '5fcf6022-68ed-4af0-a490-9377945df748',
    title: 'Rev',
    subTitle: 'Godzilla: Final Wars (Gojira: Fainaru uÃ´zu)',
    description: 'OpenDOAR - Danh mục các nguồn tin truy cập mởOpenDOAR',
    imgSrc: 'https://lic.haui.edu.vn/media/79/t79747.jpg',
  },
  {
    id: '3b9b8540-b690-4ef8-aabd-a6e869d0313a',
    title: 'Honorable',
    subTitle: 'French Roast',
    description:
      'Trung tâm Thông tin - Thư viện tổ chức tập huấn công tác xây dựng Bộ sưu tập theo ngành đào tạoTrung tâm Thông tin - Thư viện tổ chức tập huấn công tác xây dựng Bộ sưu tập theo ngành đào tạoTrung tâm Thông tin - Thư viện tổ chức tập huấn công tác xây dựng Bộ sưu tập theo ngành đào tạoTrung tâm Thông tin - Thư viện tổ chức tập huấn công tác xây dựng Bộ sưu tập theo ngành đào tạoTrung tâm Thông tin - Thư viện tổ chức tập huấn công tác xây dựng Bộ sưu tập theo ngành đào tạo',
    imgSrc: 'https://lic.haui.edu.vn/media/78/m78555.jpg',
  },
  {
    id: '094c64e8-a214-457e-aee2-d4e2b4f9962a',
    title: 'Ms',
    subTitle: 'Green Dolphin Street',
    description: 'National Institute of Technology, Trichy',
    imgSrc: 'http://dummyimage.com/249x100.png/dddddd/000000',
  },
];

let FAKE_1 = [
  {
    id: '76e27cc3-6b63-4561-add5-0691a9ff71eb',
    title: 'Financial Advisor',
    date: '2022-01-23 19:02:24',
    description:
      '6516242544963693847057350325418647114783488064203485078535349127282818593615535604209261248806895364622077950302198964033506468234514776315872815841165860258289341',
  },
  {
    id: '66852abe-09a8-4a15-9a1b-ac92d144dfeb',
    title: 'Environmental Tech',
    date: '2021-08-05 06:43:12',
    description:
      '2179183981625722754802305327089035137875331597755925718510147002471177114940767714858458284596610738906241787498672485496568720095458837899912424734558300962211935',
  },
  {
    id: '82a8368c-6dc6-4930-813b-2900b688a252',
    title: 'Human Resources Manager',
    date: '2021-10-26 13:33:49',
    description:
      '9651245772556704569141732767693193920664399082559714645204551162717580218510718308823288164248479179081510112505301002713228993179149947206232989671502566201547214',
  },
  {
    id: '68f3e434-d0f4-4111-bb52-4969bf8e8fec',
    title: 'Technical Writer',
    date: '2021-11-13 16:18:12',
    description:
      '3931297960674866260125900525631983838624381053475553580213736913953696746423452156625636450252375638011106829261176616888575083038025871408758750637393616703537843',
  },
];

HomePage.propTypes = {};

HomePage.defaultProps = {};

function HomePage(props) {
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

  const [isLoading, setIsLoading] = useState(true);
  const [showFilterEngine, setShowFilterEngine] = useState(false);
  const [defaultFilterType, setDefaultFilterType] = useState(0);
  const [commonSearchValue, setCommonSearchValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const itemTemplate = (card) => {
    return (
      <CardItem
        key={card.id}
        title={card?.title}
        subTitle={card?.subTitle}
        imgSrc={card?.imgSrc}
        description={card?.description}
        width={'30em'}
        isLoading={isLoading}
      />
    );
  };

  return (
    <Layout>
      <div className="toe-home-page">
        <div className="toe-home-page__img-banner">
          <h1 className="toe-home-page__img-banner__text">THƯ VIỆN 365</h1>
          {/* <img width={'auto'} height={'auto'} src={HomeHeaderImg} alt="" /> */}
        </div>
        <h4 className="toe-home-page__noti-section">
          <TitleSeparator icon={<SearchOutlined />} title={'Tìm kiếm'} />
        </h4>
        <div className="toe-home-page__img-banner__search">
          <Dropdown
            options={filterTypeOptions}
            defaultValue={defaultFilterType}
            className="toe-home-page__img-banner__search-dropdown-filter"
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
        <div className="toe-home-page__img-banner__search-engine">
          {' '}
          {showFilterEngine ? <FilterEngine /> : null}
        </div>
        <div className="toe-home-page__noti-section">
          <TitleSeparator icon={<BellOutlined />} title={'tin tức'} />
        </div>
        <div className="toe-home-page__news">
          <div className="toe-home-page__news-carousel">
            <Carousel
              value={FAKE}
              numVisible={3}
              numScroll={3}
              itemTemplate={itemTemplate}
              responsiveOptions={responsiveOptions}
            />
          </div>
        </div>
        <div className="toe-home-page__noti-section">
          <TitleSeparator icon={<BellOutlined />} title={'thông báo'} />
        </div>
        <div className="toe-home-page__notificaitons">
          <div className="toe-home-page__notificaitons-left">
            <DynamicMenu />
          </div>
          <div className="toe-home-page__notificaitons-right">
            <NotificationList isLoading={isLoading} data={FAKE_1} />
            <Button
              className="toe-home-page__notificaitons-right__btn-more"
              name={'Xem thêm...'}
              theme={BUTTON_THEME.THEME_4}
            />
          </div>
        </div>

        <div className="toe-home-page__noti-section">
          <TitleSeparator className="" title={'giới thiệu sách mới'} />
        </div>
        <div className="toe-home-page__new-book">
          <CardList isLoading={isLoading} cards={FAKE} />
        </div>
      </div>
      <Footer />
      <Loading show={isLoading} />
    </Layout>
  );
}

export default HomePage;
