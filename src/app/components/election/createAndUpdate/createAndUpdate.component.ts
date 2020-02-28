import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Election } from 'src/app/model/election/election.model';
import { ElectionService } from 'src/app/services/election.service';
import { ElectionCandidate } from 'src/app/model/election/electionCandidate.model';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';

@Component({
  selector: 'app-create-update-election',
  templateUrl: './createAndUpdate.component.html',
  styleUrls: ['./createAndUpdate.component.scss']
})
export class ElectionCreateAndUpdateComponent implements OnInit {

  editMode = false;

  electionForm = new FormGroup({});
  election = new Election();

  get f() {
    return this.electionForm.controls;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private electionService: ElectionService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initElection();
  }

  initElection() {
    this.activatedRoute.queryParams.subscribe(p => {
      if (p.electionId) {
        this.editMode = true;
        this.election.id = p.electionId;
        this.getElection();
      }

      this.initForm();
    });
  }

  getElection() {
    this.electionService.getElection(this.election.id).subscribe(e => {
      this.election = e;
      this.initForm();
    });
  }

  initForm() {
    this.electionForm = new FormGroup({
      'id': new FormControl(this.election.id),
      'name': new FormControl(this.election.name),
      'address': new FormControl(this.election.address),
      'candidates': new FormArray(this.createCandidates(this.election.candidates))
    });
    console.log(this.electionForm);
  }

  createCandidates(candidates: ElectionCandidate[]) {
    const formGroups: FormGroup[] = [];

    candidates.forEach(c => {
      formGroups.push(new FormGroup({
        id: new FormControl(c.id),
        electionId: new FormControl(c.electionId),
        candidate: new FormControl(c.candidateAddress, Validators.required)
      }));
    });

    //push default value of empty
    if (candidates.length == 0)
      formGroups.push(new FormGroup({
        id: new FormControl(null),
        electionId: new FormControl(null),
        candidate: new FormControl('', Validators.required)
      }));

    return formGroups;
  }

  saveElection() {
    if (!this.validateElection())
      return;

    if (this.editMode)
      this.updateElection();
    else
      this.createElection();
  }

  addCandidate() {

    const fb = this.formBuilder.group({
      id: null,
      electionId: this.election.id,
      candidate: ''
    });

    (<FormArray>this.electionForm.controls.candidates).push(fb);

  }

  removeCandidate(candidateIndex: number) {
    (<FormArray>this.electionForm.controls.candidates).removeAt(candidateIndex);
  }

  createElection() {

    this.election = this.electionForm.value;
    this.electionService.createElection(this.election).subscribe(() => {
      this.router.navigate(['Dashboard/Elections']);
    });

  }

  updateElection() {

    this.election = this.electionForm.value;
    this.electionService.updateElection(this.election).subscribe();

  }

  validateElection() {
    const election: Election = this.electionForm.value;

    let isValid = true;

    if (!election.name || election.name.length == 0) {
      this.toastr.warning('نام انتخابات را وارد کنید');
      isValid = false;
    }

    if (election.candidates.some(c => !c.candidate || c.candidate.length == 0)) {
      this.toastr.warning('شناسه کاندیدا را وارد کنید');
      isValid = false;
    }

    return isValid;
  }

}
