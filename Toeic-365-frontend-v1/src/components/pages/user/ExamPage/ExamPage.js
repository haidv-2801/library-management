import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import Layout from '../../../sections/User/Layout/Layout';
import Footer from '../../../sections/User/Footer/Footer';
import { message } from 'antd';
import { appAction } from '../../../../redux/slices/appSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../../contexts/authContext';
import baseApi from '../../../../api/baseApi';
import END_POINT from '../../../../constants/endpoint';
import './bootstrap.min.scoped.css';
import './bootstrap';
import './TestOnline.scoped.css';

import './examPage.scss';
import SmartText from '../../../atomics/base/SmartText/SmartText';
import ExamItem from '../../../molecules/ExamItem/ExamItem';
import Button from '../../../atomics/base/Button/Button';
import Spinner from '../../../atomics/base/Spinner/Spinner';

ExamPage.propTypes = {};

ExamPage.defaultProps = {};
const fake = [
  {
    id: '2b691819-7c7f-4d2c-bca8-70e17fecc73f',
    examName: 'Rubus meracus L.H. Bailey',
    totalTime: '05/29/2021',
  },
  {
    id: '64c53105-bc18-4903-bc31-0ed05cdbd8ae',
    examName: 'Vitis girdiana Munson',
    totalTime: '09/04/2021',
  },
  {
    id: '485a335e-4bf0-47b3-b521-63b11199d20a',
    examName: 'Cynara L.',
    totalTime: '04/28/2021',
  },
  {
    id: '4deccba1-f7be-4269-8e2b-8120d9b90ec5',
    examName: 'Eucalyptus spathulata Hook.',
    totalTime: '05/22/2021',
  },
  {
    id: '71532894-6adc-4915-9da5-be3478bfb313',
    examName:
      'Chamaesyce multiformis (Gaudich. ex Hook. & Arn.) Croizat & O. Deg. var. multiformis',
    totalTime: '02/16/2021',
  },
  {
    id: 'd5127f56-da9c-4b0d-b402-db2eebb855f8',
    examName: 'Damasonium Hill',
    totalTime: '05/12/2021',
  },
  {
    id: 'e0998b14-5f52-435f-8e55-2e33fdc29ad1',
    examName: 'Polychidium (Ach.) A. Gray',
    totalTime: '06/19/2021',
  },
  {
    id: '2e4a34d9-baf4-4170-8c70-05033c64682b',
    examName: 'Vulpia octoflora (Walter) Rydb. var. glauca (Nutt.) Fernald',
    totalTime: '10/08/2021',
  },
  {
    id: '639b3a6b-a587-47ff-9f82-64e5db2f3a79',
    examName: 'Anoda crenatiflora Ortega',
    totalTime: '03/14/2021',
  },
  {
    id: '58ea5348-5b2f-4ed2-bd81-860641806e1a',
    examName: 'Eleocharis tuberculosa (Michx.) Roem. & Schult.',
    totalTime: '05/12/2021',
  },
  {
    id: '2cf22b97-e205-4df7-8656-7169d8a64bd0',
    examName: 'Xanthosoma undipes (K. Koch) K. Koch',
    totalTime: '11/04/2021',
  },
  {
    id: 'c7bc906d-a439-46f3-ae0e-cf84249ccf42',
    examName: 'Eschscholzia papastillii Still',
    totalTime: '02/23/2021',
  },
  {
    id: '2115d5e4-8484-41c6-b8f2-44516789dca4',
    examName: 'Ageratum corymbosum Zuccagni ex Pers.',
    totalTime: '10/22/2021',
  },
  {
    id: 'c6abdcdf-f963-4276-a14b-34f9eaa7352c',
    examName: 'Asplenium polyodon G. Forst. var. nitidulum (Skottsb.) Morton',
    totalTime: '06/18/2021',
  },
  {
    id: '1c7702a9-bfcd-4846-a9a4-89193e7dda86',
    examName: 'Aeschynomene sensitiva Sw. var. sensitiva',
    totalTime: '08/11/2021',
  },
  {
    id: '49717ee4-ae61-442a-a123-c3213b0a11f5',
    examName: 'Arnica chamissonis Less. ssp. chamissonis',
    totalTime: '04/28/2021',
  },
  {
    id: '66133983-4bfa-4346-a6ea-029a28e9c3ea',
    examName: 'Astragalus pulsiferae A. Gray var. pulsiferae',
    totalTime: '04/25/2021',
  },
  {
    id: 'c76a2ac1-9667-439f-bb8b-8426ce9e21d9',
    examName: 'Elymus virginicus L.',
    totalTime: '02/14/2021',
  },
  {
    id: '5bdb91fd-3112-42c9-afa2-d72051f47ac1',
    examName: 'Arctostaphylos glauca Lindl.',
    totalTime: '05/26/2021',
  },
  {
    id: '956008e6-dea5-47be-b4ab-fc542017c369',
    examName: 'Pinus oocarpa Schiede ex Schltdl.',
    totalTime: '02/23/2021',
  },
];
function ExamPage(props) {
  const [exam, setExam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    callApiGetExams();
  }, []);

  const callApiGetExams = () => {
    let _exams = fake.filter((item) => item.examName);
    setExam(_exams);
    // baseApi.get(
    //   (res) => {
    //     let _exams = res.filter((item) => item.examName);
    //     // _exams = fake;
    //     setExam(_exams);
    //     // setExam(_exams.slice(-5));
    //     setIsLoading(false);
    //   },
    //   (err) => {
    //     console.error('[ERROR] Lỗi lấy danh sách bài test: ', err);
    //     message.error('Có lỗi xảy ra!', 3);
    //     setIsLoading(false);
    //   },
    //   () => {
    //     setIsLoading(true);
    //   },
    //   END_POINT.TOE_GET_EXAMS
    // );
  };

  const handleSeeMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setExam([...exam, ...fake]);
    }, 1000);
  };
  const handleOpenIntro = (id) => {};

  return (
    <Layout>
      <div className="toe-exam-page">
        <div className="container layout-main">
          <div className="row page-title">
            <div className="col-sm-12">
              <h2 className="home-t">
                Free TOEIC <br /> Practice Tests
              </h2>
            </div>
          </div>
          <div className="section-toeic-test mt-5 toe-test-list">
            <div className="row">
              <div className="testfullwrap">
                <div className="testfullwrapinner testfullwrap_one">
                  <span className="testfullonetwo testfull-one">TEST FULL</span>
                  <span className="testfullonetwo testfull-two">
                    LISTEN + READING
                  </span>
                </div>
                <div className="testfullwrapinner testfullwrap_two">
                  <span className="testfullonetwo testfull-one">
                    KIỂM TRA ĐẦY ĐỦ
                  </span>
                  <span className="testfullonetwo testfull-two">
                    NGHE + ĐỌC
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="toe-exam-wrapper">
              {exam && exam.length ? (
                exam.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <ExamItem
                        examNumber={index + 1}
                        examLabel={item.examName}
                        onClick={() => handleOpenIntro(item.id)}
                      />
                    </div>
                  );
                })
              ) : (
                <span>Không có dữ liệu hiển thị</span>
              )}
            </div>
            <div className="button-see-more">
              {!isLoadingMore ? (
                <Button name={'Xem thêm...'} onClick={handleSeeMore} />
              ) : null}

              <Spinner size={40} show={isLoadingMore} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default ExamPage;
