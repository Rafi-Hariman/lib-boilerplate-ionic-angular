import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../../z-service/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() userProfile: any;

  constructor(
    private modalController: ModalController,
    private authSvc : AuthService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.authSvc.getUser().subscribe(user => {
      this.userProfile = user;
    });
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

}
