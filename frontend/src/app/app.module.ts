import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { HttpClientModule} from '@angular/common/http';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdatePatientComponent } from './patient/update-patient/update-patient.component';
import { AuthComponent } from './auth/auth.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RoomService } from 'src/app/calendarservice/room.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalrdvComponent } from './modalrdv/modalrdv.component';
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { BpmnComponent } from './bpmn/bpmn.component';
import { ROUTES, Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    AddPatientComponent,
    ListPatientComponent,
    ModalpopupComponent,
    UpdatePatientComponent,
    AuthComponent,
    AuthLoginComponent,
    CalendarComponent,
    SidebarComponent,
    ModalrdvComponent,
    BpmnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    FullCalendarModule,
    FontAwesomeModule,
    TabViewModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule

  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
