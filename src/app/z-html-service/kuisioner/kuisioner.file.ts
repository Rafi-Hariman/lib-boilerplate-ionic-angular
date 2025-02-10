import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class FileExporter {
  exportToPDF(data: any[]) {
    console.log('data', data);

    const doc = new jsPDF();
    const tableColumn = ['Nama', 'Email', 'Kelas', 'Nama Obat', 'Nomor Pertanyaan', 'Pertanyaan', 'Jawaban', 'Bobot'];
    const tableRows: any[] = [];

    data.forEach((item, index) => {
      tableRows.push([
        item.displayName,
        item.email,
        item.kelas,
        item.nama,
        item.questionIndex + 1, // Nomor pertanyaan
        item.question,
        item.label, // Jawaban
        item.value, // Bobot
      ]);
    });

    doc.text('Data Respon Obat', 14, 10);
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('Data_Respon_Obat.pdf');
  }

  exportToExcel(data: any[]) {
    const worksheetData = data.map((item, index) => ({
      'Nama': item.displayName,
      'Email': item.email,
      'Nama Obat': item.nama,
      'Kelas': item.kelas,
      'Nomor Pertanyaan': item.questionIndex + 1,
      'Pertanyaan': item.question,
      'Jawaban': item.label,
      'Bobot': item.value,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Respon');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer]), 'Data_Respon_Obat.xlsx');
  }
}
