import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { buildClass } from '../../../../constants/commonFunction';
import Layout from '../../../sections/User/Layout/Layout';
import Footer from '../../../sections/User/Footer/Footer';
import baseApi from '../../../../api/baseApi';
import { message } from 'antd';
import END_POINT from '../../../../constants/endpoint';
import './bootstrap.min.scoped.css';
import './bootstrap';
import './TestOnline.scoped.css';
import './examPage.scss';

ExamPage.propTypes = {};

ExamPage.defaultProps = {};

function ExamPage(props) {
  const [exam, setExam] = useState([
    {
      id: 2,
      examName: 'ETS 2021 - Test 1',
      totalTime: '2021-04-19T19:00:00.000+00:00',
    },
    {
      id: 42,
      examName: 'ETS 2021 - Test 2',
      totalTime: '2021-04-22T19:00:00.000+00:00',
    },
    {
      id: 43,
      examName: 'ETS 2021 - Test 3',
      totalTime: '2021-04-22T19:00:00.000+00:00',
    },
    {
      id: 44,
      examName: 'ETS 2021 - Test 4',
      totalTime: '2021-04-22T19:00:00.000+00:00',
    },
  ]);

  useEffect(() => {}, []);

  const handleGetExamIntro = (id) => {
    //call api lấy intro
    console.log(id);
    const params = { id };
    baseApi.get(
      (res) => {
        debugger;
      },
      (err) => {
        message.error('Có lỗi xảy ra!');
      },
      () => {},
      END_POINT.TOE_GET_EXAM_INTRO,
      params
    );
  };

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
          <div className="section-toeic-test mt-5">
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
            <div className="row">
              {exam && exam.length ? (
                exam.map((element, index) => {
                  return (
                    <div className="col-sm-3" key={element.id}>
                      <div className="toeic-item toeic-item-1">
                        <Link to={`intro/${element.id}`} className="link-wrap">
                          {/* <div
                          className="link-wrap"
                          onClick={() => handleGetExamIntro(element.id)}
                        > */}
                          <div className="image image-center">
                            <img
                              src="https://toeicexamstore.com/website/assets/img/bg_thi_toeic.png"
                              alt=""
                            />
                            <div className="centered">0{index + 1}</div>
                          </div>
                          <div className="content">
                            <h3 className="item-title">{element.examName}</h3>
                          </div>
                          {/* </div> */}
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>Không có dữ liệu hiển thị</span>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default ExamPage;
