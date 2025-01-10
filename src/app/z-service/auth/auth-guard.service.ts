import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCJ14cjEAtXP2-9L84FmJ_R0RuYSuRh8rI",
  authDomain: "lib-pill-notification-angular.firebaseapp.com",
  projectId: "lib-pill-notification-angular",
  storageBucket: "lib-pill-notification-angular.firebasestorage.app",
  messagingSenderId: "392629802330",
  appId: "1:392629802330:web:221efc5a8afd0565470f63",
  measurementId: "G-RX5QSJK4YQ"
};

// Ensure Firebase is initialized
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth(app); // Use the initialized app

      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true); // User is logged in
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/login']); // Redirect to login page
          resolve(false);
        }
      });
    });
  }
}
