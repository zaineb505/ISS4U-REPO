import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalpopupComponent } from 'src/app/modalpopup/modalpopup.component';
import { PatientService } from 'src/app/patient.service';
import { patient } from 'src/app/patient';
import * as alertify from 'alertifyjs';
import { DatePipe } from '@angular/common';
import { UpdatePatientComponent } from '../update-patient/update-patient.component';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit{
  patients : any [] | undefined
  patientId: any;
  url1 : string ="http://localhost:8080/api/v1"

  constructor(private service :PatientService , private router:Router , private dialog:MatDialog){

  }

    ngOnInit(): void {
    this.GetAllPatients();
      this.service.RequiredRefresh.subscribe(r =>{
        this.GetAllPatients();

      })
  }


  GetAllPatients(){
    this.service.getPatient().subscribe(data => {
      this.patients = data;
      console.log(this.patients)

    })}

     updatePatient(p_kypatient: number){
      this.router.navigate(['update', p_kypatient]);

    }

openDialog(enteranimation:any , exitanimation:any ){
  this.dialog.open(ModalpopupComponent,{
    enterAnimationDuration:enteranimation,
    exitAnimationDuration:exitanimation,
    width: '700px',
  });
}
openDialogUpdate(enteranimation:any , exitanimation:any,p_kypatient:number ){
  this.dialog.open(UpdatePatientComponent,{
    enterAnimationDuration:enteranimation,
    exitAnimationDuration:exitanimation,
    width: '700px',
    data:{
      patientId:p_kypatient
    }
  });
}

DeletePatient(p_kyPatient: number){
  alertify.confirm("delete patient","Do you want to remove?",()=>{
  this.service.deletePatient(p_kyPatient).subscribe(data => {
    alertify.success("Removed successfully.")
    console.log(data)
  }, error => {
    console.error(error);}
  );
},function(){})
  }
  handleModification() {
    // Restez sur la même page en actualisant la route
    this.GetAllPatients();
  }
}


