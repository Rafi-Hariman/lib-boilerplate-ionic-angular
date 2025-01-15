import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['./settings-service.component.css']
})
export class SettingsServiceComponent implements OnInit {
  userProfile: any;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.userProfile = user;
    })
  }

  async editProfile() {

    const modal = await this.modalController.create({
      component: EditProfileComponent,

    });
    await modal.present();
  }

  logout() {
    this.authService.logout();
  }

}
