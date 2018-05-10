// Ionic Core Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';

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



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    PointPage,
    CreatePointPage,
    EditPointPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    PointPage,
    CreatePointPage,
    EditPointPage
  ],
  providers: [
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
