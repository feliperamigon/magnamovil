import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { DbmanagerProvider } from '../../providers/dbmanager/dbmanager';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-edit-point',
  templateUrl: 'edit-point.html',
})
export class EditPointPage {

  point: any = {};
  index: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _db: DbmanagerProvider, private _utils: UtilsProvider) {
    this.point = navParams.get('point'); // Se recibe por parametro el punto y el index del mismo para poder actualizarlo, estos vienen de navParams ( dependencia que trae los parametros enviados por el padre)
    this.index = navParams.get('index');
  }

  ionViewDidLoad() {
  }

  /* Funcion que actualiza un punto, solo permite actualizar nombre y descripción */

  updatePoint() {
    let today = new Date();
    this.point.date = today.toLocaleDateString('es-CO'); // Nuevos atributos
    this._db.updatePoint(this.point) // Llamado del update punto proveniente del DB Manager
      .then(response => { // Si logra actualizarlo correctamente
        this.viewCtrl.dismiss().then(res => {
          this._utils.presentToast('Punto actualizado correctamente: ' + JSON.stringify(response), 3000);
        });
      })
      .catch(error => { // Si falla al actualizarlo
        this._utils.presentToast(' Error actualizar el punto: ' + + JSON.stringify(error), 3000);
      });
  }

  // Cierra el modal

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
