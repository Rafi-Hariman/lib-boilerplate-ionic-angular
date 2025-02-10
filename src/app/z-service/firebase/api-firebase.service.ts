import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { KuisionerExcel, NotificationsDataFromUser, Obat, ObatResponse } from '../../z-model/obat';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiFirebaseService {
  private dbPath = '/obat';
  private dbPathNotif = '/notificationsDataFromUser';
  private dbPathKuisionerExcel = '/kuisonerExcel';

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
  ) {
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

  /// user ///
  async createDataNotifFromUser(obat: NotificationsDataFromUser) {
    const user = await this.auth.currentUser;
    if (user) {
      obat['createdByUser'] = {
        displayName: user.displayName || 'Unknown User',
        email: user.email || 'Unknown Email',
        uid: user.uid,
      };
    }
    return this.firestore.collection<NotificationsDataFromUser>(this.dbPathNotif).add(obat);
  }

  getAllUserNotificationData() {
    return this.firestore.collection<NotificationsDataFromUser>(this.dbPathNotif).valueChanges({ idField: 'id' });
  }

  getAllUserExcel() {
    return this.firestore.collection<KuisionerExcel>(this.dbPathKuisionerExcel).valueChanges({ idField: 'id' });
  }

  async updateKuisionerExcelData(id: string, data: Partial<KuisionerExcel>) {
    return this.firestore.collection<KuisionerExcel>(this.dbPathKuisionerExcel).doc(id).update(data);
  }


  async createDataExcelUser(kuisioner: KuisionerExcel) {
    return this.firestore.collection<KuisionerExcel>(this.dbPathKuisionerExcel).add(kuisioner);
  }
  /// user ///

  /// notif ///
  async saveResponse(response: { nama: string; action: string; timestamp: Date }) {
    const user = await this.auth.currentUser; // Ambil user saat ini
    const dataToSave = {
      nama: response.nama,
      action: response.action,
      timestamp: Timestamp.fromDate(response.timestamp),
      user: user
        ? {
          displayName: user.displayName || 'Unknown User',
          email: user.email || 'Unknown Email',
          uid: user.uid,
        }
        : null,
    };
    return this.firestore.collection('responses').doc(response.nama).set(dataToSave, { merge: true });
  }
  /// notif ///

}
