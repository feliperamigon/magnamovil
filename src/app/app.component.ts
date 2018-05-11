import { DbmanagerProvider } from './../providers/dbmanager/dbmanager';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

/*
  Este archivo es el archivo entrada de la aplicacion, es el primer componente que se renderiza cuando se inicia la aplicación
*/ 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage; // Define los tabs como pagina principal

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private sqlite: SQLite, // Injeccion de dependencias al componente, todos los componentes externos que se quieren utilizar se definen en el constructor
    public _db: DbmanagerProvider,
    public toastCtrl: ToastController) {

    platform.ready().then(() => {
      this.rootPage = TabsPage;
      this.createDatabase(); // Cuando la aplicación este lista para usar, llama este metodo
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  /* Metodo para crear la base de datos local con SQLite */

  createDatabase() {

    this.sqlite.create({ // .create crea o abre la base de datos
      name: 'magna.db', // Nombre de la base de datos
      location: 'default' // the location field is required
    })
      .then((db) => {
        this._db.setDatabase(db); // Si logra crearla, llama este metodo del DBManagerProvider(Servicio para el manejo de base de datos)
        return this._db.createPointTable(); // Retorna la instancia de la base de datos
      })
      .catch(error => {
        console.error(error); // Si falla en la creación, imprime el error
      });

  }

}
