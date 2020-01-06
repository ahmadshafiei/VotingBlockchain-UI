import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Election } from 'src/app/model/election/election.model';
import { ElectionService } from 'src/app/services/election.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.initElection();
  }

  initElection() {
    this.activatedRoute.queryParams.subscribe(p => {
      if (p.electionAddress) {
        this.editMode = true;
        this.election.address = p.electionAddress;
        this.getElection();
      }
      else
        this.initForm();
    });
  }

  getElection(){
    this.electionService.getElection(this.election.address).subscribe(e =>{
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
  }

  createCandidates(candidates: string[]) {
    const formControls: FormControl[] = [];

    candidates.forEach(c => {
      formControls.push(new FormControl(c, Validators.required));
    });

    //push default value of empty
    if (candidates.length == 0)
      formControls.push(new FormControl('', Validators.required));

    return formControls;
  }

  saveElection() {
    if (this.editMode)
      this.updateElection();
    else
      this.createElection();
  }

  addCandidate() {
    const candidates: string[] = this.f.candidates.value;
    candidates.push('');
    const fcs = this.formBuilder.array(this.createCandidates(candidates));

    this.electionForm.controls.candidates = fcs;
  }

  removeCandidate(candidateIndex: number) {
    const candidates: string[] = this.f.candidates.value;
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

}
