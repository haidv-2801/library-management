import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import './pdfDist.scss';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const defaultUrl = '../../../components/pages/test/test.pdf';

const PdfDist = ({ src = defaultUrl }) => {
  const [pdf, setPDF] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef();

  const renderPage = useCallback(async ({ pdfDoc, pageNum, scale }) => {
    const page = await pdfDoc.getPage(pageNum);

    const ctx = canvasRef.current.getContext('2d');

    const viewport = page.getViewport({ scale });

    canvasRef.current.width = viewport.width;
    canvasRef.current.height = viewport.height;

    page.render({
      canvasContext: ctx,
      viewport: viewport,
    });
  }, []);

  const prevPage = () => {
    if (currentPage > 1) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage - 1, scale });
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage + 1, scale });
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomOut = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale - 0.1 });
    setScale(scale - 0.1);
  };

  const zoomIn = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale + 0.1 });
    setScale(scale + 0.1);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(src);

        const pdfDoc = await loadingTask.promise;

        setPDF(pdfDoc);

        setNumPages(pdfDoc._pdfInfo.numPages);

        renderPage({ pdfDoc, pageNum: 1, scale: 1 });

        setLoaded(true);
      } catch (error) {
        throw error;
      }
    };

    fetchPdf();
  }, [renderPage, src]);

  return (
    <div className="container">
      {loaded ? (
        <div className="menu-bar">
          <div className="title">Eloquent JavaScript</div>
          <button>
            <i className="gg-play-track-prev" onClick={prevPage}></i>
          </button>
          <button>
            <i className="gg-play-track-next" onClick={nextPage}></i>
          </button>
          <div className="pagination">
            Trang {currentPage} / {numPages}
          </div>
          <i className="gg-zoom-in" onClick={zoomIn} />
          <i className="gg-zoom-out" onClick={zoomOut} />
        </div>
      ) : (
        <h2 style={{ color: '#fff', textAlign: 'center', fontSize: '40px' }}>
          Loading...
        </h2>
      )}
      <div className="canvas-container">
        <div>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default PdfDist;
