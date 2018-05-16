import { Injectable } from '@angular/core';

@Injectable()
export class MagnaProvider {

  constructor() { }

  decimalToGauss(latitud, longitud) {
    var conv_latitud = latitud;
    var conv_longitud = longitud;


    //Constantes base del Elipsoide WGS84 

    const conv_a = 6378137;
    const conv_b = 6356752.31414;

    const conv_p_exc = 0.00669438002301188;
    const conv_s_exc = 0.006739496775592;

    //Constantes Limintes Longitud Origenes Gauss

    const Limit_1 = -66.5775079166667;
    const Limit_2 = -69.5775079166667;
    const Limit_3 = -72.5775079166667;
    const Limit_4 = -75.5775079166667;
    const Limit_5 = -78.5775079166667;
    const Limit_6 = -81.5775079166667;
    const Limit_7 = -84.5775079166667;


    //Constantes Origenes Gauss  

    const Insular = -83.07750791666670000;
    const Oeste_Oeste = -80.07750791666670000;
    const Oeste = -77.07750791666670000;
    const Central = -74.07750791666670000;
    const Este = -71.07750791666670000;
    const Este_Este = -68.07750791666670000;



    //Definicion de origen

    let conv_origen = '';
    let longitud_Org = null;
    let origen = '';

    if (conv_longitud >= Limit_7 && conv_longitud < Limit_6) {

      conv_origen = "Insular";
      longitud_Org = Insular;
    }

    else if (conv_longitud >= Limit_6 && conv_longitud < Limit_5) {

      conv_origen = "Oeste_Oeste";
      longitud_Org = Oeste_Oeste;
    }

    else if (conv_longitud >= Limit_5 && conv_longitud < Limit_4) {

      conv_origen = "Oeste";
      longitud_Org = Oeste;
    }

    else if (conv_longitud >= Limit_4 && conv_longitud <= Limit_3) {

      conv_origen = "Central";
      longitud_Org = Central;
    }

    else if (conv_longitud > Limit_3 && conv_longitud <= Limit_2) {

      conv_origen = "Este";
      longitud_Org = Este;
    }

    else if (conv_longitud > Limit_2 && conv_longitud <= Limit_1) {

      conv_origen = "Este_Este";
      longitud_Org = Este_Este;
    }

    else {
      conv_origen = "La coordenada no se encuentra dentro del territorio Colombiano";
    }

    origen = conv_origen;

    var latitud_Org = 4.59620041666667;


    var latitud_OrgRad = (latitud_Org) * (Math.PI) / 180;
    var longitud_OrgRad = (longitud_Org) * (Math.PI) / 180;

    var falso_norte = 1000000;
    var falso_este = 1000000;


    var latitud_rad = conv_latitud * (Math.PI) / 180;
    var longitud_rad = conv_longitud * (Math.PI) / 180;

    //Calculo terminos auxiliares para conversion.
    var l = longitud_rad - longitud_OrgRad;
    var t = Math.tan(latitud_rad);
    var eta_cuadrado = conv_s_exc * Math.pow(Math.cos(latitud_rad), 2);
    var n = (conv_a - conv_b) / (conv_a + conv_b);
    var N = conv_a / Math.sqrt((1.0 - (conv_p_exc * Math.pow((Math.sin(latitud_rad)), 2))));

    //Calculo arco meridiano
    var Alpha = ((conv_a + conv_b) / 2.0) * (1.0 + (Math.pow(n, 2) / 4.0)
      + (Math.pow(n, 4) / 64.0));

    var Beta = -(3.0 * n / 2.0) + (9.0 * Math.pow(n, 3) / 16.0)
      - (3.0 * Math.pow(n, 5) / 32.0);

    var Gamma = (15.0 * Math.pow(n, 2) / 16.0) - (15.0 * Math.pow(n, 4) / 32.0);

    var Delta = -(35.0 * Math.pow(n, 3) / 48.0) + (105.0 * Math.pow(n, 5) / 256.0);

    var Epsilon = (315.0 * Math.pow(n, 4)) / 512.0;

    // Arco Meridiano punto
    var cal_arco_merid_punto = Alpha * (latitud_rad + (Beta * Math.sin(2.0 * latitud_rad)) + (Gamma * Math.sin(4.0 * latitud_rad))
      + (Delta * Math.sin(6.0 * latitud_rad)) + (Epsilon * Math.sin(8.0 * latitud_rad)));

    // Arco meridiano origen
    var cal_arco_merid_orig = Alpha * (latitud_OrgRad + (Beta * Math.sin(2.0 * latitud_OrgRad)) + (Gamma * Math.sin(4.0 * latitud_OrgRad))
      + (Delta * Math.sin(6.0 * latitud_OrgRad)) + (Epsilon * Math.sin(8.0 * latitud_OrgRad)));

    //Coordenada Norte
    var Dif_arcos = cal_arco_merid_punto - cal_arco_merid_orig;

    var Norte_P1 = (t * N / 2.0) * Math.pow(l, 2) * Math.pow(Math.cos(latitud_rad), 2);

    var Norte_P2 = (t * N / 24.0) * Math.pow(Math.cos(latitud_rad), 4) * (5.0 - Math.pow(t, 2) + (9.0 * eta_cuadrado)
      + (4.0 * Math.pow(eta_cuadrado, 2))) * Math.pow(l, 4);

    var Norte_P3 = (t * N / 720.0) * Math.pow(Math.cos(latitud_rad), 6) * (61.0 - (58.0 * Math.pow(t, 2))
      + Math.pow(t, 4) + (270.0 * eta_cuadrado) - (330.0 * eta_cuadrado * Math.pow(t, 2))) * Math.pow(l, 6);

    var Norte_P4 = (t * N / 40320.0) * Math.pow(Math.cos(latitud_rad), 8) * (1385.0 - (3111.0 * Math.pow(t, 2))
      + (543.0 * Math.pow(t, 4)) - Math.pow(t, 6)) * Math.pow(l, 8);

    let norte = falso_norte + Dif_arcos + Norte_P1 + Norte_P2 + Norte_P3 + Norte_P4;

    //Coordenada Este
    var Este_P1 = N * l * Math.cos(latitud_rad);

    var Este_P2 = (N / 6.0) * Math.pow(Math.cos(latitud_rad), 3) * (1.0 - Math.pow(t, 2) + eta_cuadrado) * (Math.pow(l, 3));

    var Este_P3 = (N / 120.0) * Math.pow(Math.cos(latitud_rad), 5) * (5.0 - (18.0 * Math.pow(t, 2))
      + Math.pow(t, 4) + (14.0 * eta_cuadrado) - (58.0 * Math.pow(t, 2) * eta_cuadrado)) * Math.pow(l, 5);

    var Este_P4 = (N / 5040.0) * Math.pow(Math.cos(latitud_rad), 7) * (61.0 - (479.0 * Math.pow(t, 2))
      + (179.0 * Math.pow(t, 4)) - Math.pow(t, 6)) * Math.pow(l, 7);

    let este = falso_este + Este_P1 + Este_P2 + Este_P3 + Este_P4;

    let response = {
      norte: norte,
      este: este,
      origen: origen
    }

    return response;

  }

