import { Component, OnInit } from '@angular/core';
import { FcmTokenService } from './z-service/token/fcm-token.service';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from './z-service/notif/notification.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { MessagingService } from './z-service/notif/messaging.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


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
    private messagingService: MessagingService,
    private localNotifications: LocalNotifications

  ) {
    this.initializeApp();

  }

  ngOnInit() {
    // this.initializeApp();
  }

  initializeApp() {
    this.localNotifications.requestPermission().then((granted) => {
      if (granted) {
        console.log('Notification permissions granted');
        this.localNotifications.schedule({
          id: 1,
          title: 'Pengingat Obat',
          text: 'Selamat datang Cantik, jangan lupa minum obat ya',
          trigger: { at: new Date(new Date().getTime() + 5000) },
          foreground: true,
        });
        this.notificationService.scheduleNotifications();
        this.localNotifications.on('click').subscribe((notification) => {
          console.log('click', notification);
        });
      } else {
        console.error('Notification permissions denied');
      }
    });

  }

}
