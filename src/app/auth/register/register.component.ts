import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../z-service/auth/auth.service';
import { ToastService } from '../../z-service/html/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  confirmPassword: string = '';

  constructor(
    private auth : AuthService,
    private toastSvc: ToastService,

  ) { }

  ngOnInit(): void {
  }


  register() {
    if (this.email === '') {
      this.toastSvc.presentToast('Email wajib diisi', 'info', 'top', 1800);
      return;
    }
    if (this.password === '') {
      this.toastSvc.presentToast('Password wajib diisi', 'info', 'top', 1800);
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.toastSvc.presentToast('Password tidak sama', 'info', 'top', 1800);
      return;
    }
    this.auth.register(this.email, this.password);
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }


}
