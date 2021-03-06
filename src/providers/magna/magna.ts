import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MagnaProvider {

  constructor(public http: HttpClient) {
  }

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

    dec = Math.round((Math.abs(grados) + (minutos / 60) + (segundos / 3600)) * 1000000000) / 1000000000;

    if (isNaN(direccion) || direccion == '') {
      dec = dec * signo;
    }

    return {
      'decimal': dec,
      'valor': dec + "u00b0" + ((isNaN(direccion) || direccion == '') ? (' ' + direccion) : '')
    }

  }

  decimalToGms(valor_lat, valor_lon) {
    var grado_d_lat = valor_lat;
    var grado_d_lon = valor_lon;


    var grd_la, grd_f_la, min_la, segu_la, hemisfer_la, grd_lo, grd_f_lo, min_lo, segu_lo, hemisfer_lo;

    //Calculo Latitud en GMS
    if (grado_d_lat < 0) {

      grd_la = (Math.floor(grado_d_lat)) + 1;

    }
    else {
      grd_la = Math.floor(grado_d_lat);
    }

    grd_f_la = Math.abs(grd_la);

    min_la = Math.floor((Math.abs(grd_la - grado_d_lat)) * 60);

    segu_la = (Math.round(((((Math.abs(grd_la - grado_d_lat)) * 60) - min_la) * 60) * 100000)) / 100000;

    if (grd_la < 0) {

      hemisfer_la = "S";

    }
    else {
      hemisfer_la = "N";
    }


    //Calculo Longitud en GMS

    if (grado_d_lon < 0) {

      grd_lo = (Math.floor(grado_d_lon)) + 1;

    }
    else {
      grd_lo = Math.floor(grado_d_lon);
    }

    grd_f_lo = Math.abs(grd_lo);

    min_lo = Math.floor((Math.abs(grd_lo - grado_d_lon)) * 60);

    segu_lo = (Math.round(((((Math.abs(grd_lo - grado_d_lon)) * 60) - min_lo) * 60) * 100000)) / 100000;

    if (grd_lo < 0) {

      hemisfer_lo = "W";

    }
    else {
      hemisfer_lo = "E";
    }


    let g_la = grd_f_la;
    let m_la = (min_la);
    let s_la = (segu_la);
    let h_la = (hemisfer_la);

    let g_lo = (grd_f_lo);
    let m_lo = (min_lo);
    let s_lo = (segu_lo);
    let h_lo = (hemisfer_lo);

    return {
      g_la: g_la,
      m_la: m_la,
      s_la: s_la,
      h_la: h_la,
      g_lo: g_lo,
      m_lo: m_lo,
      s_lo: s_lo,
      h_lo: h_lo
    }

  }

  gaussToGMS(norte, este, origen) {

    var conv_norte = norte;
    var conv_este = este;
    var def_origen = origen;

    //Constantes base del Elipsoide WGS84

    const conv_a = 6378137;
    const conv_b = 6356752.31414;

    const conv_p_exc = 0.00669438002301188;
    const conv_s_exc = 0.006739496775592;


    //Constantes de Origen

    var falso_norte = 1000000;
    var falso_este = 1000000;
    var N_0 = 491767.53436818265;

    //Constantes Origenes Gauss

    const Insular = -83.07750791666670000;
    const Oeste_Oeste = -80.07750791666670000;
    const Oeste = -77.07750791666670000;
    const Central = -74.07750791666670000;
    const Este = -71.07750791666670000;
    const Este_Este = -68.07750791666670000;


    //Obtener Origen

    let longitud_Org: number = 0;

    if (def_origen == "Insular") {

      longitud_Org = Insular;
    }

    else if (def_origen == "Oeste_Oeste") {

      longitud_Org = Oeste_Oeste;
    }

    else if (def_origen == "Oeste") {

      longitud_Org = Oeste;
    }

    else if (def_origen == "Central") {

      longitud_Org = Central;
    }

    else if (def_origen == "Este") {

      longitud_Org = Este;
    }

    else if (def_origen == "Este_Este") {

      longitud_Org = Este_Este;
    }

    else {
    }
    //Calculo terminos auxiliares para conversion.

    var D_N = conv_norte - N_0;
    var D_E = conv_este - falso_este;
    var n = (conv_a - conv_b) / (conv_a + conv_b);

    //Calculo Latitud Del Punto Guia

    var Alpha_GK_GD = ((conv_a + conv_b) / 2.0) * (1.0 + (Math.pow(n, 2) / 4.0)
      + (Math.pow(n, 4) / 64.0));

    var Beta_GK_GD = (3.0 * n / 2.0) - (27.0 * Math.pow(n, 3) / 32.0)
      + (269.0 * Math.pow(n, 5) / 512.0);

    var Gamma_GK_GD = (21.0 * Math.pow(n, 2) / 16.0) - (55.0 * Math.pow(n, 4) / 32.0);

    var Delta_GK_GD = (151.0 * Math.pow(n, 3) / 96.0) - (417.0 * Math.pow(n, 5) / 128.0);

    var Epsilon_GK_GD = 1097.0 * Math.pow(n, 4) / 512.0;

    var fi_GK_GD = (D_N / Alpha_GK_GD) + (Beta_GK_GD * Math.sin(2.0 * D_N / Alpha_GK_GD))
      + (Gamma_GK_GD * Math.sin(4.0 * D_N / Alpha_GK_GD)) + (Delta_GK_GD * Math.sin(6.0 * D_N / Alpha_GK_GD))
      + (Epsilon_GK_GD * Math.sin(8.0 * D_N / Alpha_GK_GD));

    //Terminos Adicionales

    var t = Math.tan(fi_GK_GD);
    var eta_c_GK_GD = conv_s_exc * Math.pow(Math.cos(fi_GK_GD), 2);
    var N = conv_a / (Math.sqrt(1.0 - (conv_p_exc * Math.pow(Math.sin(fi_GK_GD), 2))));

    //Calculo Latitud

    var latitud_P1 = (t / (2.0 * Math.pow(N, 2))) * (-1.0 - eta_c_GK_GD) * Math.pow(D_E, 2);

    var latitud_P2 = (t / (24.0 * Math.pow(N, 4))) * (5.0 + (3.0 * Math.pow(t, 2))
      + (6.0 * eta_c_GK_GD) - (6.0 * Math.pow(t, 2) * eta_c_GK_GD) - (3.0 * Math.pow(eta_c_GK_GD, 2))
      - (9.0 * Math.pow(t, 2) * Math.pow(eta_c_GK_GD, 2))) * Math.pow(D_E, 4);

    var latitud_P3 = (t / (720.0 * Math.pow(N, 6))) * (-61.0 - (90.0 * Math.pow(t, 2))
      - (45.0 * Math.pow(t, 4)) - (107.0 * eta_c_GK_GD) + (162.0 * Math.pow(t, 2) * eta_c_GK_GD)
      + (45.0 * Math.pow(t, 4) * (eta_c_GK_GD))) * Math.pow(D_E, 6);

    var latitud_P4 = (t / (40320.0 * Math.pow(N, 8))) * (1385.0 + (3633.0 * Math.pow(t, 2))
      + (4096.0 * Math.pow(t, 4)) + (1575.0 * Math.pow(t, 6))) * Math.pow(D_E, 8);

    var latitud_S = fi_GK_GD + latitud_P1 + latitud_P2 + latitud_P3 + latitud_P4;

    var red_lat = (Math.round((latitud_S * 180 / Math.PI) * 1000000000)) / 1000000000;

    let latitud_F = red_lat;

    //Calculo Longitud

    var longitud_P1 = (1.0 / (N * Math.cos(fi_GK_GD))) * (D_E);

    var longitud_P2 = (1.0 / (6.0 * Math.pow(N, 3) * Math.cos(fi_GK_GD))) * (-1.0 - (2.0 * Math.pow(t, 2))
      - (eta_c_GK_GD)) * Math.pow(D_E, 3);

    var longitud_P3 = (1.0 / (120.0 * Math.pow(N, 5) * Math.cos(fi_GK_GD))) * (5.0
      - (28.0 * Math.pow(t, 2)) + (24.0 * Math.pow(t, 4)) + (6.0 * eta_c_GK_GD)
      + (8.0 * Math.pow(t, 2) * (eta_c_GK_GD))) * Math.pow(D_E, 5);

    var longitud_P4 = (1.0 / (5040.0 * Math.pow(N, 7) * Math.cos(fi_GK_GD))) * (-61.0
      - (662.0 * Math.pow(t, 2)) - (1320.0 * Math.pow(t, 4)) - (720.0 * Math.pow(t, 6))) * Math.pow(D_E, 7);

    var longitud_S = (longitud_Org * Math.PI / 180) + longitud_P1 + longitud_P2 + longitud_P3 + longitud_P4;

    var red_lon = (Math.round((longitud_S * 180 / Math.PI) * 1000000000)) / 1000000000;

    let longitud_F = red_lon;

    let respuesta = {
      latitud_F: latitud_F,
      longitud_F: longitud_F
    }

    return respuesta;

  }

  getPolygonData(origen) {

    let url: string = '';
    if (origen === 'Central') {
      url = 'Central.json';
    }
    if (origen === 'Este') {
      url = 'Este.json';
    }
    if (origen === 'Este_Este') {
      url = 'Este_Este.json';
    }
    if (origen === 'Oeste') {
      url = 'Oeste.json';
    }
    if (origen === 'Oeste_Oeste') {
      url = 'Oeste_Oeste.json';
    }

    let file = '../../assets/geojson/'+ url;
    // Angular tiene un modulo HTTP (trasmision de datos).
    return this.http.get('../../assets/geojson/'+ url).map((response: any) => {
      return response.features;
    });

  }

}
