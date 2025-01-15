import { Component, OnInit } from '@angular/core';
import { ApiFirebaseService } from '../../z-service/firebase/api-firebase.service';
import { ModalController } from '@ionic/angular';
import { CetakKuisionerComponent } from './cetak-kuisioner/cetak-kuisioner.component';

@Component({
  selector: 'app-kuisioner',
  templateUrl: './kuisioner.component.html',
  styleUrls: ['./kuisioner.component.css']
})
export class KuisionerComponent implements OnInit {

  obatList: any[] = [];

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
      console.log('Obat List:', this.obatList);
    });

  }

  async onCetakKuisioner(id:any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);
    const modal = await this.modalController.create({
      component: CetakKuisionerComponent,
      cssClass: 'my-custom-class',
      componentProps : {
        selectedObat: selectedObat
      }
    });
    return await modal.present();
  }

  onCancel() {
    window.history.back();
  }
}
