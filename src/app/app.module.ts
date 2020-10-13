import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CovidService } from "./services/covid.service";
import { HttpClientModule } from "@angular/common/http";
import { EstadosState } from "./components/estados/estados-state";
import { PesquisaModalComponent } from "./pesquisa-modal/pesquisa-modal.component";
import { StorageService } from "./services/storage.service";
import { MunicipiosState } from "./components/municipios/municipios-state";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, PesquisaModalComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CovidService,
    EstadosState,
    MunicipiosState,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
