import { Component, OnInit } from '@angular/core';
import { FcmTokenService } from './z-service/token/fcm-token.service';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from './z-service/notif/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private afMessaging: AngularFireMessaging,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    this.afMessaging.requestToken
    .subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
        // TODO: send token to server
       },
      (error) => { console.error(error); },
    );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message: any) => {
        console.log(message);
        this.notificationService.setNotification({
          body: message.notification.body,
          title: message.notification.title,
          isVisible: true
        })
      });
  }


}
