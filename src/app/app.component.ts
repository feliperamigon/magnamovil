import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      this.rootPage = TabsPage;
      this.createDatabase();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  createDatabase() {

    this.sqlite.create({
      name: 'magnadb.db',  // Database name
      location: 'default', // Path where database is gonna be
    }).then((db: SQLiteObject) => { // If database is created succesfully, returns a promise
      db.executeSql('CREATE TABLE IF NOT EXISTS point(id INTEGER PRIMARY KEY, date TEXT, name TEXT, type TEXT, description TEXT)', {})
        .then(res => this.presentToast('Base de datos creada', 3000))
        .catch(e => this.presentToast('Error al crear la base de datos: ' + e, 3000 ));
    }).catch(e => this.presentToast('Error al crear la base de datos: ' + e, 3000 ));

  }

  presentToast(message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

}
