import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { EstadosState } from "../estados/estados-state";
import { Result } from "../model/covid-model";
import { PesquisaModalComponent } from "../pesquisa-modal/pesquisa-modal.component";
import { StorageService } from "../services/storage.service";
import { MunicipiosState } from "./municipios-state";

@Component({
  selector: "app-municipios",
  templateUrl: "./municipios.page.html",
  styleUrls: ["./municipios.page.scss"],
})
export class MunicipiosPage implements OnInit {
  constructor(
    public state: MunicipiosState,
    public modalController: ModalController
  ) {
    this.state.BuscarMunicipios();
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  async presentModal() {
    let modal = await this.modalController.create({
      component: PesquisaModalComponent,
      componentProps: {
        mode: "city",
        // mode: "state",
      },
    });

    modal.onDidDismiss().then(() => {
      this.state.BuscarMunicipios();
    });

    await modal.present();
  }
}
