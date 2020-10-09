import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController, IonSlides, PopoverController } from "@ionic/angular";
import { Capability } from "protractor";
import { EstadosState } from "../components/estados/estados-state";
import { MunicipiosState } from "../components/municipios/municipios-state";
import { OptionsPopoverItensComponent } from "../components/options-popover-itens/options-popover-itens.component";
import { OptionsPopoverComponent } from "../components/options-popover/options-popover.component";
import { PesquisaModalComponent } from "../pesquisa-modal/pesquisa-modal.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 200,
  };

  constructor(
    public stateMunicipio: MunicipiosState,
    public stateEstado: EstadosState,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {
    this.stateEstado.BuscarEstados();
    this.stateMunicipio.BuscarMunicipios();
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.slides.startAutoplay().then((x) => console.log);
    // }, 1000);
  }

  async presentModal() {
    this.slides.getActiveIndex().then(async (index) => {
      let mode = index == 0 ? "state" : "city";
      let modal = await this.modalController.create({
        component: PesquisaModalComponent,
        componentProps: {
          mode: mode,
        },
      });

      modal.onDidDismiss().then(() => {
        this.stateEstado.BuscarEstados();
        this.stateMunicipio.BuscarMunicipios();
      });

      await modal.present();
    });
  }

  async presentPopover(ev: any) {
    this.slides.getActiveIndex().then(async (index) => {
      let mode = index == 0 ? "estados" : "municípios";
      const popover = await this.popoverController.create({
        component: OptionsPopoverComponent,
        event: ev,
        componentProps: {
          excluirInfo: mode,
        },
        translucent: true,
        animated: true,
      });

      popover.onDidDismiss().then(() => {
        this.excluirItens(index);
      });

      return await popover.present();
    });
  }

  async excluirItens(index: number) {
    const popover = await this.popoverController.create({
      component: OptionsPopoverItensComponent,
      componentProps: {
        index: index,
      },
      translucent: true,
      animated: true,
    });
    return await popover.present();
  }
}
