import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../html/toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService
  ) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.toastService.presentToast('Berhasil login', 'success', 'top', 1800);
        this.router.navigate(['/page/home']);
      } else {
        this.toastService.presentToast('Verify your email', 'info', 'top', 1800);
        this.router.navigate(['/varify-email']);
      }

    }, err => {
      this.toastService.presentToast('Username atau password salah', 'warning', 'top', 1800);
      // alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.sendEmailForVarification(res.user);
      // this.router.navigate(['/login']);
    }, err => {
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.toastService.presentToast('Check your email to reset your password', 'success', 'top', 4000);

      // Menambahkan logika untuk memantau perubahan password
      // this.monitorPasswordChange();
    }).catch(err => {
      this.toastService.presentToast('Pastikan penulisan email benar', 'warning', 'top', 1800);
    });
  }

  monitorPasswordChange() {

    this.router.navigate(['/login']);
  }


  // email varification
  sendEmailForVarification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      this.toastService.presentToast('Error verify email', 'danger', 'top', 1800);
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.toastService.presentToast('Berhasil login', 'success', 'top', 1800);

      this.router.navigate(['/page/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      this.toastService.presentToast('Email sudah dipakai', 'warning', 'top', 1800);
    })
  }

  getUser(): Observable<any> {
    return this.fireauth.authState;
  }

}
