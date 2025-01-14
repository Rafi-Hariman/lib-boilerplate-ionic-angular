import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';

@Component({
  selector: 'app-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['./settings-service.component.css']
})
export class SettingsServiceComponent implements OnInit {
  userProfile: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.userProfile = user;
    })
  }


  logout() {
    this.authService.logout();
  }

}
