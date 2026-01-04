import { AfterViewInit, ChangeDetectorRef,Component, EventEmitter, Injectable, Output, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { RoomService } from 'src/app/calendarservice/room.service';
import { Router } from '@angular/router';
import { MedexamService } from '../medexam.service';
import { ModalrdvComponent } from '../modalrdv/modalrdv.component';
import { MatDialog } from '@angular/material/dialog';
import { MedExam,patient } from '../patient';
import { Observable, forkJoin, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit{
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  selectedDate!: Date;
  selectedPatient!:patient;
  calendarApi: any;

  constructor(private changeDetector: ChangeDetectorRef,private medExamService: MedexamService, private router: Router, private dialog: MatDialog) {
  }
  ngAfterViewInit() {
    if (this.calendarComponent) {
      this.calendarApi = this.calendarComponent.getApi();
    }}

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
     timeGridPlugin,
      listPlugin,

    ],

    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this), // Bind the function to the component's context
    events: [
    ]
  }
  handleEventClick(arg: any) {
    // Gérer le clic sur un événement ici
  }

  handleDateClick(arg: any) {
    const dateClickArg: DateClickArg = {
      date: arg.date,
      dateStr: arg.dateStr,
      allDay: arg.allDay,
      dayEl: arg.dayEl,
      jsEvent: arg.jsEvent,
      view: arg.view
      // Ajoutez d'autres propriétés de DateClickArg si nécessaire
    };

    this.selectedDate = new Date(dateClickArg.date);
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate.setHours(this.selectedDate.getHours() ); // Ajouter le décalage horaire

    this.openDialog(this.selectedDate);
  }

    openDialog(selectedDate: Date) {
      console.log('Selected Date:', selectedDate);
      const dialogRef = this.dialog.open(ModalrdvComponent, {
        width: '700px',
        data: { selectedDate: selectedDate,

        }

      });
      dialogRef.componentInstance.selectedDate = selectedDate; // Mettez à jour selectedDate dans le composant ModalrdvComponent

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         /* // Enregistrer le rendez-vous dans la base de données
          result.medExam_TimeStampBegin = selectedDate.toISOString();
          result.medExam_TimeStampEnd = selectedDate.toISOString();
        console.log('RESULT:', result.medExam_TimeStampBegin )
          this.medExamService.createMedExam(result).subscribe(
            (error) => {
              console.error('Erreur lors de la création du rendez-vous :', error);
              // Gérez l'erreur de manière appropriée
            }
          );*/
        }

      });
    }

  calendarVisible!: boolean
  ngOnInit() {
    this.fetchEvents();

     //this.calendarApi = this.calendarComponent?.getApi();

  }

  fetchEvents() {
    this.medExamService.getAllMedExams().subscribe(
      (medExams: MedExam[]) => {
        const events: EventInput[] = medExams
          .filter((medExam: MedExam) => medExam.medExam_Pk != null)
          .map((medExam: MedExam) => ({

            id: medExam.medExam_Ky.toString(),
            title: `${medExam.medExam_Pk.p_kyPatient} -${medExam.medExam_Name}`,
            start: medExam.medExam_TimeStampBegin,
            end: medExam.medExam_TimeStampEnd,
          }));

        this.calendarOptions.events = events;
        this.changeDetector.detectChanges();

      },
      (error) => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );
  }


  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  currentEvents: EventApi[] = [];
  getApi(): any {
    return this.calendarApi;
  }
}


