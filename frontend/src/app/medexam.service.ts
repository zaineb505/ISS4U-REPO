import { Injectable } from '@angular/core';
import { patient,MedExam } from './patient';
import { Observable, Subject , Timestamp, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedexamService {
  private url1 ="http://localhost:8080/api/v1";
  private _refreshrequird = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequird;
  }
  constructor(private http:HttpClient) { }
  createMedExam(medExam: MedExam): Observable<MedExam> {
    const url = `${this.url1}/medexams`;
    console.log('Données de la requête :', medExam); // Ajouter cette ligne pour afficher les données envoyées dans la console
    console.log('medExam_TimeStampBegin:', medExam.medExam_TimeStampBegin.toISOString());
    console.log('medExam_TimeStampEnd:', medExam.medExam_TimeStampEnd.toISOString());
    return this.http.post<MedExam>(url, medExam);
  }
  getAllMedExams(): Observable<MedExam[]> {
    return this.http.get<MedExam[]>(`${this.url1}/MedExam`);
  }

  getAllPatients() {
    return this.http.get<any[]>(`${this.url1}/patients`);
  }
  getAllServices() {
    return this.http.get<any[]>(`${this.url1}/services`);
  }
  getPatientById(patientId: number): Observable<any> {
    const url = `${this.url1}/patient/${patientId}`;
    return this.http.get<any>(url);
  }

  getService(serviceId: number): Observable<any> {
    const url = `${this.url1}/services/${serviceId}`;
    return this.http.get<any>(url);
  }
//ajoutééé
  getMedExamById(medExamId: number): Observable<MedExam> {
    const url = `${this.url1}/medexams/${medExamId}`;
    return this.http.get<MedExam>(url);
  }
  getAllPatientNames(): Observable<string[]> {
    const url = `${this.url1}/patientNames`;
    return this.http.get<string[]>(url);
  }
}
