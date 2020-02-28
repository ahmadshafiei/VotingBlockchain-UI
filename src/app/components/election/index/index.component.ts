import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from '../../../model/election/election.model';
import { ElectionService } from 'src/app/services/election.service';
import { ElectionSearch } from 'src/app/model/election/electionSearch.model';
import { ElectionCandidate } from 'src/app/model/election/electionCandidate.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ElectionIndexComponent implements OnInit {

  searchFilter = new ElectionSearch();

  elections: Election[] = [];
  displayedColumns = ['index', 'name', 'address', 'candidates', 'operation'];

  constructor(
    private electionService: ElectionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getElections();
  }

  getElections() {

    this.electionService.getElections(this.searchFilter).subscribe(e => {
      this.elections = e.items;
      this.searchFilter.totalCount = e.totalCount;
    })
  }

  search() {
    this.searchFilter.pageNumber = 1;
    this.getElections();
  }

  changePage() {

  }

  createElection() {
    this.router.navigate(['Dashboard', 'Election']);
  }

  removeElection(electionId: number) {
    this.electionService.removeElection(electionId).subscribe(() => {
      this.getElections();
    });
  }

  editElection(electionId: number) {
    this.router.navigate(['Dashboard', 'Election'], { queryParams: { electionId: electionId } });
  }

  closeElection(electionId: number) {
    this.electionService.closeElection(electionId).subscribe(() => {
      this.getElections();
    });
  }

  openElection(electionId: number) {
    this.electionService.openElection(electionId).subscribe(() => {
      this.getElections();
    });
  }


}
