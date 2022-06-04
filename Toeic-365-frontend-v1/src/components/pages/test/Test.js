import React from 'react';
import { useState } from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Upload, Button } from 'antd';
import { ACCEPT_FILE_PDF } from '../../../constants/commonConstant';
import { uploadFiles } from '../../../api/firebase';
import UpLoadImage from '../../molecules/UpLoadImage/UpLoadImage';
import ToastConfirmDelete from '../../molecules/ToastConfirmDelete/ToastConfirmDelete';

function MyPdf() {
  const [file, setFile] = useState(null);

  const onBasicUpload = (data) => {
    setFile(data.file);
  };

  const upLoad = () => {
    uploadFiles(file, 'files')
      .then((res) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  };

  return (
    <div>
      <ToastConfirmDelete title={'Bản ghi'} />
    </div>
  );
}
export default MyPdf;
