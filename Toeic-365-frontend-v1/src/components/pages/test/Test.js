import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { buildClass } from '../../../constants/commonFunction';
import DatePicker from '../../atomics/base/DatePicker/DatePicker';
import Message from '../../atomics/base/Message/Message';
import GoogleMiniMap from '../../molecules/GoogleMiniMap/GoogleMiniMap';

function MyPdf() {
  return (
    <div>
      <GoogleMiniMap />
    </div>
  );
}
export default MyPdf;
