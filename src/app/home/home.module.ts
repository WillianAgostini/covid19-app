import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { MunicipiosComponent } from "../components/municipios/municipios.component";
import { EstadosComponent } from "../components/estados/estados.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, EstadosComponent, MunicipiosComponent],
})
export class HomePageModule {}
