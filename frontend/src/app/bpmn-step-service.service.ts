import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedExamStep, Room,  User} from './patient';

@Injectable({
  providedIn: 'root'
})
export class BpmnStepServiceService {
  private url = 'http://localhost:8080/api'; // Remplacez avec l'URL de votre endpoint Spring Boot

  constructor(private http: HttpClient) {}



  saveBpmnStep(bpmnSteps: any[]): Observable<any> {
    return this.http.post(`${this.url}/bpmnsteps`, bpmnSteps);
  }




 /*processData(simulationArray: any[]): Observable<any> {
    const bpmnSteps: BpmnStep[] = simulationArray.map((item: any) => {
      const bpmnStep: BpmnStep = {
        name: item.name,
        type: item.type,
        // Définissez les autres propriétés de l'entité BpmnStep
      };
      return bpmnStep;
    });
    return this.http.post<any>('/api/bpmnsteps', bpmnSteps); // Envoyez les données au backend
  }*/




  /*processDataroom(simulationArray: any[]): Observable<any> {
    const rooms: Room[] = simulationArray.map((item: any) => {
      const room: Room = {
      room_Ky:item.Room_Ky,
      room_Name: item.Room_Name,
      room_GroupRoomKy: item.Room_GroupRoomKy,
      }
      return room;
    });
    return this.http.post<any>(`${this.url}/v1/Room`, rooms);
  }*/
/********************************************************************************************************************* */

createRoom(room: Room, groupRoomId: number): Observable<Room> {
  const url = `${this.url}/v1/Room?groupRoomId=${groupRoomId}`;
  console.log('Données de la requête :', room); // Ajouter cette ligne pour afficher les données envoyées dans la console

  return this.http.post<Room>(url, room);
}


getRoom(): Observable<Room[]> {
  return this.http.get<Room[]>(`${this.url}/v1/Room`);
}

createUser(user: User, groupUserId: number): Observable<User> {
  const url = `${this.url}/v1/User?groupUserId=${groupUserId}`;
  console.log('Données de la requête :', user); // Ajouter cette ligne pour afficher les données envoyées dans la console

  return this.http.post<User>(url, user);
}

getUser(): Observable<User[]> {
  return this.http.get<User[]>(`${this.url}/v1/User`);
}
/******************* medexamstep*/

createMedExamStep(medExamStep: MedExamStep, medExamId: number): Observable<MedExamStep> {
  const url = `${this.url}/v1/medexamsteps?medExamId=${medExamId}`;
  return this.http.post<MedExamStep>(url, medExamStep);
}


}
