import { Component, OnInit } from '@angular/core';
import { FcmTokenService } from './z-service/token/fcm-token.service';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from './z-service/notif/notification.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { MessagingService } from './z-service/notif/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  fcmToken: any;
  constructor(
    private afMessaging: AngularFireMessaging,
    private notificationService: NotificationService,
    private messagingService: MessagingService

  ) {
    // this.initMobileNotif();
  }



  ngOnInit() {
    // this.requestPermission();
    // this.listen();
    this.messagingService.receiveMessage().subscribe((payload) => {
      console.log('Notification received:', payload);
      // Anda dapat memproses atau menampilkan notifikasi sesuai kebutuhan
    });
  }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);

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


  copyToClipboard(): void {
    if (this.fcmToken) {
      navigator.clipboard.writeText(this.fcmToken).then(() => {
        alert('Token berhasil disalin ke clipboard!');
      });
    }
  }

  initMobileNotif() {
    console.log('Initializing HomePage');
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {

        PushNotifications.register();
      } else {

      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }

}
