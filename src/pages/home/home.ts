import { EditPointPage } from './../edit-point/edit-point';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DbmanagerProvider } from '../../providers/dbmanager/dbmanager';
import { CreatePointPage } from '../create-point/create-point';
import { UtilsProvider } from "../../providers/utils/utils";
import { PointPage } from '../point/point';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variables
  points: any[] = [];
  isWeb: boolean = false;

  constructor(public navCtrl: NavController,
    private _db: DbmanagerProvider,
    private _utils: UtilsProvider,
    public modalCtrl: ModalController) { }


  ionViewDidLoad() {
    this.getPoints();
  }

  createPoint() {
    this.navCtrl.push(CreatePointPage);
  }

  refreshData(refresher) {
    setTimeout(() => {
      this.getPoints();
      refresher.complete();
    }, 1000)
  }

  getPoints() {
    this._db.getAllPoints()
      .then(points => {
        this.points = points;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deletePoint(point: any, index) {
    this._db.deletePoint(point)
      .then(response => {
        this._utils.presentToast(JSON.stringify(response), 5000);
        this.points.splice(index, 1);
      })
      .catch(error => {
        this._utils.presentToast(JSON.stringify(error), 5000);
      })
  }

  updatePoint(point, index) {
    let editModal = this.modalCtrl.create(EditPointPage, {
      point: point,
      index: index
    });
    editModal.present();
  }

  goToPoint(point, index) {
    this.navCtrl.push(PointPage);
  }

}
