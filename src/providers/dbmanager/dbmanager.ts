import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the DbmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbmanagerProvider {

  constructor(private sqlite: SQLite, public toastCtrl: ToastController) { }

  createDatabase() {
    
    this.sqlite.create({
      name: 'magnadb.db',  // Database name
      location: 'default', // Path where database is gonna be
    }).then((db: SQLiteObject) => { // If database is created succesfully, returns a promise
      db.executeSql('CREATE TABLE IF NOT EXISTS point(id INTEGER PRIMARY KEY, date TEXT, name TEXT, type TEXT, description TEXT)', {})
        .then(res => this.presentToast('Base de datos creada', 1000))
        .catch(e => this.presentToast('Error al crear la base de datos: ' + e, 5000 ));
    }).catch(e => this.presentToast('Error al crear la base de datos: ' + e, 5000 ));

  }

  getAllPoints() {

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
