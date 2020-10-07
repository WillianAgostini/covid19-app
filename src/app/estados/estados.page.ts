import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CovidModel, Result } from "../model/covid-model";
import { PesquisaModalComponent } from "../pesquisa-modal/pesquisa-modal.component";
import { CovidService } from "../services/covid.service";
import { StorageService } from "../services/storage.service";
import { EstadosState } from "./estados-state";
import { Plugins } from "@capacitor/core";
import { TestBed } from "@angular/core/testing";

const { Storage } = Plugins;

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

  constructor(
    public state: EstadosState,
    public modalController: ModalController,
    public storageService: StorageService
  ) {
    this.state.BuscarEstados();
    this.state.estados$.subscribe((x) => ((this.estados = x), console.log(x)));
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  async presentModal() {
    let modal = await this.modalController.create({
      component: PesquisaModalComponent,
      componentProps: {
        // mode: "city",
        mode: "state",
      },
    });

    modal.onDidDismiss().then(() => {
      this.state.BuscarEstados();
    });

    await modal.present();
  }
}
