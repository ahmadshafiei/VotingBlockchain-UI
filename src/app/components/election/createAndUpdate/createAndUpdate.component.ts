import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Election } from 'src/app/model/election/election.model';
import { ElectionService } from 'src/app/services/election.service';
import { ElectionCandidate } from 'src/app/model/election/electionCandidate.model';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-election',
  templateUrl: './createAndUpdate.component.html',
  styleUrls: ['./createAndUpdate.component.scss']
})
export class ElectionCreateAndUpdateComponent implements OnInit {

  editMode = false;

  electionForm: FormGroup;
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
      else
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
      'name': new FormControl(this.election.name),
      'address': new FormControl(this.election.address),
      'candidates': new FormArray(this.createCandidates(this.election.candidates))
    });
    console.log(this.electionForm)
  }

  createCandidates(candidates: ElectionCandidate[]) {
    const formGroups: FormGroup[] = [];

    candidates.forEach(c => {
      formGroups.push(new FormGroup({
        id: new FormControl(c.id),
        electionId: new FormControl(c.electionId),
        candidate: new FormControl(c.candidate, Validators.required)
      }));
    });

    //push default value of empty
    if (candidates.length == 0)
      formGroups.push(new FormGroup({
        candidate: new FormControl(null, Validators.required)
      }));

    return formGroups;
  }

  saveElection() {
    if (this.validateElection())
      return;

    if (this.editMode)
      this.updateElection();
    else
      this.createElection();
  }

  addCandidate() {
    const candidates: ElectionCandidate[] = this.f.candidates.value;
    candidates.push(new ElectionCandidate());

    const fcs = this.formBuilder.array(this.createCandidates(candidates));

    this.electionForm.controls.candidates = fcs;
  }

  removeCandidate(candidateIndex: number) {
    const candidates: ElectionCandidate[] = this.f.candidates.value;
    candidates.splice(candidateIndex, 1);
    const fcs = this.formBuilder.array(this.createCandidates(candidates));

    this.electionForm.controls.candidates = fcs;
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
