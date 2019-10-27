import { Component, OnInit } from '@angular/core';
import { Settings as Settings } from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  settings: Settings;
  settingsEdit: Settings;
  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settings = new Settings;
    this.getSetting();
  }

  getSetting(): void {
    this.settingsService.getSettings().subscribe(settings => {
      this.settings = settings;
      this.settingsEdit = JSON.parse(JSON.stringify(settings));
    });
  }
  apply(): void {
    this.settingsService.updateStock(this.settingsEdit).subscribe(
      ()=>{
        this.settings = this.settingsEdit;
        this.settingsEdit = JSON.parse(JSON.stringify(this.settings));
      }
    );
  }

  isChanged(): boolean {
    return JSON.stringify(this.settings) != JSON.stringify(this.settingsEdit);
  }
  cancel() : void {
    this.settingsEdit = JSON.parse(JSON.stringify(this.settings));
  }
}
