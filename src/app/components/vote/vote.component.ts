import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/model/election/election.model';
import { ElectionService } from 'src/app/services/election.service';
import { ElectionCandidate } from 'src/app/model/election/electionCandidate.model';
import { Vote } from 'src/app/model/vote/vote.model';
import { VoteService } from 'src/app/services/vote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  unvotedElections: Election[] = [];

  constructor(
    private electionService: ElectionService,
    private voteService: VoteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUnvotedElections();
  }

  getUnvotedElections() {
    this.electionService.getUnvotedElections().subscribe(e => {
      this.unvotedElections = e;
      this.unvotedElections.forEach(e => {
        e.candidates.forEach(c => c.isSelectedForVoting = false);
      });
    });
  }

  voteCandidate(election: Election, candidate: ElectionCandidate) {
    election.candidates.forEach(c => {
      if (c.candidateAddress !== candidate.candidateAddress)
        c.isSelectedForVoting = false
    });

    setTimeout(() => {
      candidate.isSelectedForVoting = !candidate.isSelectedForVoting;
    }, 0);
  }

  vote() {
    const votedElections: Election[] = this.unvotedElections.filter(e => e.candidates.some(c => c.isSelectedForVoting));

    const votes: Vote[] = votedElections.map(e => new Vote(e.address, e.candidates.find(c => c.isSelectedForVoting).candidateAddress));

    this.voteService.vote(votes).subscribe(() => this.router.navigateByUrl('/Dashboard/Profile'));

  }

}
