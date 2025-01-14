import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AddPillComponent } from '../../../../z-modal/add-pill/add-pill.component';
import { DeletePillComponent } from '../../../../z-modal/delete-pill/delete-pill.component';
import { DetailPillComponent } from '../../../../z-modal/detail-pill/detail-pill.component';
import { EditPillComponent } from '../../../../z-modal/edit-pill/edit-pill.component';
import { Obat } from '../../../../z-model/obat';
import { ApiFirebaseService } from '../../../../z-service/firebase/api-firebase.service';
import { ToastService } from '../../../../z-service/html/toast.service';
import { UserauthService } from '../../../../z-service/auth/userauth.service';
import { AuthService } from '../../../../z-service/auth/auth.service';
import { TimeDateService } from '../../../../z-service/data/time-date.service';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.css'],
})
export class HomeServiceComponent implements OnInit {

  obatList: Obat[] = [];

  isActionSheetOpen = false;
  jenisObatList: string[] = [
    'Analgesik',
    'Antibiotik',
    'Antidepresan',
    'Antihistamin',
    'Antipiretik',
    'Antiinflamasi',
    'Antiviral',
    'Diuretik',
    'Ekspektoran',
    'Laksatif',
    'Obat Jantung',
    'Obat Hipertensi',
    'Obat Diabetes',
    'Obat Gastrointestinal',
    'Obat Neurologis',
  ];
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  greetingMessage: string = '';
  userProfile: any;
  currentTime: string = '';

  constructor(
    private modalController: ModalController,
    private apiFireBaseSvc: ApiFirebaseService,
    private actionSheetCtrl: ActionSheetController,
    private toastService: ToastService,
    private authService: AuthService,
    private timeSvc: TimeDateService,
    // private authService: UserauthService,

  ) { }

  ngOnInit() {
    this.apiFireBaseSvc.getAll().subscribe((data) => {
      this.obatList = data;
    });
    this.authService.getUser().subscribe((user) => {
      this.userProfile = user;
    });
    this.setGreetingMessage();
    this.currentTime = this.timeSvc.getCurrentTime();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddPillComponent,
    });
    await modal.present();
  }

  async openModalEdit(id: any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);

    const modal = await this.modalController.create({
      component: EditPillComponent,
      componentProps: {
        selectedObat: selectedObat
      }
    });
    await modal.present();
  }

  async openModalDelete() {
    const modal = await this.modalController.create({
      component: DeletePillComponent,
    });
    await modal.present();
  }

  async openModalDetail(id: any) {
    const selectedObat = this.obatList.find(obat => obat.id === id);

    const modal = await this.modalController.create({
      component: DetailPillComponent,
      componentProps: {
        selectedObat: selectedObat
      }
    });
    await modal.present();
  }

  openDelete(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;

  }

  async presentActionSheet(obatId: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Konfirmasi Hapus',
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteObat(obatId);
          },
        },
        {
          text: 'Batal',
          role: 'cancel',
          icon: 'close',
        },
      ],
    });

    await actionSheet.present();
  }

  deleteObat(obatId: string) {
    this.apiFireBaseSvc
      .delete(obatId)
      .then(() => {
        this.toastService.presentToast('Data berhasil dihapus', 'success', 'top', 1000);
        this.obatList = this.obatList.filter((obat) => obat.id !== obatId);
      })
      .catch((error) => {
        this.toastService.presentToast('Gagal hapus data', 'danger', 'top', 1000);
      });


  }

  private setGreetingMessage() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greetingMessage = 'Good Morning!';
    } else if (currentHour < 18) {
      this.greetingMessage = 'Good Afternoon!';
    } else {
      this.greetingMessage = 'Good Evening!';
    }
  }


}
