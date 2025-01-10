import { Component, OnInit } from '@angular/core';
import { AuthService } from '../z-service/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authSvc.logout();
  }

}
