import { EditPointPage } from './../edit-point/edit-point';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DbmanagerProvider } from '../../providers/dbmanager/dbmanager';
import { CreatePointPage } from '../create-point/create-point';
import { UtilsProvider } from "../../providers/utils/utils";
import { PointPage } from '../point/point';

/* Página inicial, donde se listan todos los puntos creados */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variables
  points: any[] = []; // Lista de mis puntos
  isWeb: boolean = false; // Boleano para hacer pruebas

  constructor(public navCtrl: NavController,
    private _db: DbmanagerProvider,
    private _utils: UtilsProvider,
    public modalCtrl: ModalController) { }


  ionViewDidLoad() {
    this.getPoints();
  }

  createPoint() {
    this.navCtrl.push(CreatePointPage); // Al hacer click en el boton azul + , lo envia a la pagina de creacion
  }

  refreshData(refresher) { // Funcion que se dispara cuando se activa el pull and refresh
    setTimeout(() => {
      this.getPoints(); // Traigame todos los puntos
      refresher.complete();
    }, 1000)
  }

  getPoints() {
    this._db.getAllPoints() // Llamado a la base de datos para traer todos los puntos creados
      .then(points => {
        this.points = points; // Asignacion a los puntos
      })
      .catch(error => {
        console.log(error);
      });
  }


  // Funcion para borrar un punto, recibe un punto y su index para ser eliminados de la lista
  deletePoint(point: any, index) {
    this._db.deletePoint(point) // Llamado a la base de datos para poder buscar el punto, y eliminarlo
      .then(response => {
        this._utils.presentToast(JSON.stringify(response), 5000);
        this.points.splice(index, 1);
      })
      .catch(error => {
        this._utils.presentToast(JSON.stringify(error), 5000);
      })
  }

  updatePoint(point, index) { // Mostrar el modal de actualizar
    let editModal = this.modalCtrl.create(EditPointPage, {
      point: point,
      index: index
    });
    editModal.present();
  }

  goToPoint(point?, index?) { // Ir a la página del punto (Detalles del punto)
    this.navCtrl.push(PointPage, { point }).catch( error => this._utils.presentToast('Error: ' + error, 10000 ));
  }

  deleteDatabase() {
    this._db.deleteDatabase();
  }

}
