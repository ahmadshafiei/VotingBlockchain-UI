import { Injectable } from '@angular/core';
import { HttpService } from './common/http-service.service';
import { Vote } from '../model/vote/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private httpService : HttpService
  ) { }

  vote(votes: Vote[]){
    return this.httpService.post('Voting/Vote' , votes);
  }
}
