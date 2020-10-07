import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { DataStorage } from "../model/data-storage";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  async getStorage() {
    let { value } = await Storage.get({ key: "@zz" });
    let data = JSON.parse(value) as DataStorage;
    if (!data) data = new DataStorage();
    console.log("Got item: ", data);
    return data;
  }

  async getEstados() {
    let data = await this.getStorage();
    return data.estados;
  }

  async getMunicipios() {
    let data = await this.getStorage();
    return data.municipios;
  }

  async addEstado(estado: string) {
    let storage = await this.getStorage();

    if (!storage.estados.includes(estado)) storage.estados.push(estado);

    await this.saveData(storage);
  }

  async addMunicipio(municipio: string) {
    let storage = await this.getStorage();

    if (!storage.municipios.includes(municipio))
      storage.municipios.push(municipio);

    await this.saveData(storage);
  }

  private async saveData(storage: DataStorage) {
    let data = JSON.stringify(storage);
    await Storage.set({
      key: "@zz",
      value: data,
    });
  }
}
