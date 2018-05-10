import { DbmanagerProvider } from './../providers/dbmanager/dbmanager';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private sqlite: SQLite,
    public _db: DbmanagerProvider,
    public toastCtrl: ToastController) {

    platform.ready().then(() => {
      this.rootPage = TabsPage;
      this.createDatabase();
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  createDatabase() {

    this.sqlite.create({
      name: 'magna.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this._db.setDatabase(db);
        return this._db.createPointTable();
      })
      .catch(error => {
        console.error(error);
      });

  }

}