  gmsToDecimal(grados, minutos, segundos, direccion) {

    let signo;
    let dec;

    if (direccion) {
      signo = (direccion.toLowerCase() == 'w' ||
        direccion.toLowerCase() == 's') ?
        -1 : 1;
      direccion = (direccion.toLowerCase() == 'w' ||
        direccion.toLowerCase() == 's' ||
        direccion.toLowerCase() == 'n' ||
        direccion.toLowerCase() == 'e') ?
        direccion.toLowerCase() : '';
    }
    else {
      signo = (grados < 0) ? -1 : 1;
      direccion = '';
    }

    dec = Math.round((Math.abs(grados) + ((minutos * 60) + segundos) / 3600) * 1000000) / 1000000;

    if (isNaN(direccion) || direccion == '') {
      dec = dec * signo;
    }

    return {
      'decimal': dec,
      'valor': dec + "u00b0" + ((isNaN(direccion) || direccion == '') ? (' ' + direccion) : '')
    }

  }

  decimalToGms(valor, tipo) {
    var sign = 1, Abs=0;
    var days, minutes, secounds, direction;

    if(valor < 0)  { sign = -1; }
    Abs = Math.abs( Math.round(valor * 1000000));
    //Math.round is used to eliminate the small error caused by rounding in the computer:
    //e.g. 0.2 is not the same as 0.20000000000284
    //Error checks
    if(tipo == "lat" && Abs > (90 * 1000000)){
        //alert(" Degrees Latitude must be in the range of -90. to 90. ");
        return false;
    } else if(tipo == "lon" && Abs > (180 * 1000000)){
        //alert(" Degrees Longitude must be in the range of -180 to 180. ");
        return false;
    }

    days = Math.floor(Abs / 1000000);
    minutes = Math.floor(((Abs/1000000) - days) * 60);
    secounds = ( Math.floor((( ((Abs/1000000) - days) * 60) - minutes) * 100000) *60/100000 ).toFixed();
    days = days * sign;
    if(tipo == 'lat') direction = days<0 ? 'S' : 'N';
    if(tipo == 'lon') direction = days<0 ? 'W' : 'E';
    //else return value     
    return (days * sign) + 'º ' + minutes + "' " + secounds + "'' " + direction;
  }
}
