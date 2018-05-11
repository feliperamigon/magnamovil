import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/* Servicio que maneja todas las consultas a la base de datos */

@Injectable()
export class DbmanagerProvider {

  db: SQLiteObject = null; // Instancia de la base de datos

  constructor() {
  }

  /* Funcion que asigna la base de datos a la variable db con la cual haremos todas las consultas, solo se asigna si esta base de datos no existe, de lo contrario usa la que esta en memoria */
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  // Funcion que crea la tabla points con sus atributos
  createPointTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS points(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, date TEXT, lat REAL, long REAL, type TEXT)'; // Query a la DB
    return this.db.executeSql(sql, []); // Retorna el objeto creado con el executeSql - 1 Parametro = Query, 2 Parametro - el body o cuerpo del query ( lo que se quiere crear, actualizar, borrar)
  }

  // Funcion que crea un registro de un punto en la DB
  createPoint(point: any){
    let sql = 'INSERT INTO points(name, description, date, lat, long, type) VALUES(?,?,?, ?, ?, ?)'; // Query a la DB, Asigna los valores a cada campo mediante el operador ? (Evita Ataques como SQLInjection y son buenas practicas)
    return this.db.executeSql(sql, [point.name, point.description, point.date, point.lat, point.long, point.type]);
  }

  // Funcion que actualiza un punto con base a su ID
  updatePoint(point: any){
    let sql = 'UPDATE points SET name=?, description=?, date=? WHERE id=?'; // Query a la DB
    return this.db.executeSql(sql, [point.name, point.description, point.date, point.id]);
  }

  // Funcion que borra un registro de la DB con base a su ID
  deletePoint(point: any){
    let sql = 'DELETE FROM points WHERE id=?'; // Query a la db
    return this.db.executeSql(sql, [point.id]);
  }

  // Funcion que me trae todos los puntos existentes
  getAllPoints(){
    let sql = 'SELECT * FROM points';
    return this.db.executeSql(sql, [])
    .then(response => {
      let points = [];
      for (let index = 0; index < response.rows.length; index++) {
        points.push( response.rows.item(index) );
      }
      return Promise.resolve( points ); // Todas las funciones anteriores retornan PROMESAS (Define como asincrona el tipo de función, es decir, no continua la ejecucion del codigo hasta que la promesa se resuelve)
                                        // Si la promesa se resuelve, las funciones .then() se ejecutan, si la promesa falla, las funciones .catch() se ejecutan
    })
    .catch(error => Promise.reject(error));
  }

}
