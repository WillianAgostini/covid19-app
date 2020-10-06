import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { CovidModel } from "../model/covid-model";

@Injectable({
  providedIn: "root",
})
export class CovidService {
  private url = "https://brasil.io/api/dataset/covid19/caso/data";

  constructor(public httpClient: HttpClient) {}

  BuscarDados(params: HttpParams) {
    return this.httpClient.get<CovidModel>(this.url, { params: params });
  }

  CriarParametros(state?: string, city?: string, place_type?: string) {
    // state
    // page
    // is_last
    // city
    // place_type = state | city

    let parametros = new HttpParams().set("is_last", "True");
    if (state) parametros = parametros.set("state", state);
    if (city) parametros = parametros.set("city", city);
    if (place_type) parametros = parametros.set("place_type", place_type);

    return parametros;
  }
}
