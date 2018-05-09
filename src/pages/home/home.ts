import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbmanagerProvider } from '../../providers/dbmanager/dbmanager';
import { CreatePointPage } from '../create-point/create-point';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variables
  points: any = [];

  constructor(public navCtrl: NavController) {

  }

  createPoint() {
    this.navCtrl.push(CreatePointPage);
  }

}
