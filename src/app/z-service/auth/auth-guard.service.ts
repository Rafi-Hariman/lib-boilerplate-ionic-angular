import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth.service';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCJ14cjEAtXP2-9L84FmJ_R0RuYSuRh8rI",
  authDomain: "lib-pill-notification-angular.firebaseapp.com",
  projectId: "lib-pill-notification-angular",
  storageBucket: "lib-pill-notification-angular.firebasestorage.app",
  messagingSenderId: "392629802330",
  appId: "1:392629802330:web:221efc5a8afd0565470f63",
  measurementId: "G-RX5QSJK4YQ",
  vpaidKey: "BO31HHH5kvLiIbFWYU4ODMMU2U8efGfFsxj0TjZp7AXuHmOUy5EAqwpv18SLP0uGqdXzAgnf0xQGXb5Nt4gXKSM"
};

// Ensure Firebase is initialized
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth(app);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
