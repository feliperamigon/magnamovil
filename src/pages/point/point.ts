import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { MagnaProvider } from '../../providers/magna/magna';


@Component({
  selector: 'page-point',
  templateUrl: 'point.html',
})
export class PointPage {

  point: any;
  decimalToGauss: any;
  transformationsActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _utils: UtilsProvider, public _magna: MagnaProvider) {
  }

  ionViewDidLoad() {
    this.getCurrentPoint();
  }

  getCurrentPoint() {
    this.point = this.navParams.get('point');
    this._utils.presentToast('Punto recibido: ' + this.point, 5000);
  }

  decimalTransformations(latitud, longitud){
    this.transformationsActive = true;
    this.decimalToGauss = this._magna.decimalToGauss(parseFloat(latitud), parseFloat(longitud));
    console.log(this.decimalToGauss);
  }

}
