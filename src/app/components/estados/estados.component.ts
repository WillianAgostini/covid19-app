import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PesquisaModalComponent } from "src/app/pesquisa-modal/pesquisa-modal.component";
import { StorageService } from "src/app/services/storage.service";
import { EstadosState } from "./estados-state";

@Component({
  selector: "app-estados",
  templateUrl: "./estados.component.html",
  styleUrls: ["./estados.component.scss"],
})
export class EstadosComponent implements OnInit, OnDestroy {
  constructor(
    public state: EstadosState,
    public modalController: ModalController,
    public storageService: StorageService
  ) {
    this.state.BuscarEstados();
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
