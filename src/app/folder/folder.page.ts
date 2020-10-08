import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CovidService } from "../services/covid.service";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public covidService: CovidService
  ) {}

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  ngOnInit() {
    this.folder = "";
  }
}
