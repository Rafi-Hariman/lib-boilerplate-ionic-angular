import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPillComponent } from 'src/app/z-modal/add-pill/add-pill.component';
import { DeletePillComponent } from 'src/app/z-modal/delete-pill/delete-pill.component';
import { DetailPillComponent } from 'src/app/z-modal/detail-pill/detail-pill.component';
import { EditPillComponent } from 'src/app/z-modal/edit-pill/edit-pill.component';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent implements OnInit {


  isActionSheetOpen = false;
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

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddPillComponent,
    });
    await modal.present();
  }

  async openModalEdit() {
    const modal = await this.modalController.create({
      component: EditPillComponent,
    });
    await modal.present();
  }

  async openModalDelete() {
    const modal = await this.modalController.create({
      component: DeletePillComponent,
    });
    await modal.present();
  }

  async openModalDetail() {
    const modal = await this.modalController.create({
      component: DetailPillComponent,
    });
    await modal.present();
  }

  openDelete(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

}
