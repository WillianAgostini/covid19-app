import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { CovidModel, Result } from "../model/covid-model";
import { CovidService } from "../services/covid.service";
import { EstadosState } from "./estados-state";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-estados",
  templateUrl: "./estados.page.html",
  styleUrls: ["./estados.page.scss"],
})
export class EstadosPage implements OnInit, OnDestroy {
  estados: Result[];

  constructor(public state: EstadosState) {
    this.state.BuscarEstados();
    this.state.estados$.subscribe((x) => ((this.estados = x), console.log(x)));
  }

  ngOnDestroy(): void {}

  ngOnInit() {}
}
