import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PesquisaModalComponent } from "src/app/pesquisa-modal/pesquisa-modal.component";
import { MunicipiosState } from "./municipios-state";

@Component({
  selector: "app-municipios",
  templateUrl: "./municipios.component.html",
  styleUrls: ["./municipios.component.scss"],
})
export class MunicipiosComponent implements OnInit {
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
