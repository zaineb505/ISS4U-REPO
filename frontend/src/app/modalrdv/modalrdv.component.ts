import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { EventApi, EventInput, formatDate } from '@fullcalendar/core';
import { Validators , FormControl , FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MedExam } from '../patient';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedexamService } from '../medexam.service';
import { BpmnComponent } from '../bpmn/bpmn.component';
import { MatTabGroup } from '@angular/material/tabs';
import { CalendarComponent } from '../calendar/calendar.component';
@Component({
  selector: 'app-modalrdv',
  templateUrl: './modalrdv.component.html',
  styleUrls: ['./modalrdv.component.css'],

})
export class ModalrdvComponent {
  //@ViewChild('tabGroup') tabGroup: any;
  @ViewChild('tabContentTemplateRef') tabContentTemplate!: TemplateRef<any>; // Declare tabContentTemplate
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  calendarApi: any;

  medExams: MedExam[] = [];
  patients: any[] = [];
  services: any[] = [];
  selectedPatient: any;
  selectedService: any;
  medExam!: MedExam ;
  medExamId!: number;
  showBpmnComponent: boolean = false;
  disableProcessTab: boolean = true;

  Reactiveform!: FormGroup;
  selectedDate!: Date ; // Initialise avec la date actuelle par défaut
  selectedDateTime!: Date;
  constructor(
    private service : MedexamService,
    public dialogRef: MatDialogRef<ModalrdvComponent>,
    private dialog: MatDialog,
    private calendarComponent:CalendarComponent,
    private router :Router,
    private route : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.medExamId = this.data.id;
    console.log(this.medExamId);
   this.selectedDate = this.data.selectedDate; // Assign selected date from dialog data

  }


  ngOnInit(): void {
    //this.selectedDate = this.data.selectedDate; // Récupérez la valeur de selectedDate transmise depuis le composant CalendarComponent
    this.Reactiveform = new FormGroup({
      medExam_Ky: new FormControl({ value: 0, disabled: true }),
      medExam_Name: new FormControl("", [Validators.required]),
      medExam_Note: new FormControl("", [Validators.required]),
      medExam_TimeStampBegin: new FormControl(this.selectedDate.toISOString(), [Validators.required]),
      medExam_TimeStampEnd: new FormControl(this.selectedDate.toISOString(), [Validators.required]),

      MedExam_Srvc: new FormControl("", [Validators.required]),
      MedExam_Pk: new FormControl("", [Validators.required]),

    });

    this.service.getAllPatients().subscribe(
      data => {
        this.patients = data;
        console.log(this.patients); // Vérifier les données récupérées

      },
      error => {
        // Gérez les erreurs
      }
    );

    this.service.getAllServices().subscribe(
      data => {
        this.services = data;
        console.log(this.services); // Vérifier les données récupérées

      },
      error => {
        // Gérez les erreurs
      }
    );

    this.service.getAllMedExams().subscribe(
      data => {
        this.medExams = data;
        console.log(this.medExams); // Affichez les données dans la console pour vérification
      },
      error => {
        // Gérez les erreurs
      }
    );
    //this.medExamId = parseInt(this.route.snapshot.paramMap.get('medExamId') || '');
    this.medExamId = parseInt(this.route.snapshot.paramMap.get('medExamId') || '');

    if (this.selectedDate) {
      this.selectedDateTime = new Date(this.selectedDate); // Convertir en objet Date
      this.selectedDateTime.setHours(this.selectedDateTime.getHours() + 1); // Ajouter le décalage horaire
      //const selectedDateISO = selectedDateTime.toISOString();
      this.Reactiveform.patchValue({
        medExam_TimeStampBegin: this.selectedDate.toISOString().slice(0, 16),
        medExam_TimeStampEnd: this.selectedDate.toISOString().slice(0, 16)
      });
    }


  }

  onSubmit() {
    this.selectedPatient = this.patients.find(patient => patient.p_kyPatient === parseInt(this.Reactiveform.value.MedExam_Pk));
    this.selectedService = this.services.find(service => service.service_Ky === parseInt(this.Reactiveform.value.MedExam_Srvc));
    this.selectedDate = new Date(this.data.selectedDate);

    console.log('selectedPatient:', this.selectedPatient);
    console.log('selectedService:', this.selectedService);
    console.log('selectedDate:', this.selectedDate);
    console.log('medExam_TimeStampBegin:', this.Reactiveform.value.medExam_TimeStampBegin);
    console.log('medExam_TimeStampEnd:', this.Reactiveform.value.medExam_TimeStampEnd);

    if (this.Reactiveform.valid) {
      /*const selectedDateTime = new Date(this.selectedDate); // Convertir en objet Date
      const selectedDateISO = selectedDateTime.toISOString(); // Convertir en format ISO

      this.Reactiveform.patchValue({
        medExam_TimeStampBegin: selectedDateISO.slice(0, 16),
        medExam_TimeStampEnd: selectedDateISO.slice(0, 16)
      });*/


      console.log('Form values:', this.Reactiveform.value);

      const medExamData: MedExam = {
        medExam_Ky:this.Reactiveform.value.medExam_Ky,
        medExam_Name: this.Reactiveform.value.medExam_Name,
        medExam_Note: this.Reactiveform.value.medExam_Note,
        medExam_TimeStampBegin:this.selectedDate,
        medExam_TimeStampEnd:this.selectedDate,
        medExam_Srvc: this.selectedService,
        medExam_Pk: this.selectedPatient,

      };

      this.disableProcessTab = false;

      this.service.createMedExam(medExamData).subscribe(
        (createdMedExam: MedExam) => {


          this.medExamId = createdMedExam.medExam_Ky;
          this.router.navigate(['/process', this.medExamId]);
          createdMedExam.medExam_TimeStampBegin = this.Reactiveform.value.medExam_TimeStampBegin;
          createdMedExam.medExam_TimeStampEnd = this.Reactiveform.value.medExam_TimeStampEnd;
          this.tabGroup.selectedIndex = 1;
          createdMedExam.medExam_TimeStampBegin = this.Reactiveform.value.medExam_TimeStampBegin;
          createdMedExam.medExam_TimeStampEnd = this.Reactiveform.value.medExam_TimeStampEnd;

          console.log('BEGIN' , medExamData.medExam_TimeStampBegin)
    console.log('MedExam créé avec succès:', createdMedExam);
    alertify.success('saved successfully..');
    this.calendarComponent.fetchEvents(); // Appel de la méthode fetchEvents() pour mettre à jour les événements du calendrier

  },

      (error) => {
          console.error('Erreur lors de la création du rendez-vous :', error);
        }
      );


    } else {
      alertify.error("Please Enter valid data.");
    }

  }
  navigateToDetails() {
    this.tabGroup.selectedIndex = 2; // Set the index of the "Details" tab to navigate to it
  }

  navigateToProcess() {
    const url = `/process/${this.medExamId}`;
    this.router.navigateByUrl(url);
  };
  onCancel(): void {
    this.dialogRef.close();
  }
}


