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
    this.point = navParams.get('point');
    this.index = navParams.get('index');
  }

  ionViewDidLoad() {
  }

  updatePoint() {
    let today = new Date();
    this.point.date = today.toLocaleDateString('es-CO');
    this._db.updatePoint(this.point)
      .then(response => {
        this.viewCtrl.dismiss().then(res => {
          this._utils.presentToast('Punto actualizado correctamente: ' + JSON.stringify(response), 3000);
        });
      })
      .catch(error => {
        this._utils.presentToast(' Error actualizar el punto: ' + + JSON.stringify(error), 3000);
      });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
