import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController , AlertController, LoadingController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Point } from '../../models/point.model';

declare var google;

@IonicPage()
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
  newPoint: Point;

  created: boolean = false;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController) {
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
      this.presentLoading(1000);
      this.loadMap(this.gpsLat, this.gpsLong);
    }).catch((error) => {
      this.created = false;
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // Updating current position if user is moving around

      this.gpsLat = data.coords.latitude;
      this.gpsLong = data.coords.longitude;

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
      title:'Crear punto',
      message: 'Ingresa un nombre para este nuevo punto',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
        {
          name: 'description',
          placeholder:'Descripción del punto'
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
            this.newPoint = new Point(data.name, data.description, today.toLocaleDateString('es-CO'));
            console.log(this.newPoint);
          }
        }
      ]
    });
    prompt.present();

  }

  presentLoading(duration) {
    let loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
      duration: duration
    });
    loader.present();
  }

}
