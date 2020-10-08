import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "folder",
    pathMatch: "full",
  },
  {
    path: "folder",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "estados",
    loadChildren: () =>
      import("./estados/estados.module").then((m) => m.EstadosPageModule),
  },
  {
    path: "municipios",
    loadChildren: () =>
      import("./municipios/municipios.module").then(
        (m) => m.MunicipiosPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
