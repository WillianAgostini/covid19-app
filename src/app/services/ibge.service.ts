import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { IbgeEstado } from "../model/ibge-estado";
import { IbgeMunicipio } from "../model/ibge-municipio";

@Injectable({
  providedIn: "root",
})
export class IbgeService {
  private _lastEstados: Array<IbgeEstado>;
  private _estados = new BehaviorSubject<Array<IbgeEstado>>([]);
  private _municipios = new BehaviorSubject<Array<IbgeMunicipio>>([]);

  public estados$: Observable<Array<IbgeEstado>>;
  public municipios$: Observable<Array<IbgeMunicipio>>;

  constructor(private http: HttpClient) {
    this.estados$ = this._estados.asObservable();
    this.municipios$ = this._municipios.asObservable();
    this.estados$.subscribe((e) => (this._lastEstados = e));
    this.getEstados();
  }

  getEstados() {
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/";
    this.http
      .get<Array<IbgeEstado>>(url)
      .pipe(retry(3))
      .subscribe(
        (x) => {
          let estados = x.sort((a, b) => a.sigla.localeCompare(b.sigla));
          this._estados.next(estados);
        },
        (err_estados) => {
          console.log("err_estados", err_estados);
          this._estados.next([]);
        }
      );
  }

  getMunicipios(sigla: IbgeEstado) {
    this._municipios.next([]);
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/#/municipios".replace(
      "#",
      sigla.id.toString()
    );

    this.http
      .get<Array<IbgeMunicipio>>(url)
      .pipe(retry(3))
      .subscribe(
        (x) => {
          this._municipios.next(x.sort((a, b) => a.nome.localeCompare(b.nome)));
        },
        (err_estados) => {
          console.log("err_estados", err_estados);
          this._municipios.next([]);
        }
      );
  }
}
