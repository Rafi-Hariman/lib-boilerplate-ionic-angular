import { Component, OnInit } from '@angular/core';
import { NotificationService } from './z-service/notif/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthService } from './z-service/auth/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  fcmToken: any;
  constructor(
    private notificationService: NotificationService,
    private localNotifications: LocalNotifications,
    private authSvc: AuthService,
    private router : Router,
    private platform: Platform

  ) {
    if (this.platform.is('cordova')) {
      this.initializeApp();
    }
  }

  ngOnInit() {
    this.authSvc.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/page/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
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
