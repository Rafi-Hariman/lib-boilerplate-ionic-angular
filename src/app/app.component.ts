import { Component, OnInit } from '@angular/core';
import { FcmTokenService } from './z-service/token/fcm-token.service';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private fcmTokenSvc: FcmTokenService,
    private swPush: SwPush,
  ) { }

  ngOnInit() {
    // this.fcmTokenSvc.requestPermission();

    this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this.swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: 'BGC_csbcErnEASJqvfGl2WIvfMoMQC4To6GTUUsxiKh4ZAorA_2dxKk1IEGBwENCBVlRt3T112bTbp0wa9KYLPA'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  };


}
