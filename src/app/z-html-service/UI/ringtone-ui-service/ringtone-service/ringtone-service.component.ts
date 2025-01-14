import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';
import { ApiFirebaseService } from '../../../../z-service/firebase/api-firebase.service';
import { ModalController } from '@ionic/angular';
import { ModalSetnotifComponent } from '../../../../z-modal/modal-setnotif/modal-setnotif.component';
import { ToastService } from '../../../../z-service/html/toast.service';

@Component({
  selector: 'app-ringtone-service',
  templateUrl: './ringtone-service.component.html',
  styleUrls: ['./ringtone-service.component.scss']
})
export class RingtoneServiceComponent implements OnInit {

  userProfile: any;
  obatList: any[] = [];

  constructor(
    private authService: AuthService,
    private apiFireBaseSvc: ApiFirebaseService,
    private modalController: ModalController,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.fetchAllObat();
    this.authService.getUser().subscribe(user => {
      this.userProfile = user;
    })
  }

  fetchAllObat() {
    this.apiFireBaseSvc.getAll().subscribe((data) => {
      this.obatList = data;
      console.log('fetching all obat', this.obatList);
    });
  }

   async buatNotifikasi(id: any) {
      const selectedObat = this.obatList.find(obat => obat.id === id);
      const modal = await this.modalController.create({
        component: ModalSetnotifComponent,
        componentProps: {
          selectedObat: selectedObat
        }
      });
      await modal.present();
    }

  buatNadaDering(obat: any) {
    console.log('Membuat nada dering untuk obat:', obat.nama);
  }

  checkedNotif(obat: any) {
    this.toastService.presentToast(`Obat ini sudah memiliki notifikasi`, 'success', 'top', 1000);
  }

}
