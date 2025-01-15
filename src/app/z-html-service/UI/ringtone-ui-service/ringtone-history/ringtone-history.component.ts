import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';
import { ApiFirebaseService } from '../../../../z-service/firebase/api-firebase.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ringtone-history',
  templateUrl: './ringtone-history.component.html',
  styleUrls: ['./ringtone-history.component.css']
})
export class RingtoneHistoryComponent implements OnInit {
  obatList: any[] = [];
  displayName: string = '';
  email: string = '';

  constructor(
    private apiFireBaseSvc: ApiFirebaseService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchAllObat();
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.displayName = user.displayName || 'Tidak Diketahui';
        this.email = user.email || 'Tidak Diketahui';
      }
    });
  }

  fetchAllObat() {
    this.apiFireBaseSvc.getAll().subscribe((data) => {
      this.obatList = data;
    });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

    // Tambahkan data user ke file Excel
    XLSX.utils.sheet_add_aoa(ws, [
      ['Display Name:', this.displayName],
      ['Email:', this.email],
      [],
      ['Nama', 'Deskripsi', 'Dosis', 'Jenis', 'Frekuensi']
    ]);

    // Tambahkan data obat
    const obatData = this.obatList.map(obat => [
      obat.nama || '-',
      obat.deskripsi || '-',
      obat.dosis_obat || '-',
      obat.jenis || '-',
      obat.frekuensi_minum || '-'
    ]);
    XLSX.utils.sheet_add_json(ws, obatData, { origin: -1, skipHeader: true });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Obat Data');

    XLSX.writeFile(wb, 'ObatData.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const tableColumn = ['Nama', 'Deskripsi', 'Dosis', 'Jenis', 'Frekuensi'];
    const tableRows: any[] = [];

    // Tambahkan data obat ke PDF
    this.obatList.forEach((obat) => {
      const obatData = [
        obat.nama || '-',
        obat.deskripsi || '-',
        obat.dosis_obat || '-',
        obat.jenis || '-',
        obat.frekuensi_minum || '-',
      ];
      tableRows.push(obatData);
    });

    // Tambahkan informasi pengguna ke PDF
    doc.text(`Display Name: ${this.displayName}`, 14, 10);
    doc.text(`Email: ${this.email}`, 14, 16);

    // Tambahkan tabel data obat
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save('ObatData.pdf');
  }
}
