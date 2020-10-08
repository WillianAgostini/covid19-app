import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, concat, forkJoin } from "rxjs";
import { CovidModel, Result } from "../../model/covid-model";
import { IbgeEstado } from "../../model/ibge-estado";
import { IbgeMunicipio } from "../../model/ibge-municipio";
import { CovidService } from "../../services/covid.service";
import { StorageService } from "../../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class EstadosState {
  private _estados = new BehaviorSubject<Result[]>([]);

  public estados$: Observable<Result[]>;

  /**
   *
   */
  constructor(
    public covidService: CovidService,
    public storageService: StorageService
  ) {
    this.estados$ = this._estados.asObservable();
  }

  async BuscarEstados() {
    let estados = await this.storageService.getEstados();

    let req = new Array<Observable<CovidModel>>();
    estados.forEach((estado) => {
      let uf = this.covidService.CriarParametros(estado.sigla, null, "state");
      req.push(this.covidService.BuscarDados(uf));
    });

    forkJoin(req).subscribe((estados) => {
      let resultados: Result[] = [];
      estados.forEach((x) => (resultados = resultados.concat(x.results)));
      this._estados.next(resultados);
    });
  }
}
