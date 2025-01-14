import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../z-service/auth/auth.service';


@Component({
  selector: 'app-setnotification',
  templateUrl: './setnotification.component.html',
  styleUrls: ['./setnotification.component.scss']
})
export class SetnotificationComponent implements OnInit {
  userProfile: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {

  }

}
