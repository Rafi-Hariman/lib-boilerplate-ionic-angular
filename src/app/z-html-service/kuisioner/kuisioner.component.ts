import { Component, OnInit } from '@angular/core';
import { ApiFirebaseService } from '../../z-service/firebase/api-firebase.service';
import { ModalController } from '@ionic/angular';
import { CetakKuisionerComponent } from './cetak-kuisioner/cetak-kuisioner.component';
import { DetailKuisionerComponent } from './detail-kuisioner/detail-kuisioner.component';
import { FileExporter } from './kuisioner.file';


@Component({
  selector: 'app-kuisioner',
  templateUrl: './kuisioner.component.html',
  styleUrls: ['./kuisioner.component.css']
})
export class KuisionerComponent implements OnInit {

  private fileExporter = new FileExporter();


  obatList: any[] = [];
  obatKuisioner: any[] = [];
  kuisioner: any;
  dataKuisioner: any;
  exsistingUserName: any;

  constructor(
    private apiFireBase: ApiFirebaseService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.fetchObatList();
  }

  fetchObatList() {
    this.apiFireBase.getAll().subscribe((data) => {
      this.obatList = data;
    });

    this.apiFireBase.getAllUserExcel().subscribe((data) => {
      const responses = data
        .filter((obat) => Array.isArray(obat.responses))
        .flatMap((obat) =>
          obat.responses.map((response: any) => ({
            ...response,
            displayName: response.displayName || 'Unknown'
          }))
        );
      this.obatKuisioner = responses;
      console.log('obat', this.obatKuisioner);
    });
  }

  saveAllResponses(data: any) {
    return data
      .filter((obat) => Array.isArray(obat.response))
      .flatMap((obat) =>
        obat.response.map((response: any) => ({
          ...response,
          namaObat: obat.nama,
        }))
      );
  }

  onExport(type: 'pdf' | 'excel') {
    if (type === 'pdf') {
      this.fileExporter.exportToPDF(this.obatKuisioner);
    } else if (type === 'excel') {
      this.fileExporter.exportToExcel(this.obatKuisioner);
    }
  }


  async onCetakKuisioner(id: any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);
    const modal = await this.modalController.create({
      component: CetakKuisionerComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        selectedObat: selectedObat,
      }
    });
    return await modal.present();
  }

  onCancel() {
    window.history.back();
  }

  async onDetailKuisioner(id: any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);
    const modal = await this.modalController.create({
      component: DetailKuisionerComponent,
      componentProps: {
        selectedObat: selectedObat,
        kuisioner: this.obatKuisioner,
      }
    });
    return await modal.present();
  }


}
