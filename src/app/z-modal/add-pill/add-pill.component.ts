import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-pill',
  templateUrl: './add-pill.component.html',
  styleUrls: ['./add-pill.component.css']
})
export class AddPillComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onClickCancel() {
    this.modalController.dismiss();
  }

}
