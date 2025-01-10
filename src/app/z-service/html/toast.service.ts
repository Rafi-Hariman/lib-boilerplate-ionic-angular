import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    type: 'success' | 'warning' | 'info' | 'danger' = 'info',
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    duration: number = 2000
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: `toast-${type}`,
      // buttons: [
      //   {
      //     text: 'Dismiss',
      //     role: 'cancel',
      //   }
      // ],
      icon: this.getIcon(type)
    });

    await toast.present();
  }

  private getIcon(type: 'success' | 'warning' | 'info' | 'danger'): string {
    switch (type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'alert-circle-outline';
      case 'info':
        return 'information-circle-outline';
      case 'danger':
        return 'alert-circle-outline';
      default:
        return '';
    }
  }
}
