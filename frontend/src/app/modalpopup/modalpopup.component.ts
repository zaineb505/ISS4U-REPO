import { Component, Inject, OnInit } from '@angular/core';
import { Validators , FormControl , FormGroup } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {
constructor(private service : PatientService, private router :Router, public dialogref: MatDialogRef<ModalpopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any){}

ngOnInit(): void {
  this.service.getPatient().subscribe(data => {
    this.data=data;
  });
 }

Reactiveform = new FormGroup({
  p_kyPatient: new FormControl({ value: 0, disabled: true }),
  p_Adress: new FormControl("", [Validators.required]),
  p_FirstName: new FormControl("", [Validators.required]),
  p_Name: new FormControl("", [Validators.required]),
  p_Tel: new FormControl("", [Validators.required]),
  p_birthDate: new FormControl("", [Validators.required]),
})


  SavePatient(){
    this.data = this.Reactiveform.value;
    console.log(this.data)
 if(this.Reactiveform.valid){
    this.service.createPatient(this.data).subscribe(data => {
      console.log(data);
      alertify.success("saved successfully.")
      this.dialogref.close();
    });
    this.router.navigate([this.router.url]);
  }else{
  alertify.error("Please Enter valid data")
}
  }
  //ajoutttttt
  handleModification() {
    // Restez sur la même page en actualisant la route
    this.router.navigateByUrl(this.router.url);
  }
  }


