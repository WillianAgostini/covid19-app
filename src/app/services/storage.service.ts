import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { DataStorage } from "../model/data-storage";
import { IbgeEstado } from "../model/ibge-estado";
import { IbgeMunicipio } from "../model/ibge-municipio";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private key = "aaah";
  constructor() {}

  async getStorage() {
    let { value } = await Storage.get({ key: this.key });
    let data = JSON.parse(value) as DataStorage;
    if (!data) data = new DataStorage();
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

  async addEstado(estado: IbgeEstado) {
    let storage = await this.getStorage();

    if (!storage.estados.find((x) => x.id == estado.id))
      storage.estados.push(estado);

    await this.saveData(storage);
  }

  async addMunicipio(municipio: IbgeMunicipio) {
    let storage = await this.getStorage();

    if (!storage.municipios.find((x) => x.id == municipio.id))
      storage.municipios.push(municipio);

    await this.saveData(storage);
  }

  async removeEstado(estado: IbgeEstado) {
    let storage = await this.getStorage();
    storage.estados = storage.estados.filter((x) => x.id != estado.id);
    await this.saveData(storage);
  }

  async removeMunicipio(municipio: IbgeMunicipio) {
    let storage = await this.getStorage();
    storage.municipios = storage.municipios.filter((x) => x.id != municipio.id);
    await this.saveData(storage);
  }

  private async saveData(storage: DataStorage) {
    let data = JSON.stringify(storage);
    await Storage.set({
      key: this.key,
      value: data,
    });
  }
}
