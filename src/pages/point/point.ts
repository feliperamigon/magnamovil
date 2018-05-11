import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';


@Component({
  selector: 'page-point',
  templateUrl: 'point.html',
})
export class PointPage {

  point: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    this.getCurrentPoint();
  }

  getCurrentPoint() {
    this.point = this.navParams.get('point');
    this._utils.presentToast('Punto recibido: ' + this.point, 5000);
  }

}
