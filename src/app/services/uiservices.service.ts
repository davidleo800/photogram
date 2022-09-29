import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIServicesService {

  constructor( private alertController: AlertController,
                private toastController: ToastController) { }

  async infoAlert( message: string) {
    const alert = await this.alertController.create({
      message ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
    });
  }
}
