import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  getUserProfile(): Observable<any> {
    return new Observable((observer) => {
      // Listen for authentication state
      this.auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          docData(userDoc).subscribe(
            (profile) => {
              observer.next(profile);
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.next(null);
        }
      });
    });
  }
}
