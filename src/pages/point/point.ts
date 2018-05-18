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
  latGmsToDecimal: any;
  longGmsToDecimal: any;
  decimalToGMS: any;
  latGaussToGMS: any;
  longGaussToGMS: any;
  gaussToDecimal: any;
  transformationsActive: boolean = false;
  gmsToGauss: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _utils: UtilsProvider, public _magna: MagnaProvider) {
  }

  ionViewDidLoad() {
    this.getCurrentPoint();
    this.decimalTransformations();
  }

  getCurrentPoint() {
    this.point = this.navParams.get('point');
    this._utils.presentToast('Punto recibido: ' + this.point, 5000);
  }

  decimalTransformations(latitud?, longitud?) {
    this.transformationsActive = true;
    this.decimalToGauss = this._magna.decimalToGauss(parseFloat(latitud), parseFloat(longitud));
    this.decimalToGMS = this._magna.decimalToGms(parseFloat(latitud), parseFloat(longitud));
    console.log(this.decimalToGMS);
  }

  gmsTransformations(latGrados?, latMinutos?, latSegundos?, latDireccion?, longGrados?, longMinutos?, longSegundos?, longDireccion?) {
    this.transformationsActive = true;
    this.latGmsToDecimal = this._magna.gmsToDecimal(parseFloat(latGrados), parseFloat(latMinutos), parseFloat(latSegundos), latDireccion.toLowerCase());
    this.longGmsToDecimal = this._magna.gmsToDecimal(parseFloat(longGrados), parseFloat(longMinutos), parseFloat(longSegundos), longDireccion.toLowerCase());
    this.gmsToGauss = this._magna.decimalToGauss(parseFloat(this.latGmsToDecimal.decimal), parseFloat(this.longGmsToDecimal.decimal));
  }

  gaussTransformations(norte, este, origen) {
    this.transformationsActive = true;
    this.gaussToDecimal = this._magna.gaussToGMS(norte, este, origen);
    this.latGaussToGMS = this._magna.decimalToGms(parseFloat(this.gaussToDecimal.latitud_F), 'lat');
    this.longGaussToGMS = this._magna.decimalToGms(parseFloat(this.gaussToDecimal.longitud_F), 'lon');
  }

  generateTransformations(point) {
    switch (point.type) {
      case 'latlng':
        this.decimalTransformations(point.lat, point.long);
        break;

      case 'gms':
        this.gmsTransformations(point.latDegrees, point.latMinutes, point.latSeconds, point.latHemisphire, point.lngDegrees, point.lngMinutes, point.lngSeconds, point.lngHemisphire)
        break;

      case 'gauss':
        this.gaussTransformations(point.north, point.east, point.origin);
        break;

      default:
        break;
    }
  }

}
