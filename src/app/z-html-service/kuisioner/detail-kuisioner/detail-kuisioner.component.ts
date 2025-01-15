import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-kuisioner',
  templateUrl: './detail-kuisioner.component.html',
  styleUrls: ['./detail-kuisioner.component.css']
})
export class DetailKuisionerComponent implements OnInit {

  @Input() selectedObat: any = null;
  responses: any [] = [];


  constructor(
    private modalController: ModalController,
  ) { }


  ngOnInit() {
    this.responses = this.selectedObat.response;
  }

  onCloseModal() {
    this.modalController.dismiss();
  }
}
