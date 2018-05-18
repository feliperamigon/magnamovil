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
  plancha: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _utils: UtilsProvider, public _magna: MagnaProvider) {
  }

  ionViewDidLoad() {
    this.getCurrentPoint();
  }

  getCurrentPoint() {
    this.point = this.navParams.get('point');
  }

  decimalTransformations(latitud?, longitud?) {
    this.transformationsActive = true;
    this.decimalToGauss = this._magna.decimalToGauss(parseFloat(latitud), parseFloat(longitud));
    this.decimalToGMS = this._magna.decimalToGms(parseFloat(latitud), parseFloat(longitud));
    this.getPolygon(this.decimalToGauss.norte, this.decimalToGauss.este, this.decimalToGauss.origen);
    // this.getPolygon(1792000, 1140000, 'Central');
  }

  gmsTransformations(latGrados?, latMinutos?, latSegundos?, latDireccion?, longGrados?, longMinutos?, longSegundos?, longDireccion?) {
    this.transformationsActive = true;
    this.latGmsToDecimal = this._magna.gmsToDecimal(parseFloat(latGrados), parseFloat(latMinutos), parseFloat(latSegundos), latDireccion.toLowerCase());
    this.longGmsToDecimal = this._magna.gmsToDecimal(parseFloat(longGrados), parseFloat(longMinutos), parseFloat(longSegundos), longDireccion.toLowerCase());
    this.gmsToGauss = this._magna.decimalToGauss(parseFloat(this.latGmsToDecimal.decimal), parseFloat(this.longGmsToDecimal.decimal));
    this.getPolygon(this.gmsToGauss.norte, this.gmsToGauss.este, this.gmsToGauss.origen);
  }

  gaussTransformations(norte, este, origen) {
    this.transformationsActive = true;
    this.gaussToDecimal = this._magna.gaussToGMS(norte, este, origen);
    this.latGaussToGMS = this._magna.decimalToGms(parseFloat(this.gaussToDecimal.latitud_F), parseFloat(this.gaussToDecimal.longitud_F));
    this.getPolygon(norte, este, origen);
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

  getPolygon(norte, este, origen){
    let polygons = [];
    let polygon = {
      name: '',
      coordinates: []
    };

    this._magna.getPolygonData(origen).subscribe(res => {
      this._utils.presentToast('Respuesta: '+  res.length, 100000);
      for(let jsonPolygon of res) {
        polygon = {
          name: '',
          coordinates: []
        };
        polygon.name = jsonPolygon.properties.PLANCHA;
        polygon.coordinates = jsonPolygon.geometry.coordinates[0];
        polygons.push(polygon);
      }
      this.plancha = this.getNameOfPolygon(norte, este, polygons);
      this._utils.presentToast('Plancha: ' + this.plancha, 50000);
    }, error => { 
      this._utils.presentToast('Error: ' + JSON.stringify(error), 100000);
    });

  }

  getNameOfPolygon(norte, este, polygons) {
    let respuesta: string = 'No se encontró una referencia';
    let cont = 0;

    for(let unit of polygons) {
      if(este >= Math.round(unit.coordinates[0][0]) && este <= Math.round(unit.coordinates[2][0])) {
        if(norte >= Math.round(unit.coordinates[0][1]) && norte <= Math.round(unit.coordinates[2][1])){
          respuesta = unit.name;
        }
      }
    }

    return respuesta;
  }

}
