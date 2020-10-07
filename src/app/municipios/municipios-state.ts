import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, concat, forkJoin } from "rxjs";
import { CovidModel, Result } from "../model/covid-model";
import { IbgeEstado } from "../model/ibge-estado";
import { IbgeMunicipio } from "../model/ibge-municipio";
import { CovidService } from "../services/covid.service";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class MunicipiosState {
  private _municipio = new BehaviorSubject<Result[]>([]);

  public municipios$: Observable<Result[]>;

  /**
   *
   */
  constructor(
    public covidService: CovidService,
    public storageService: StorageService
  ) {
    this.municipios$ = this._municipio.asObservable();
  }

  async BuscarMunicipios() {
    let municipios = await this.storageService.getMunicipios();

    let req = new Array<Observable<CovidModel>>();
    municipios.forEach((municipio) => {
      if (municipio == null) return;
      let city = this.covidService.CriarParametros(
        null,
        municipio.nome,
        "city"
      );
      req.push(this.covidService.BuscarDados(city));
    });

    forkJoin(req).subscribe((estados) => {
      let resultados: Result[] = [];
      estados.forEach((x) => (resultados = resultados.concat(x.results)));
      this._municipio.next(resultados);
    });
  }
}
