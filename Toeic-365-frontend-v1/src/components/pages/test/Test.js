import React from 'react';
import { useState } from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Upload, Button } from 'antd';
import { ACCEPT_FILE_PDF } from '../../../constants/commonConstant';
import { uploadFiles } from '../../../api/firebase';
import UpLoadImage from '../../molecules/UpLoadImage/UpLoadImage';

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
      <Upload multiple={false} onChange={onBasicUpload} accept={'*'}>
        <Button>Click to choose file</Button>
      </Upload>
      <Button onClick={upLoad}>Upload</Button>
      <UpLoadImage
        onChange={(res) => {
          setFile(res);
        }}
      />
    </div>
  );
}
export default MyPdf;
