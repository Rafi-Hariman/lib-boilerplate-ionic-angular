import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentToken = new BehaviorSubject<string | null>(null);

  constructor(private afMessaging: AngularFireMessaging) {
    this.requestPermission();
  }

  // Meminta izin untuk menerima notifikasi
  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('Permission granted! Token:', token);
        this.currentToken.next(token);
        // Anda dapat menyimpan token ini ke database untuk digunakan
      },
      (error) => {
        console.error('Permission denied!', error);
      }
    );
  }

  // Mendengarkan pesan masuk
  receiveMessage() {
    return this.afMessaging.messages;
  }
}
