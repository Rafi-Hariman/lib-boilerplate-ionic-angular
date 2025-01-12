import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../z-service/auth/auth.service';
import { ToastService } from '../../z-service/html/toast.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from 'src/app/z-service/notif/notification.service';
// import { AuthService } from '../../../service/auth.service';


// import { ToastService } from '../../../services/primeng/prime.toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  fcmToken: any;


  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toastService: ToastService,
    private afMessaging: AngularFireMessaging,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.listen();
  }

  onNavigateRegister(): void {
    this.router.navigate(['/register']);
  }

  login() {
    if (this.email == '') {
      this.toastService.presentToast('Email is required', 'info', 'top', 1000);
      return;
    }
    if (this.password == '') {
      this.toastService.presentToast('Password is required', 'info', 'top', 1000);
      return;
    }
    this.authSvc.login(this.email, this.password);
  }

  signInWithGoogle() {
    this.authSvc.googleSignIn();
  }

  requestPermission() {
    this.afMessaging.requestToken
    .subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
        this.fcmToken = token;
        // TODO: send token to server
       },
      (error) => { console.error(error); },
    );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message: any) => {
        console.log(message);

        console.log(message);
        this.notificationService.setNotification({
          body: message.notification.body,
          title: message.notification.title,
          isVisible: true
        })
      });
  }


  copyToClipboard(): void {
    if (this.fcmToken) {
      navigator.clipboard.writeText(this.fcmToken).then(() => {
        alert('Token berhasil disalin ke clipboard!');
      });
    }
  }



}
