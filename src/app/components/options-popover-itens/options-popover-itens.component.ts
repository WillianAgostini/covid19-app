import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { IbgeEstado } from "src/app/model/ibge-estado";
import { IbgeMunicipio } from "src/app/model/ibge-municipio";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-options-popover-itens",
  templateUrl: "./options-popover-itens.component.html",
  styleUrls: ["./options-popover-itens.component.scss"],
})
export class OptionsPopoverItensComponent implements OnInit {
  index: number;
  estados: IbgeEstado[];
  municipios: IbgeMunicipio[];
  constructor(
    public storageService: StorageService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.BuscarDados();
  }

  async BuscarDados() {
    if (this.index == 0) this.estados = await this.storageService.getEstados();
    if (this.index == 1)
      this.municipios = await this.storageService.getEstados();
  }

  ExcluirDados() {
    let state = this.estados?.filter((x) => x.isChecked == true);
    let city = this.municipios?.filter((x) => x.isChecked == true);

    state?.forEach(async (x) => await this.storageService.removeEstado(x));
    city?.forEach(async (x) => await this.storageService.removeMunicipio(x));

    this.popoverController.dismiss();
  }
}
