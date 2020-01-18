import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/common/config.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  port;

  constructor(
    private configService : ConfigService
  ) {

  }

  ngOnInit() {
    const cookie = this.configService.getApiPort();
    this.port = cookie ? cookie : 5000;
  }

  save() {
    this.configService.setApiPort(this.port.toString());
  }

}
