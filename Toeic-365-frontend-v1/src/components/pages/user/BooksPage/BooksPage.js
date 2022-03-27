import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import HotNews from '../../../molecules/HotNews/HotNews';
import Footer from '../../../sections/User/Footer/Footer';
import Layout from '../../../sections/User/Layout/Layout';
import './booksPage.scss';

BooksPage.propTypes = {
  titlePage: PropTypes.string,
};

BooksPage.defaultProps = { titlePage: '' };

function BooksPage(props) {
  const { children, titlePage } = props;

  const params = useParams();

  const createMarkup = () => {
    return {
      __html: `<p><strong>T&iacute;nh đến nay, OpenDOAR cung cấp gần 6000 t&agrave;i liệu, phủ tr&ecirc;n 09 lĩnh vực với 12 loại t&agrave;i liệu, trong đ&oacute; loại b&agrave;i b&aacute;o v&agrave; luận văn, luận &aacute;n chiến tỷ trọng cao nhất.</strong></p>
      <p><a href="https://lic.haui.edu.vn/vn/">Thư viện ĐH C&ocirc;ng nghiệp H&agrave; Nội</a>&nbsp;xin giới thiệu đến bạn đọc nguồn truy cập mở&nbsp;<a href="https://v2.sherpa.ac.uk/opendoar/" target="_blank" rel="noopener">OpenDOAR</a>&nbsp;(Open Directory of Open Access Repositories): Danh mục nguồn tin truy cập mở l&agrave; một trang web c&oacute; trụ sở tại Vương quốc Anh, cung cấp danh s&aacute;ch to&agrave;n diện v&agrave; tin cậy c&aacute;c kho t&agrave;i liệu nội sinh truy cập mở học thuật của c&aacute;c trường đại học, viện nghi&ecirc;n cứu tr&ecirc;n to&agrave;n thế giới. C&aacute;c li&ecirc;n kết tới c&aacute;c kho số nội sinh được đ&aacute;nh gi&aacute; chất lượng trước khi đưa v&agrave;o danh mục n&ecirc;n c&oacute; gi&aacute; trị học thuật cao. OpenDOAR c&ograve;n liệt k&ecirc; v&agrave; cho ph&eacute;p người sử dụng t&igrave;m kiếm c&aacute;c kho số nội sinh theo chủ đề, ng&ocirc;n ngữ, dạng t&agrave;i liệu (như b&agrave;i nghi&ecirc;n cứu, kết quả nghi&ecirc;n cứu, s&aacute;ch, s&aacute;ng chế, luận &aacute;n) hoặc khu vực như Ch&acirc;u Phi, Ch&acirc;u &Aacute;, Australasia, Caribbean, Trung Mỹ, Ch&acirc;u &Acirc;u, Bắc Mỹ v&agrave; Nam Mỹ.</p>
      <p>OpenDOAR được duy tr&igrave; bởi Đại học Nottingham dưới sự bảo trợ của SHERPA về c&aacute;c dịch vụ v&agrave; được triển khai v&agrave;o năm 2005 với sự hợp t&aacute;c của Đại học Lund. Dự &aacute;n được t&agrave;i trợ bởi Viện Khoa học Mở, Jisc, Hiệp hội c&aacute;c Thư viện Nghi&ecirc;n cứu (CURL) v&agrave; SPARC Ch&acirc;u &Acirc;u.</p>
      <p>T&iacute;nh đến nay,&nbsp;<a href="https://v2.sherpa.ac.uk/opendoar/" target="_blank" rel="noopener">OpenDOAR</a>&nbsp;cung cấp gần 6000 t&agrave;i liệu, phủ tr&ecirc;n 09 lĩnh vực với 12 loại t&agrave;i liệu, trong đ&oacute; loại b&agrave;i b&aacute;o v&agrave; luận văn, luận &aacute;n chiến tỷ trọng cao nhất.</p>
      <p>Để truy cập v&agrave;o OpenDOAR, bạn đọc thực hiện như sau:</p>
      <p>Bước 1: Truy cập v&agrave;o đường dẫn sau:&nbsp;<a href="https://v2.sherpa.ac.uk/opendoar/" target="_blank" rel="noopener">https://v2.sherpa.ac.uk/opendoar/</a></p>
      <p>Bước 2: Bấm v&agrave;o mục Directory</p>
      <p>Bước 3: Nhập th&ocirc;ng tin cần t&igrave;m kiếm</p>
      <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://images.unsplash.com/photo-1647873134223-e4c648d1456b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=764&amp;q=80" alt="" width="auto" height="auto" /></p>
      <p>Tại đ&acirc;y c&oacute; hai chế độ t&igrave;m kiếm:&nbsp;<strong>T&igrave;m kiếm cơ bản</strong>&nbsp;v&agrave;&nbsp;<strong>T&igrave;m kiếm n&acirc;ng cao</strong>. Với chế độ t&igrave;m kiếm n&acirc;ng cao bạn đọc c&oacute; thể giới hạn, chỉ định c&aacute;c v&ugrave;ng t&igrave;m kiếm theo từng ti&ecirc;u ch&iacute;.</p>
      <p>&nbsp;</p>`,
    };
  };

  return (
    <Layout>
      <div className="toe-book-page">
        <div className="toe-book-page__body-wrapper">
          <div className="toe-book-page__body">Mượn trả tài liệu</div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default BooksPage;
