import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DbmanagerProvider } from "../../providers/dbmanager/dbmanager";
import { UtilsProvider } from "../../providers/utils/utils";

declare var google;

@Component({
  selector: 'page-create-point',
  templateUrl: 'create-point.html',
})
export class CreatePointPage {

  @ViewChild('map') private mapElement: ElementRef;
  map: any;

  // Point generated by GPS
  gpsLat: any = '';
  gpsLong: any = '';
  newPoint: any = {
    name: '',
    description: '',
    date: ''
  };
  type: string = '';
  latHemisphire: string = '';
  lngHemisphire: string = '';
  gaussOrigin: string = '';

  custom: boolean = false;
  created: boolean = false;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public _db: DbmanagerProvider,
    private _utils: UtilsProvider) {
  }

  loadMap(lat, long) {
    let latLng = new google.maps.LatLng(Number(lat), Number(long));

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }

    if (this.created) {
      setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let newMarker = new google.maps.Marker({
          position: latLng,
          title: 'Nuevo punto',
          animation: google.maps.Animation.BOUNCE
        });
        newMarker.setMap(this.map);
      }, 500)
    }

  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.gpsLat = resp.coords.latitude;
      this.gpsLong = resp.coords.longitude;
      this.created = true;
      this._utils.presentLoading(1000);
      this.loadMap(this.gpsLat, this.gpsLong);
    }).catch((error) => {
      this.created = false;
      console.log('Error getting location', error);
    });

  }

  cleanData() {
    this.gpsLat = '';
    this.gpsLong = '';
    this.created = false;
    this.navCtrl.pop();
  }

  showCreatePrompt() {

    let prompt = this.alertCtrl.create({
      title: 'Crear punto',
      message: 'Ingresa un nombre para este nuevo punto',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
        {
          name: 'description',
          placeholder: 'Descripción del punto'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data: any) => {
            let today = new Date();
            this.newPoint.name = data.name;
            this.newPoint.description = data.description;
            this.newPoint.date = today.toLocaleDateString('es-CO');
            this._db.createPoint(this.newPoint)
              .then(response => {
                this._utils.presentToast('Punto creado correctamente!', 5000);
                this.created = false;
              })
              .catch(error => {
                this._utils.presentToast('Error al crear el punto: ' + JSON.stringify(error), 5000);
              });
          }
        }
      ]
    });
    prompt.present();

  }


}
