import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import { BellOutlined } from '@ant-design/icons';
import Layout from '../../../sections/User/Layout/Layout';
import Footer from '../../../sections/User/Footer/Footer';
import Banner from '../../../molecules/Banner/Banner';
import CommonItem from '../../../molecules/CommonItem/CommonItem';
import './commonListItemPage.scss';
import HotNews from '../../../molecules/HotNews/HotNews';
import Paginator from '../../../molecules/Paginator/Paginator';

CommonListItemPage.propTypes = {
  titlePage: PropTypes.string,
};

CommonListItemPage.defaultProps = { titlePage: '' };

function CommonListItemPage(props) {
  const { children, titlePage } = props;

  const [pageI, setPageI] = useState({ page: 1, pageSize: 20, total: 100 });

  const renderCommonItems = () => {
    const arr = Array.from(Array(10).keys());

    return arr.map((item) => (
      <CommonItem
        title={
          'NDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTDNDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTDNDLTDNDLTD – Mạng thư viện số luận văn, luận án quốc tếNDLTDNDLTD – Mạng thư viện số luận văn'
        }
        description={
          'Với NDLTD bạn đọc sẽ được truy cập hơn 6.200.000 tài liệu là luận văn, luận án của gần 100 trường đại học thành viên từ Hoa Kỳ, Canada, Ấn Độ, Nhật Bản, bạn đọc sẽ được truy cập hơn 6.200.000 tài liệu là luận văn, luận án của gần 100 trường đại học thành viên từ Hoa Kỳ Pháp…Với NDLTD bạn đọc sẽ được truy cập hơn 6.200.000 tài liệu là luận văn, luận án của gần 100 trường đại học thành viên từ Hoa Kỳ, Canada, Ấn Độ, Nhật Bản, bạn đọc sẽ được truy cập hơn 6.200.000 tài liệu là luận văn, luận án của gần 100 trường đại học thành viên từ Hoa Kỳ Pháp…'
        }
        date={Date.now()}
      />
    ));
  };

  return (
    <Layout>
      <div className="toe-common-list-item-page">
        <div className="toe-common-list-item-page__banner">
          <Banner
            breadCrumbs={[{ label: titlePage }]}
            title={titlePage}
            icon={<BellOutlined />}
          />
        </div>
        <div className="toe-common-list-item-page__body-wrapper">
          <div className="toe-common-list-item-page__body">
            <div className="toe-common-list-item-page__body-left">
              {renderCommonItems()}
            </div>
            <div className="toe-common-list-item-page__body-right">
              <HotNews />
            </div>
          </div>
          <Paginator
            className="toe-common-list-item-page__paginator"
            onChange={(data) => {
              setPageI({ ...pageI, ...data });
            }}
            totalRecords={pageI.total}
            page={pageI.page}
            pageSize={pageI.pageSize}
          />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default CommonListItemPage;
