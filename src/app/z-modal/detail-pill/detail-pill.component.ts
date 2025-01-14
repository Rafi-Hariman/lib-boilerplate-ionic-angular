import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-pill',
  templateUrl: './detail-pill.component.html',
  styleUrls: ['./detail-pill.component.css']
})
export class DetailPillComponent implements OnInit {
  @Input() selectedObat: any;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.selectedObat);

  }

  onClose() {
    this.modalController.dismiss();
  }

}
