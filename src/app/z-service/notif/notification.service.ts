import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiFirebaseService } from '../firebase/api-firebase.service';
import { Subject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private notificationResponses = new Subject<{ id: number; action: string }>();
  notificationResponses$ = this.notificationResponses.asObservable();

  constructor(
    private localNotifications: LocalNotifications,
    private apiFirebaseService: ApiFirebaseService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.localNotifications.on('actions').subscribe(async (notification) => {
        this.handleNotificationAction(notification);
      });
    });
  }

  async handleNotificationAction(notification: any) {
    try {
      const { id, actionId, title } = notification; // Ambil ID notifikasi, aksi, dan judul
      const obatName = title || 'Unknown'; // Nama obat dari notifikasi
      const timestamp = new Date(); // Tanggal saat aksi dilakukan

      if (!actionId || !id) {
        console.error('Notification action is missing required fields:', notification);
        return;
      }

      if (actionId === 'confirm' || actionId === 'skip') {
        // Simpan respons ke Firestore
        await this.saveNotificationResponse(obatName, actionId, timestamp);
        console.log(`Response "${actionId}" saved for "${obatName}" at ${timestamp}`);
      } else {
        console.warn(`Unknown action "${actionId}" for notification ID ${id}`);
      }
    } catch (error) {
      console.error('Error handling notification action:', error);
    }
  }

  async saveNotificationResponse(name: string, action: string, timestamp: Date) {
    try {
      await this.apiFirebaseService.saveResponse({
        nama: name,
        action: action,
        timestamp: timestamp,
      });
      console.log('Response successfully saved to Firestore.');
    } catch (error) {
      console.error('Error saving response to Firestore:', error);
    }
  }

  scheduleNotifications() {
    this.apiFirebaseService.getAll().subscribe((data: any[]) => {
      data.forEach((item) => {
        if (item.schedule && item.tanggal && item.pesan_notif) {
          const startDate = new Date(item.tanggal);
          const scheduleType = item.schedule;
          const notificationTimes = this.getNotificationTimes(startDate, scheduleType);

          notificationTimes.forEach((time, index) => {
            this.localNotifications.schedule({
              id: Number(item.id.hashCode()) + index,
              title: item.nama || 'Pengingat Obat',
              text: item.pesan_notif,
              trigger: { at: time },
              foreground: true,
              priority: 2,
              attachments: ['res://drawable/splash.png'],
              smallIcon: 'res://drawable/splash.png',
              actions: [
                {
                  id: 'confirm',
                  title: 'Sudah Diminum',
                },
                {
                  id: 'skip',
                  title: 'Belum Diminum',
                },
              ],
            });
          });
        }
      });
    });
  }

  /**
   * Fungsi untuk menghitung waktu notifikasi berdasarkan jadwal
   */
  getNotificationTimes(startDate: Date, scheduleType: string): Date[] {
    const times: Date[] = [];
    const currentDate = new Date();
    let interval = 0;

    if (scheduleType.includes('Hari Sekali')) {
      interval = Number(scheduleType.split(' ')[0]); // Misal: "1 Hari Sekali" -> 1 hari
      while (startDate <= currentDate) {
        startDate.setDate(startDate.getDate() + interval); // Tambahkan interval hari
      }
      times.push(startDate);
    } else if (scheduleType.includes('Hari') && scheduleType.includes('Kali')) {
      const dayInterval = Number(scheduleType.split(' ')[0]);
      const dailyCount = Number(scheduleType.split(' ')[2]);
      for (let i = 0; i < dailyCount; i++) {
        const time = new Date(startDate);
        time.setHours(time.getHours() + (24 / dailyCount) * i); // Interval per hari
        if (time > currentDate) times.push(time);
      }
    } else if (scheduleType.includes('Minggu')) {
      interval = Number(scheduleType.split(' ')[0]) * 7; // Misal: "1 Minggu Sekali" -> 7 hari
      while (startDate <= currentDate) {
        startDate.setDate(startDate.getDate() + interval); // Tambahkan interval minggu
      }
      times.push(startDate);
    } else if (scheduleType.includes('Bulan')) {
      interval = Number(scheduleType.split(' ')[0]); // Misal: "1 Bulan Sekali" -> 1 bulan
      while (startDate <= currentDate) {
        startDate.setMonth(startDate.getMonth() + interval); // Tambahkan interval bulan
      }
      times.push(startDate);
    }

    return times;
  }

}


String.prototype.hashCode = function (): number {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

