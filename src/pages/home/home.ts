import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbmanagerProvider } from '../../providers/dbmanager/dbmanager';
import { CreatePointPage } from '../create-point/create-point';
import {Point} from "../../models/point.model";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variables
  points: any[] = [];

  constructor(public navCtrl: NavController, private _db: DbmanagerProvider, private _utils: UtilsProvider) {
    this.getPoints();
  }

  createPoint() {
    this.navCtrl.push(CreatePointPage);
  }

  getPoints() {
    this._db.getAllPoints().then(res => {
      this.points = res;
      this._utils.presentToast(res, 10000);
    }).catch(err => {
      this._utils.presentToast(err, 10000);
    })
  }

}
