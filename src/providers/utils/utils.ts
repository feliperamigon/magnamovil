import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

/*
 Servicio para la creacion de loaders, o mensajes por pantalla (Toast)
*/
@Injectable()
export class UtilsProvider {

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    console.log('Hello UtilsProvider Provider');
  }

  presentLoading(duration) {
    let loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
      duration: duration
    });
    loader.present();
  }

  presentToast(message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

}
