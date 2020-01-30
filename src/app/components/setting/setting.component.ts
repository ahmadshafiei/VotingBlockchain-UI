import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/common/config.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  port;
  publicKey: string;

  constructor(
    private configService: ConfigService,
    private blockchainService: BlockchainService,
    private profileService: ProfileService
  ) {

  }

  ngOnInit() {
    const cookie = this.configService.getApiPort();
    this.port = cookie ? cookie : 5000;
    this.getPublicKey();
  }

  save() {
    this.configService.setApiPort(this.port.toString());
  }

  mine() {
    this.blockchainService.mine().subscribe();
  }

  getPublicKey() {
    this.profileService.getPublicKey(this.configService.getCurrentPrivateKey()).subscribe(p => {
      this.publicKey = p.publicKey;
    });
  }

}
