import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  currentYear: number;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {

  }

  onNavigateLogin(): void {
    this.router.navigate(['/login']);
  }

  onNavigateRegister(): void {
    this.router.navigate(['/register']);
  }

  //fb

  onClickFb(): void {
    this.presentToastFb();
    setTimeout(() => {
      window.open('https://www.facebook.com/', '_blank');
    }, 1500);
  }

  async presentToastFb() {
    const toast = await this.toastController.create({
      message: 'Redirect to facebook',
      duration: 2000,
      position: 'top',
      cssClass: 'toast-facebook',
    });
    toast.present();
  }

  //ig

  onClickIg(): void {
    this.presentToastIg();
    setTimeout(() => {
      window.open('https://www.instagram.com/griya.khitanhumaira/', '_blank');
    }, 1500);
  }

  async presentToastIg() {
    const toast = await this.toastController.create({
      message: 'Redirect to instagram',
      duration: 2000,
      position: 'top',
      cssClass: 'toast-instagram',
    });
    toast.present();
  }

  //twitter

  onClickTwitter(): void {
    this.presentToastTwitter();
    setTimeout(() => {
      window.open('https://twitter.com/', '_blank');
    }, 1500);
  }

  async presentToastTwitter() {
    const toast = await this.toastController.create({
      message: 'Redirect to twitter',
      duration: 2000,
      position: 'top',
      cssClass: 'toast-twitter',
    });
    toast.present();
  }

  // email

  onClickEmail(): void {
    this.presentToastEmail();
    setTimeout(() => {
      window.open('https://mail.google.com/', '_blank');
    }, 1500);
  }

  async presentToastEmail() {
    const toast = await this.toastController.create({
      message: 'Redirect to mail',
      duration: 2000,
      position: 'top',
      cssClass: 'toast-mail',
    });
    toast.present();
  }

  // wa
  onClickWa() {
    this.presentToastWa();
    setTimeout(() => {
      window.open('https://wa.me/6281326493285', '_blank');
    }, 1500);
  }

  async presentToastWa() {
    const toast = await this.toastController.create({
      message: 'Redirect to wa',
      duration: 2000,
      position: 'top',
      cssClass: 'toast-wa',
    });
    toast.present();
  }


}


