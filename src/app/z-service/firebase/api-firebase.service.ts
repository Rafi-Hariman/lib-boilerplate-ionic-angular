import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Obat } from '../../z-model/obat';

@Injectable({
  providedIn: 'root',
})
export class ApiFirebaseService {
  private dbPath = '/obat';


  constructor(private firestore: AngularFirestore) {}

  getAll() {
    return this.firestore.collection<Obat>(this.dbPath).valueChanges({ idField: 'id' });
  }

  create(obat: Obat) {
    return this.firestore.collection<Obat>(this.dbPath).add(obat);
  }

  update(id: string, data: Partial<Obat>) {
    return this.firestore.collection<Obat>(this.dbPath).doc(id).update(data);
  }

  delete(id: string) {
    return this.firestore.collection<Obat>(this.dbPath).doc(id).delete();
  }

  getById(id: string) {
    return this.firestore
      .collection('obat')
      .doc(id)
      .valueChanges();
  }

}
