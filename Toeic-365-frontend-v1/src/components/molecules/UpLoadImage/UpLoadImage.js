// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // import 'antd/dist/antd.css';
// import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './upLoadImage.scss';

// UpLoadImage.propTypes = {
//   id: PropTypes.string,
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onLoading: PropTypes.func,
// };

// UpLoadImage.defaultProps = {
//   id: '',
//   className: '',
//   style: {},
//   onLoading: () => {},
// };

// function UpLoadImage(props) {
//   const { id, style, className, onLoading } = props;

//   const [isLoading, setIsLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [fileList, setFileList] = useState([]);

//   useEffect(() => {
//     onLoading && onLoading(isLoading);
//   }, [isLoading]);

//   const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     console.log(img);
//     reader.readAsDataURL(img);
//   };

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('Chỉ hỗ trợ JPG/PNG!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Ảnh phải nhỏ hơn 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   };

//   const handleChange = (info) => {
//     debugger;
//     setFileList(info.file.originFileObj);
//     console.log(info.file.originFileObj);
//     if (info.file.status === 'uploading') {
//       setIsLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj, (imageUrl) => {
//         setImageUrl(imageUrl);
//         setIsLoading(false);
//       });
//     }

//     // if (info.file.status === 'error') {
//     //   setIsLoading(false);
//     //   message.error('Có lỗi xảy ra!');
//     // }
//   };

//   const uploadButton = (
//     <div>
//       {isLoading ? (
//         <>
//           <LoadingOutlined /> <div style={{ marginTop: 8 }}>Đang thêm...</div>
//         </>
//       ) : (
//         <>
//           <PlusOutlined />
//           <div style={{ marginTop: 8 }}>Thêm ảnh</div>
//         </>
//       )}
//     </div>
//   );

//   return (
//     <Upload
//       name="avatar"
//       listType="picture-card"
//       className="avatar-uploader"
//       // action={'../../../assets/images/upload'}
//       showUploadList={false}
//       defaultFileList={fileList}
//       show
//       maxCount={1}
//       multiple={false}
//       action="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//       beforeUpload={beforeUpload}
//       onChange={handleChange}
//     >
//       {imageUrl ? (
//         <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
//       ) : (
//         uploadButton
//       )}
//     </Upload>
//   );
// }

// export default UpLoadImage;

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import './upLoadImage.scss';

UpLoadImage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
};

UpLoadImage.defaultProps = {
  id: '',
  className: '',
  style: {},
  onChange: () => {},
  defaultValue: null,
};

function UpLoadImage(props) {
  const { id, style, className, onChange, defaultValue } = props;

  const imgRef = useRef(null);
  const [image, setImage] = useState(defaultValue);

  useEffect(() => {
    let test = document.getElementById('image')?.value;
  }, [image]);

  const onImageChange = (event) => {
    debugger;
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      console.log(URL.createObjectURL(img));
      onChange && onChange(URL.createObjectURL(img));
    }
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-upload toe-font-body', className])}
    >
      <div className="toe-upload__img-wrapper">
        {image ? <img ref={imgRef} src={image} /> : null}
        {!image ? <i className="pi pi-user" /> : null}
      </div>
      <input
        type="file"
        name="myImage"
        id="image"
        // value={defaultValue}
        onChange={onImageChange}
      />
    </div>
  );
}

export default UpLoadImage;
