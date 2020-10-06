import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, concat, forkJoin } from "rxjs";
import { Result } from "../model/covid-model";
import { IbgeEstado } from "../model/ibge-estado";
import { IbgeMunicipio } from "../model/ibge-municipio";
import { CovidService } from "../services/covid.service";

@Injectable({
  providedIn: "root",
})
export class EstadosState {
  private _estados = new BehaviorSubject<Result[]>([]);

  public estados$: Observable<Result[]>;

  /**
   *
   */
  constructor(public covidService: CovidService) {
    this.estados$ = this._estados.asObservable();
  }

  BuscarEstados() {
    let rs = this.covidService.CriarParametros("RS", null, "state");
    let sc = this.covidService.CriarParametros("SC", null, "state");
    let pr = this.covidService.CriarParametros("PR", null, "state");

    forkJoin({
      rs: this.covidService.BuscarDados(rs),
      sc: this.covidService.BuscarDados(sc),
      pr: this.covidService.BuscarDados(pr),
    }).subscribe((estados) => {
      let resultados: Result[] = [];
      resultados = resultados
        .concat(estados.rs.results)
        .concat(estados.sc.results)
        .concat(estados.pr.results);
      this._estados.next(resultados);
    });
  }
}
