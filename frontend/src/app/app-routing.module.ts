import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPatientComponent } from './patient/list-patient/list-patient.component';

import { CalendarComponent } from './calendar/calendar.component';
import { BpmnComponent } from './bpmn/bpmn.component';
import { ModalrdvComponent } from './modalrdv/modalrdv.component';

const routes: Routes = [
 // { path: 'dashboard', component: DashboardComponent },
 // { path: 'user-profile', component: UserProfileComponent },
 //{ path: '', redirectTo: 'patient', pathMatch: 'full' }, // Redirection vers la page patient par défaut

  { path: 'calendar', component: CalendarComponent },
  { path: 'patient', component: ListPatientComponent },
  { path: 'bpmn/:medExamId', component: BpmnComponent },


  { path: 'process/:medExamId', component: BpmnComponent },
  { path: 'details', component: BpmnComponent }




  /*{
    path: 'bpmn/:medExamId',
    component: ModalrdvComponent,
    children: [
      { path: '', component: BpmnComponent }
    ]
  },*/

 // { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
