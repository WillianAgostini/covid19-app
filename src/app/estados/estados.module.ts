import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EstadosPageRoutingModule } from "./estados-routing.module";

import { EstadosPage } from "./estados.page";
import { EstadosState } from "./estados-state";
import { CovidService } from "../services/covid.service";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EstadosPageRoutingModule],
  declarations: [EstadosPage],
  providers: [CovidService, EstadosState],
})
export class EstadosPageModule {}
