import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { buildClass } from '../../../constants/commonFunction';
import DatePicker from '../../atomics/base/DatePicker/DatePicker';
import Message from '../../atomics/base/Message/Message';

function MyPdf() {
  return (
    <div>
      <DatePicker
        // defaultValue={new Date(Date.now())}
        className={buildClass(['toe-font-body toe-date-picker'])}
      />
    </div>
  );
}
export default MyPdf;
