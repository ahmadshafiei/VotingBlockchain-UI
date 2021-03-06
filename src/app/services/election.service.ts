import { Injectable } from '@angular/core';
import { HttpService } from './common/http-service.service';
import { Election } from '../model/election/election.model';
import { ElectionSearch } from '../model/election/electionSearch.model';
import { PagedResult } from '../model/common/pagedResult.model';
import { ParticipatedElection } from '../model/election/participatedElection.model';
import { CandidatedElection } from '../model/election/candidatedElection.model';
import { ElectionVote } from '../model/election/electionVote.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor(
    private httpService: HttpService
  ) { }

  getElections(model: ElectionSearch) {
    return this.httpService.get<PagedResult<Election>>('Election/GetElections', model);
  }

  getElection(electionId: number) {
    return this.httpService.get<Election>('Election/GetElection', { electionId: electionId });
  }

  getUnvotedElections() {
    return this.httpService.get<Election[]>('Election/GetUnvotedElections');
  }

  getParticipatedElections() {
    return this.httpService.get<ParticipatedElection[]>('Election/GetParticipatedElections');
  }

  getElectionsVotes() {
    return this.httpService.get<ElectionVote[]>('Election/GetElectionVotes');
  }

  // getCandidatedElections() {
  //   return this.httpService.get<CandidatedElection[]>('Election/GetCandidatedElections');
  // }

  createElection(election: Election) {
    return this.httpService.post('Election/CreateElection', election, true);
  }

  updateElection(election: Election) {
    return this.httpService.patch('Election/UpdateElection', election, true)
  }

  closeElection(electionId: number) {
    return this.httpService.patch('Election/CloseElection', { id: electionId });
  }

  openElection(electionId: number) {
    return this.httpService.patch('Election/OpenElection', { id: electionId });
  }

  removeElection(electionId: number) {
    return this.httpService.delete('Election/RemoveElection', { electionId: electionId });
  }


}
