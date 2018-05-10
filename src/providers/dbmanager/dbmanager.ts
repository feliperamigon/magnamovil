import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DbmanagerProvider {

  db: SQLiteObject = null;

  constructor() {
  }

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  createPointTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS points(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, date TEXT)';
    return this.db.executeSql(sql, []);
  }

  createPoint(point: any){
    let sql = 'INSERT INTO points(name, description, date) VALUES(?,?,?)';
    return this.db.executeSql(sql, [point.name, point.description, point.date]);
  }

  updatePoint(point: any){
    let sql = 'UPDATE points SET name=?, description=?, date=? WHERE id=?';
    return this.db.executeSql(sql, [point.name, point.description, point.date, point.id]);
  }

  deletePoint(point: any){
    let sql = 'DELETE FROM points WHERE id=?';
    return this.db.executeSql(sql, [point.id]);
  }

  getAllPoints(){
    let sql = 'SELECT * FROM points';
    return this.db.executeSql(sql, [])
    .then(response => {
      let points = [];
      for (let index = 0; index < response.rows.length; index++) {
        points.push( response.rows.item(index) );
      }
      return Promise.resolve( points );
    })
    .catch(error => Promise.reject(error));
  }

}
