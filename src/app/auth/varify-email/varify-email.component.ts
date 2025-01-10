import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastService } from '../../z-service/html/toast.service';

@Component({
  selector: 'app-varify-email',
  templateUrl: './varify-email.component.html',
  styleUrls: ['./varify-email.component.css']
})
export class VarifyEmailComponent implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(
    private router: Router,
    private toastSvc: ToastService
  ) {}

  ngOnInit() {
    this.checkEmailVerificationPeriodically();
  }

  ngOnDestroy() {
    // Hentikan interval ketika komponen dihancurkan
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onVerifyEmail() {
    window.open('https://mail.google.com/mail/u/0/#search/from:noreply@lib-pill-notification-angular.firebaseapp.com', '_blank');
  }

  private checkEmailVerificationPeriodically(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.intervalId = setInterval(() => {
        user.reload().then(() => {
          if (user.emailVerified) {
            clearInterval(this.intervalId); // Hentikan interval jika sudah terverifikasi
            this.router.navigate(['/page/home']); // Redirect ke halaman /page/home
          }
        }).catch((error) => {
          console.error('Error refreshing user data:', error);
        });
      }, 1000); // Periksa setiap 3 detik
    } else {
      this.toastSvc.presentToast('No user is logged in. Please log in to verify your email.', 'warning', 'top', 1800);
    }
  }
}
