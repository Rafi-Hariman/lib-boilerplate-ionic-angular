import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-pill',
  templateUrl: './edit-pill.component.html',
  styleUrls: ['./edit-pill.component.scss']
})
export class EditPillComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onClickCancel() {
    this.modalController.dismiss();
  }

}
