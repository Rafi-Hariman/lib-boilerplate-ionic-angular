import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/z-service/auth/auth.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastService } from 'src/app/z-service/html/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';
  forgotClicked: boolean = true;

  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.forgotClicked = true;
  }

  forgotPassword() {
    if (this.email == '') {
      this.toastService.presentToast('Email is required', 'info', 'top', 1000);
      return;
    }
    this.auth.forgotPassword(this.email);
    this.forgotClicked = false;
  }

  checkUpdatePwd() {
    this.auth.monitorPasswordChange();
  }

}
