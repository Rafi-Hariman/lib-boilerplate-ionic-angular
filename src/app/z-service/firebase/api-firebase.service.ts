import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Obat } from '../../z-model/obat';
import { Timestamp } from '@angular/fire/firestore';
import { MessagingService } from '../notif/messaging.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFirebaseService {
  private dbPath = '/obat';

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private messagingService: MessagingService
  ) {
    this.listenToFirestore();
  }


  getAll() {
    return this.firestore.collection<Obat>(this.dbPath).valueChanges({ idField: 'id' });
  }


  async create(obat: Obat) {
    const user = await this.auth.currentUser;
    if (user) {
      obat['createdBy'] = {
        displayName: user.displayName || 'Unknown User',
        email: user.email || 'Unknown Email',
        uid: user.uid,
      };
    }
    return this.firestore.collection<Obat>(this.dbPath).add(obat);
  }


  async update(id: string, data: Partial<Obat>) {
    const user = await this.auth.currentUser;
    if (user) {
      data['updatedBy'] = {
        displayName: user.displayName || 'Unknown User',
        email: user.email || 'Unknown Email',
        uid: user.uid,
      };
    }
    return this.firestore.collection<Obat>(this.dbPath).doc(id).update(data);
  }


  delete(id: string) {
    return this.firestore.collection<Obat>(this.dbPath).doc(id).delete();
  }


  getById(id: string) {
    return this.firestore.collection('obat').doc(id).valueChanges();
  }


  getByJenis(jenis: string) {
    return this.firestore
      .collection<Obat>(this.dbPath, (ref) => ref.where('jenis', '==', jenis))
      .valueChanges({ idField: 'id' });
  }

  listenToFirestore() {
    this.firestore.collection(this.dbPath).valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
      data.forEach((doc) => {
        const currentDate = new Date();
        const scheduleDate = new Date(doc.tanggal);

        if (
          doc.schedule &&
          doc.tanggal &&
          doc.pesan_notif &&
          scheduleDate > currentDate &&
          Math.abs(scheduleDate.getTime() - currentDate.getTime()) <= 60000 // Trigger jika waktunya dekat
        ) {
          this.sendNotification(doc.pesan_notif, doc.nama);
        }
      });
    });
  }

  // Mengirim notifikasi menggunakan FCM
  sendNotification(message: string, title: string) {
    this.messagingService.currentToken.subscribe((token) => {
      if (token) {
        const payload = {
          notification: {
            title: title || 'Pengingat Obat',
            body: message,
          },
          to: token,
        };

        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            Authorization: 'AIzaSyCJ14cjEAtXP2-9L84FmJ_R0RuYSuRh8rI', // Ganti dengan server key FCM Anda
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Notification sent successfully:', data);
          })
          .catch((error) => {
            console.error('Error sending notification:', error);
          });
      } else {
        console.error('No token found, notification not sent.');
      }
    });
  }
}



// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { MessagingService } from './messaging.service';
// import { Timestamp } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiFirebaseService {
//   private dbPath = '/obat';

//   constructor(
//     private firestore: AngularFirestore,


//   // Listener Firestore untuk mendeteksi data baru

// }
