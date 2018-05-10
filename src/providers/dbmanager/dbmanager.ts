import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Point} from "../../models/point.model";


@Injectable()
export class DbmanagerProvider {

  constructor(private sqlite: SQLite) {
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
            resolve(true);
          }).catch(err => {
            console.log('peguelo fallo');
            reject();
          });
      }).catch(err => {
        console.log(err);
        reject();
      });
    });

  }


}
