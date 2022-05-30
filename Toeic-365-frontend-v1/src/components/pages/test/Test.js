import React from 'react';
import PanelMenu from '../../molecules/PanelMenu/PanelMenu';
import PdfDist from '../../molecules/PdfDist/PdfDist';
import ScoreCard from '../../molecules/ScoreCard/ScoreCard';
let test =
  'https://firebasestorage.googleapis.com/v0/b/fir-library-upload.appspot.com/o/files%2FLiving%20in%20the%20Light_%20A%20guide%20to%20personal%20transformation%20(%20PDFDrive%20).pdf_221810_29052022?alt=media&token=f4c2fe7f-edd3-49a6-ad8d-f7a275a085db';

function MyPdf() {
  return (
    <div>
      <PdfDist />
    </div>
  );
}
export default MyPdf;
