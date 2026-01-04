import { Component, Inject, OnInit } from '@angular/core';
import { Validators , FormControl , FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalpopupComponent } from 'src/app/modalpopup/modalpopup.component';
import { patient } from 'src/app/patient';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent  implements OnInit{
  editdata: any;
  constructor(private service : PatientService, private router :Router, private route: ActivatedRoute,public dialogref: MatDialogRef<UpdatePatientComponent>,@Inject(MAT_DIALOG_DATA) public data:any){}
  Patient?: patient
  ngOnInit(): void {
    if (this.data.patientId != null && this.data.patientId !== '') {
      this.LoadEditData(this.data.patientId);
    }
   /*  let p_kypatient = this.route.snapshot.params['p_kypatient'];
   this.service.getPatientById(p_kypatient).subscribe(data => {
      this.Patient = data
      console.log(this.Patient)
    }) */
  }


ReactiveformUpdate = new FormGroup({
  p_kyPatient: new FormControl({ value: 0, disabled: true }),
  p_Adress: new FormControl("", [Validators.required]),
  p_FirstName: new FormControl("", [Validators.required]),
  p_Name: new FormControl("", [Validators.required]),
  p_Tel: new FormControl("", [Validators.required]),
  p_birthDate: new FormControl("", [Validators.required]),
})

updatePatient(){
  const patientId =this.data.patientId;
 const updatePatient = this.ReactiveformUpdate.value
  console.log(this.data)

  this.service.updatePatient(patientId,updatePatient).subscribe(data => {
    console.log(data);
    alertify.success("update successfully.");
    this.dialogref.close();
  })

  this.router.navigate([this.router.url]);
}

  LoadEditData(p_kyPatient: any) {
  this.service.getPatientById(p_kyPatient).subscribe(item => {
    this.editdata = item;
    this.ReactiveformUpdate.setValue({p_kyPatient:this.editdata.p_kyPatient,
      p_Adress:this.editdata.p_Adress,
      p_FirstName:this.editdata.p_FirstName,
      p_Name:this.editdata.p_Name,
      p_Tel:this.editdata.p_Tel,
      p_birthDate:this.editdata.p_birthDate   })
  });
}
handleModification() {
  // Restez sur la même page en actualisant la route
  this.router.navigateByUrl(this.router.url);
}
}

