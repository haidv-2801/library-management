import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function MyPdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <iframe
        allowFullScreen={true}
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
        frameBorder="0"
        scrolling="auto"
      ></iframe>
    </div>
  );
}
export default MyPdf;
