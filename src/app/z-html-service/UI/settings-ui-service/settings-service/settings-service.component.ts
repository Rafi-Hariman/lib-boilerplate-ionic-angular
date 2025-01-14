import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';

@Component({
  selector: 'app-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['./settings-service.component.css']
})
export class SettingsServiceComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
  }

}
