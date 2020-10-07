import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { IbgeEstado } from "../model/ibge-estado";
import { IbgeMunicipio } from "../model/ibge-municipio";
import { IbgeService } from "../services/ibge.service";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-pesquisa-modal",
  templateUrl: "./pesquisa-modal.component.html",
  styleUrls: ["./pesquisa-modal.component.scss"],
})
export class PesquisaModalComponent implements OnInit {
  estados: Array<IbgeEstado>;
  estadoSelecionado: IbgeEstado;

  searchBarDesabilidado = true;
  municipiosFiltro: Array<IbgeMunicipio>;
  municipios: Array<IbgeMunicipio>;

  constructor(
    public ibgeService: IbgeService,
    public alertController: AlertController,
    public storageService: StorageService,
    public modalController: ModalController
  ) {
    this.ibgeService.municipios$.subscribe((x) => {
      this.municipios = x;
      this.municipiosFiltro = x;
      this.searchBarDesabilidado = !(x != null && x.length > 0);
    });
  }

  ngOnInit() {}

  change(estado) {
    this.estadoSelecionado = estado;
    this.ibgeService.getMunicipios(estado);
  }

  SearchBarAlterado(value: string) {
    if (value == "" || value == null) this.municipiosFiltro = this.municipios;
    else
      this.municipiosFiltro = this.municipios.filter((x) =>
        x.nome.toLowerCase().match(value.toLowerCase())
      );
  }

  async AdicionarMunicipio(municipio: IbgeEstado) {
    console.log(municipio);
    const alert = await this.alertController.create({
      header: municipio.nome,
      subHeader: municipio.sigla,
      message: "Deseja adicionar essa cidade?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Sim",
          handler: async () => {
            console.log("Adicionar", municipio);
            await this.storageService.addMunicipio(municipio.nome);
            this.modalController.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }
}
