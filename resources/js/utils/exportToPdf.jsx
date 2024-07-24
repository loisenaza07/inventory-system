import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function exportToPdf(elementRef, fileExportName = 'export_pdf', initCutImage = 0) {
  html2canvas(elementRef).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190;
    const pageHeight = 290;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    const doc = new jsPDF('p', 'mm', 'a4', true);
    let position = 0;
    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight + 25);
    heightLeft -= pageHeight;
    let cutImageHeight = initCutImage;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 15;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight - cutImageHeight);
      cutImageHeight += 15;
      heightLeft -= pageHeight;
    }
    doc.save(fileExportName + '.pdf');
  });
}
