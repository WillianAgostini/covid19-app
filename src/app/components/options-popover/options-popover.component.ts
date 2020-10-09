import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-options-popover",
  templateUrl: "./options-popover.component.html",
  styleUrls: ["./options-popover.component.scss"],
})
export class OptionsPopoverComponent implements OnInit {
  excluirInfo: string;
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}
  exit() {
    this.popoverController.dismiss(this.excluirInfo);
  }
}
