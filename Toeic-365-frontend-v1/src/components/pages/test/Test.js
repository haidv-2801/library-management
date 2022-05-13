import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import Message from '../../atomics/base/Message/Message';

function MyPdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Message title={'test title'} />
    </div>
  );
}
export default MyPdf;
