import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Point} from "../../models/point.model";
import {ToastController} from "ionic-angular";


@Injectable()
export class DbmanagerProvider {

  constructor(private sqlite: SQLite, private _tc: ToastController ) {
  }

  getAllPoints() {

    return new Promise<any>((resolve, reject) => {
      this.sqlite.create({
        name: 'magnadb.db',  // Database name
        location: 'default', // Path where database is gonna be
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * from point', {})
          .then(res => {
            console.log(res);
            resolve(res);
          })
      }).catch(err => {
        reject();
      });
    });

  }

  createPoint(point: Point): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      this.sqlite.create({
        name: 'magnadb.db',  // Database name
        location: 'default', // Path where database is gonna be
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO point VALUES(?, ?, ?, NULL, ?)', [point.name, point.description, point.date, point.type])
          .then(res => {
            console.log(res);
            this.presentToast(res, 3000);
            resolve(true);
          }).catch(err => {
            console.log('peguelo fallo');
            this.presentToast(err, 3000);
            reject();
          });
      }).catch(err => {
        console.log(err);
        this.presentToast(err, 3000);
        reject();
      });
    });

  }

  presentToast(message: string, duration: number) {
    let toast = this._tc.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

}
