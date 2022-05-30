import { useState } from 'react';

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfDist() {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState('');

  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let blob = new Blob();
        let arrbf = await blob.arrayBuffer(
          'https://firebasestorage.googleapis.com/v0/b/fir-library-upload.appspot.com/o/files%2FLiving%20in%20the%20Light_%20A%20guide%20to%20personal%20transformation%20(%20PDFDrive%20).pdf_221810_29052022?alt=media&token=f4c2fe7f-edd3-49a6-ad8d-f7a275a085db'
        );
        let reader = new FileReader();
        reader.readAsArrayBuffer(arrbf);
        reader.onloadend = (e) => {
          setPdfError('');
          debugger;
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    } else {
      console.log('please select a PDF');
    }
  };

  return (
    <div className="container">
      {/* Upload PDF */}
      <form>
        <label>
          <h5>Upload PDF</h5>
        </label>
        <br></br>

        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        ></input>

        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form>

      {/* View PDF */}
      <h5>View PDF</h5>
      <div className="viewer">
        {/* render this if we have a pdf file */}
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile && <>No file is selected yet</>}
      </div>
    </div>
  );
}

export default PdfDist;
