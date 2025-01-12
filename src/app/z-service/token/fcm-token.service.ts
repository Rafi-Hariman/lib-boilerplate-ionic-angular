import { Injectable, OnInit } from '@angular/core';
import { AngularFireMessaging, VAPID_KEY } from '@angular/fire/compat/messaging';
import { getMessaging, getToken } from 'firebase/messaging';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FcmTokenService {

  constructor(private afMessaging: AngularFireMessaging) { }


  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('FCM Token:', token);
      },
      (error) => {
        console.error('Permission Denied:', error);
      }
    );
  }

  // requestPermissionFB() {
  //   const messaging = getMessaging();
  //   getToken(messaging, { vapidKey: environment.firebase.vpaidKey }).then((currentToken) => {
  //     if (currentToken) {
  //       console.log('FCM Token:', currentToken);
  //     } else {
  //       console.log('No registration token available. Request permission to generate one.');
  //     }
  //   }).catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //   });
  // }
}

