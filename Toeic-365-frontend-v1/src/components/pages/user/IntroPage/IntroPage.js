import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import { message } from 'antd';
import MainLogo from '../../../../assets/images/toeiclogo.png';
import Avatar from '../../../../assets/images/me.jpg';
import useWindowResize from '../../../../hooks/useWindowResize';
import baseApi from '../../../../api/baseApi';
import END_POINT from '../../../../constants/endpoint';
import Layout from '../../../sections/User/Layout/Layout';
import Button from '../../../atomics/base/Button/Button';
import Modal from '../../../atomics/base/Modal/Modal';
import { Skeleton } from 'antd';
import { BUTTON_THEME } from '../../../../constants/commonConstant';
import Countdown from 'react-countdown';
import './bootstrap-3.min.scoped.css';
import './IntroExam.scoped.css';
import './IntroExamCustom.scoped.css';
import './introPage.scss';

function IntroPage(props) {
  const params = useParams();
  const [exam, setExam] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExamDetail, setIsLoadingExamDetail] = useState(false);
  const [isInTesting, setIsInTesting] = useState(false);
  const [isShowModalComfirm, setIsShowModalComfirm] = useState(false);

  useEffect(() => {
    handleGetExamIntro();
  }, [params.id]);

  const handleGetExamIntro = () => {
    baseApi.get(
      (res) => {
        setExam(res);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        message.error('Có lỗi xảy ra!');
      },
      () => {
        setIsLoading(true);
      },
      END_POINT.TOE_GET_EXAM_INTRO,
      params
    );
  };

  const handleStartExam = (e) => {
    setIsShowModalComfirm(true);
  };

  const handleJoinTest = () => {
    baseApi.get(
      (res) => {
        setIsInTesting(true);
        debugger;
        setIsLoadingExamDetail(false);
      },
      (err) => {
        setIsInTesting(false);
        setIsLoadingExamDetail(false);
        message.error('Có lỗi xảy ra!');
      },
      () => {
        setIsInTesting(false);
        setIsLoadingExamDetail(true);
      },
      END_POINT.TOE_GET_EXAM_DETAIL,
      params
    );
  };

  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist></Completionist>;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const renderIntro = () => {
    return (
      <section
        id="quizz-intro-section"
        className={buildClass([
          'quizz-intro-section learn-section',
          'toe-intro-page',
        ])}
        style={{ minHeight: '650px' }}
      >
        <div className="container">
          <div className="question-content-wrap">
            <div className="row">
              <div className="col-md-12 col-sm-12 exam-content">
                <div
                  className="question-content intro-content"
                  style={{
                    height: 'auto !important',
                    minHeight: '0px !important',
                  }}
                >
                  <div
                    className="exam-info"
                    style={{ height: 'auto !important' }}
                  >
                    <h4 className="sm">
                      {isLoading ? (
                        <Skeleton.Input
                          style={{ width: 270, height: 35 }}
                          active
                        />
                      ) : exam ? (
                        <b>{exam.examName}</b>
                      ) : (
                        <></>
                      )}
                    </h4>
                    <br />
                    <p className="total-time-info">
                      {isLoading ? (
                        <Skeleton.Input
                          style={{ width: 300, height: 30 }}
                          active
                        />
                      ) : (
                        <b>Tổng thời gian: 120 phút</b>
                      )}
                    </p>
                    <p>
                      {isLoading ? (
                        <Skeleton.Input
                          style={{ width: 200, height: 30 }}
                          active
                        />
                      ) : (
                        <>
                          <svg
                            width="13px"
                            height="13px"
                            viewBox="0 0 16 16"
                            className="bi bi-circle-fill"
                            fill="#3ABF7C"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx={8} cy={8} r={8} />
                          </svg>
                          <b>Nghe: 45 phút</b>
                        </>
                      )}
                    </p>
                    <p>
                      {isLoading ? (
                        <Skeleton.Input
                          style={{ width: 200, height: 30 }}
                          active
                        />
                      ) : (
                        <>
                          <svg
                            width="13px"
                            height="13px"
                            viewBox="0 0 16 16"
                            className="bi bi-circle-fill"
                            fill="#3ABF7C"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx={8} cy={8} r={8} />
                          </svg>
                          <b>Đọc: 75 phút</b>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-center btn-start">
                    {exam ? (
                      <Link
                        to="#"
                        onClick={handleStartExam}
                        className="btn-start mc-btn btn-style-6"
                      >
                        <b>START</b>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isShowModalComfirm && (
          <Modal
            className="toe-modal-confirm"
            title={'Bạn đã sẵn sàng?'}
            onClose={() => setIsShowModalComfirm(false)}
            footerRight={[
              <Button
                theme={BUTTON_THEME.THEME_6}
                onClick={() => setIsShowModalComfirm(false)}
                name="Hủy"
              />,
              <Button
                theme={BUTTON_THEME.THEME_5}
                onClick={handleJoinTest}
                name="Vào thi"
              />,
            ]}
          >
            <div>
              Thời gian còn lại{' '}
              <i class="pi pi-clock" style={{ fontSize: '1.2rem' }} />{' '}
              <b>2:00:00</b>
            </div>
            <p>Trong quá trình thi sẽ không thể tạm dừng.</p>
          </Modal>
        )}
      </section>
    );
  };

  const renderTesting = () => {
    return (
      <Countdown
        onPause={(e) => {}}
        date={Date.now() + 3600 * 1000}
        renderer={renderer}
      />
    );
  };

  return (
    <Layout
      showNav={false}
      bodyClass={buildClass([
        'toe-intro-page',
        isInTesting && 'toe-in-testing',
      ])}
    >
      {!isInTesting ? renderIntro() : renderTesting()}
    </Layout>
  );
}

export default IntroPage;
