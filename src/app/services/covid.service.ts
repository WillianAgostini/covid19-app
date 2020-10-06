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

  BuscarDados() {
    this.httpClient
      .get(this.url, { params: this.CriarParametros() })
      .subscribe((dados: CovidModel) => {
        console.log(dados),
          (err: any) => {
            console.log(err);
          };
      });
  }

  CriarParametros() {
    // state
    // page
    // is_last
    // city
    // place_type = state | city
    return new HttpParams()
      .set("state", "RS")
      .set("is_last", "True")
      .set("place_type", "state");
  }
}
