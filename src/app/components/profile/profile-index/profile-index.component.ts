import { Component, OnInit } from '@angular/core';
import { ElectionService } from 'src/app/services/election.service';
import { ParticipatedElection } from 'src/app/model/election/participatedElection.model';
import { CandidatedElection } from 'src/app/model/election/candidatedElection.model';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {

  public participatedElections: ParticipatedElection[] = [];
  public candidates: CandidatedElection[] = [];

  constructor(
    private electionService: ElectionService
  ) { }

  ngOnInit() {
    this.getParticipatedElections();
    this.getCandidatedElections();
  }

  getCandidatedElections() {
    this.electionService.getCandidatedElections().subscribe(e => {
      this.candidates = e;
      console.log(this.candidates);
    });
  }

  getParticipatedElections() {
    this.electionService.getParticipatedElections().subscribe(e => {
      this.participatedElections = e;
      console.log(this.participatedElections);
    });
  }

}
