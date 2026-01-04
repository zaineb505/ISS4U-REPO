import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject , tap} from 'rxjs';
import { patient } from './patient';
import { DateClickArg } from '@fullcalendar/interaction';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url1 ="http://localhost:8080/api/v1";
  private _refreshrequird = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequird;
  }
  constructor(private http:HttpClient) { }
  //ajouter patient
  createPatient(patient:patient){
    return this.http.post<patient>(`${this.url1}/patient`,patient).pipe( tap(()=>{
      this.RequiredRefresh.next();
    }
    ));
  }
  //Afficher list des patients
  getPatient():Observable<any[]>{
    return this.http.get<any[]>(this.url1+'/patient')
  }
  //Afficher un patient par id
  getPatientById(p_ky :number):Observable<patient>{
    return this.http.get<patient>(`${this.url1}/patient/${p_ky}`)

  }
  //modifier un patient par id
  updatePatient(p_ky?: number ,patient?: any): Observable<any>{
    return this.http.put<any>(`${this.url1}/patient/${p_ky}`, patient).pipe( tap(()=>{
      this.RequiredRefresh.next();
    }
    ));
  }
  //supprimer un patient
  deletePatient(p_ky: number): Observable<any>{
    return this.http.delete<any>(`${this.url1}/patient/${p_ky}`).pipe( tap(()=>{
      this.RequiredRefresh.next();
    }
    ));
  }
/****************************/

}
