import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../z-service/auth/auth.service';

@Component({
  selector: 'app-detail-kuisioner',
  templateUrl: './detail-kuisioner.component.html',
  styleUrls: ['./detail-kuisioner.component.css']
})
export class DetailKuisionerComponent implements OnInit {

  @Input() selectedObat: any = null;
  @Input() kuisioner: any = null;
  responses: any[] = [];
  filteredKuisioner: any[] = [];



  constructor(
    private modalController: ModalController,
    private authSvc: AuthService,
  ) { }


  ngOnInit() {
    this.authSvc.getUser().subscribe(user => {
      this.filteredKuisioner = this.kuisioner.filter(item => item.displayName === user.displayName);
    });
    this.responses = this.selectedObat.response;
    console.log('kuisioner', this.kuisioner);

  }

  onCloseModal() {
    this.modalController.dismiss();
  }
}
