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
  kuisioner: any;
  dataKuisioner: any;

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

    const allResponses = this.saveAllResponses(this.obatList);

    if (type === 'pdf') {
      this.fileExporter.exportToPDF(allResponses);
    } else if (type === 'excel') {
      this.fileExporter.exportToExcel(allResponses);
    }
  }


  async onCetakKuisioner(id: any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);
    const modal = await this.modalController.create({
      component: CetakKuisionerComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        selectedObat: selectedObat
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
        selectedObat: selectedObat
      }
    });
    return await modal.present();
  }


}
