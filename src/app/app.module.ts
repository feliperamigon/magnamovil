// Ionic Core Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";

// ThirdParty libraries ( Cordova, Database, etc)
import { NativeStorage} from "@ionic-native/native-storage";
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';

// Custom pages components
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreatePointPage } from '../pages/create-point/create-point';
import { EditPointPage } from './../pages/edit-point/edit-point';
import { PointPage } from '../pages/point/point';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Custom Providers
import { MagnaProvider } from '../providers/magna/magna';
import { DbmanagerProvider } from './../providers/dbmanager/dbmanager';
import { UtilsProvider } from '../providers/utils/utils';

/*
En este archivo se declaran todos los modulos a usar durante el tiempo de ejecucion de la aplicación,
Es el modulo principal de ionic.

*/

@NgModule({
  declarations: [ // Aqui se listan los componentes que se han creados y se declaran para poder ser utilizados en todo el proyecto
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    PointPage,
    CreatePointPage,
    EditPointPage
  ],
  imports: [
    BrowserModule, // Todos los modulos que son de librerias externas se declaran aca
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ // Aqui se listan los componentes que se han creados y se declaran para poder ser utilizados en todo el proyecto
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    PointPage,
    CreatePointPage,
    EditPointPage
  ],
  providers: [ // Aqui se listan todos los servicios que pueden ser inyectados como dependencias en todos los componentes
    StatusBar,
    SplashScreen,
    NativeStorage,
    Toast,
    SQLite,
    MagnaProvider,
    DbmanagerProvider,
    Geolocation,
    UtilsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
