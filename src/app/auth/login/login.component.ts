import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../z-service/auth/auth.service';
import { ToastService } from '../../z-service/html/toast.service';
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


  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {

  }

  ngOnInit() { }

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


}
