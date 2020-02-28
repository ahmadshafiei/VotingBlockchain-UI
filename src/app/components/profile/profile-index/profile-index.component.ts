import { Component, OnInit } from '@angular/core';
import { ElectionService } from 'src/app/services/election.service';
import { ParticipatedElection } from 'src/app/model/election/participatedElection.model';
import { ElectionVote, CandidateVotes, ElectionStatus } from 'src/app/model/election/electionVote.model';
import { ChartOptions } from 'chart.js';
import { monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {

  public participatedElections: ParticipatedElection[] = [];
  public elections: ElectionVote[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    private electionService: ElectionService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.getParticipatedElections();
    this.getElections();
  }

  getParticipatedElections() {
    this.electionService.getParticipatedElections().subscribe(e => {
      this.participatedElections = e;
    });
  }

  getElections() {
    this.electionService.getElectionsVotes().subscribe(e => {
      this.elections = e;

      this.elections.forEach(e => {
        e.labels = e.candidates.map(c => c.candidate);
        e.data = e.candidates.map(c => c.totalVotes);
      });
    });
  }

  getChartLabel(candidates: CandidateVotes[]) {
    return candidates.map(c => c.candidate);
  }

  getChartData(candidates: CandidateVotes[]) {
    return candidates.map(c => c.totalVotes);
  }

}
