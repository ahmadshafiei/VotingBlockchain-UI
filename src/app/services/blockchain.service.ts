import { Injectable } from '@angular/core';
import { HttpService } from './common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(
    private httpService : HttpService
  ) { }

  mine(){
    return this.httpService.get('Blockchain/MineTransaction')
  }
}
