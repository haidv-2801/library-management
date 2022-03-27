import { EyeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
  PATH_NAME,
  POST_TYPE,
  TEXT_FALL_BACK,
} from '../../../../constants/commonConstant';
import { buildClass, slugify } from '../../../../constants/commonFunction';
import Button from '../../../atomics/base/Button/Button';
import Input from '../../../atomics/base/Input/Input';
import TextAreaBase from '../../../atomics/base/TextArea/TextArea';
import Dropdown from '../../../molecules/Dropdown/Dropdown';
import Editor from '../../../molecules/Editor/Editor';
import Layout from '../../../sections/Admin/Layout/Layout';
import './htmlContentCreatingPage.scss';

HtmlContentCreatingPage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

HtmlContentCreatingPage.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function HtmlContentCreatingPage(props) {
  const { id, style, className } = props;
  const POST_TYPES = [
    { label: 'Tin tức', value: POST_TYPE.NEWS },
    { label: 'Thông báo', value: POST_TYPE.NOTIFICATION },
    { label: 'Giới thiệu sách', value: POST_TYPE.ABOUT_THE_BOOK },
  ];

  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState('');
  const [defaultHtmlContent, setDefaultHtmlContent] =
    useState('Type some text...');
  const [data, setData] = useState({
    title: '',
    slug: '',
    postType: '',
    htmlContent: '',
  });

  return (
    <Layout
      title="Thêm mới bài đăng"
      hasBackBtn={true}
      back={() => navigate(PATH_NAME.ADMIN_POST_PAGE)}
      rightButtons={[
        <Tooltip title={'Xem trước'}>
          <EyeOutlined />
        </Tooltip>,
        <Tooltip title={'Xóa trắng thông tin của các trường'}>
          <div>
            <Button
              type={BUTTON_TYPE.LEFT_ICON}
              leftIcon={<RetweetOutlined />}
              name={'Làm mới'}
              theme={BUTTON_THEME.THEME_6}
              onClick={() => {}}
            />
          </div>
        </Tooltip>,
        <Button onClick={() => {}} name="Lưu bài viết" />,
      ]}
    >
      <div
        id={id}
        style={style}
        className={buildClass(['toe-admin-create-post-page', className])}
      >
        <div className="toe-admin-create-post-page__row">
          <span className="toe-font-label">
            Loại<span style={{ color: 'red' }}>*</span>
          </span>
          <Dropdown options={POST_TYPES} />
        </div>
        <div className="toe-admin-create-post-page__row">
          <Input
            label={'Tiêu đề'}
            placeholder="Tiêu đề bài đăng..."
            bottomMessage="Trường bắt buộc nhập"
            valid={true}
            hasRequiredLabel
            onChange={(e) =>
              setData((pre) => ({
                ...pre,
                title: e.target.value,
                slug: slugify(e.target.value),
              }))
            }
            maxLength={255}
          />
          <div className="toe-admin-create-post-page__row-slug toe-font-label">
            Slug: {data.slug || TEXT_FALL_BACK.TYPE_1}
          </div>
        </div>
        <div className="toe-admin-create-post-page__row">
          <span className="toe-font-label">
            Tóm tắt<span style={{ color: 'red' }}>*</span>
          </span>
          <TextAreaBase placeholder="Tóm tắt nội dung..." />
        </div>
        <div className="toe-admin-create-post-page__row">
          <Editor
            label={'Nội dung'}
            defaultContent={defaultHtmlContent}
            onContentChange={(data) => {
              setHtmlContent(data);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HtmlContentCreatingPage;
