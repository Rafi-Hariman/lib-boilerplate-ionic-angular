import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cetak-kuisioner',
  templateUrl: './cetak-kuisioner.component.html',
  styleUrls: ['./cetak-kuisioner.component.css']
})
export class CetakKuisionerComponent implements OnInit {

    @Input() selectedObat: any;


  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('Selected Obat:', this.selectedObat);
  }

  selectedRating: string = '1';

  onRatingChange(event: any) {
    this.selectedRating = event.detail.value;
    console.log('Selected Rating:', this.selectedRating);
  }

  onPrevious() {
    console.log('Previous question clicked');
  }

  onNext() {
    console.log('Next question clicked');
  }

  onCancel() {
    window.history.back();
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

}
