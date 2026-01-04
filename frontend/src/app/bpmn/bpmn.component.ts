import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BpmnStepServiceService } from '../bpmn-step-service.service';
import { MedExam, GroupRoom, GroupUser, User, Room, MedExamStep } from '../patient';
import { ActivatedRoute } from '@angular/router';
import { MedexamService } from '../medexam.service';

@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.css']
})
export class BpmnComponent {
  medExamId!: number;
  medExam!: MedExam;
  rowData: any[] = [];
  selectedDate!:Date;
  medExamStep: MedExamStep = new MedExamStep();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private bpmnStePService: BpmnStepServiceService, private medexamService: MedexamService,  private route: ActivatedRoute) {
  }
  //fileInput!: HTMLInputElement;

  /*ngOnInit() {
    //this.fileInput = document.getElementById('fileInput') as HTMLInputElement;
    this.fileInput.addEventListener('change', () => {
      const file = this.fileInput.files![0];*/
      ngAfterViewInit() {
        this.fileInput.nativeElement.addEventListener('change', () => {
          const file = this.fileInput.nativeElement.files![0];
          const reader = new FileReader();
          reader.onload = () => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(reader.result as string, "text/xml");

        const steps = xmlDoc.getElementsByTagName("bpmn:userTask");
        const exclusiveGateway = xmlDoc.getElementsByTagName("bpmn:exclusiveGateway");
        const parallelGateway = xmlDoc.getElementsByTagName("bpmn:parallelGateway");

        const comparators = [...this.getBlocsFromXml('test', exclusiveGateway)];
        const convergence = [...this.getBlocsFromXml('convergence', parallelGateway)];
        const stepsArray = [...this.getBlocsFromXml('activity', steps)];

        const startEvent: any = { type: 'debut' };
        const endEvent: any= { type: 'fin' };

        startEvent.outgoing = xmlDoc.getElementsByTagName("bpmn:startEvent")[0].getElementsByTagName('bpmn:outgoing')[0].innerHTML;
        endEvent.incoming = xmlDoc.getElementsByTagName("bpmn:endEvent")[0].getElementsByTagName('bpmn:incoming')[0].innerHTML;

        const simulationArray = [startEvent, ...comparators, ...convergence, ...stepsArray, endEvent];
        console.log(simulationArray);

        this.globalFunc(simulationArray, steps);



        this.route.queryParams.subscribe(params => {
          this.selectedDate = params['date']; // Récupérer la date sélectionnée depuis les paramètres d'URL

          // Assurez-vous que medExam est initialisé avant de lui assigner les valeurs
          this.medExam = new MedExam();
          this.medExam.medExam_TimeStampBegin = this.selectedDate;
          this.medExam.medExam_TimeStampEnd = this.selectedDate;
          console.log("PARAMS", this.selectedDate);

          // Appeler ici la méthode createMedSteps() ou utiliser this.medExamId dans d'autres parties du composant
        });
      };

      reader.readAsText(file);
    });
    this.route.params.subscribe(params => {
      this.medExamId = +params['medExamId'];
      // Appeler ici la méthode createMedSteps() ou utiliser this.medExamId dans d'autres parties du composant
    });

  }

  async globalFunc(tab: any[], steps: HTMLCollectionOf<Element>) {
    let current = tab[0];
    current.next = current.outgoing;
    this.addElementToList(current.type);

    const val = async () => {
      for (let i = 0; i < steps.length; i++) {
        const userTaskName = steps[i].getAttribute("name");
        if (userTaskName === current.name) {
          const rm = steps[i].getElementsByTagName("myNS:rm")[0];
          const rh = steps[i].getElementsByTagName("myNS:rh")[0];
          const rhName = rh.getAttribute("name")!;
          const rmName = rm.getAttribute("name")!;
          const rmId = rm.getAttribute("id")!;
          const rhId = rh.getAttribute("id")!;
          this.addElementToList(current.name);
          this.addElementToList(rmName);
          this.addElementToList(rhName);

          this.addElementToList(rmId);
          this.addElementToList(rhId);


//User//
const groupUser : GroupUser = new GroupUser();
groupUser.groupUser_Ky=Number(rhId)
const user: User = new User();
user.user_Name=rhName;
user.user_GroupUser_Ky=groupUser;
this.bpmnStePService.createUser(user, groupUser.groupUser_Ky).subscribe(
  () => console.log('user enregistrée avec succès :', user),
  (error: any) => console.error('Erreur lors de l\'enregistrement de User :', error)
);


//Room//
const groupRoom: GroupRoom = new GroupRoom();
groupRoom.GroupRoom_Ky= Number(rmId)
const room: Room = new Room();
room.room_Name =rmName;
console.log(room.room_Name)
room.room_GroupRoomKy = groupRoom;

this.bpmnStePService.createRoom(room, groupRoom.GroupRoom_Ky).subscribe(
  () => console.log('salle enregistrée avec succès :', room),
  (error: any) => console.error('Erreur lors de l\'enregistrement de Room :', error)
);

this.rowData.push({
  current: current.name,
  rhName: rhName,
  rmName: rmName
});

          break;
        }
        current.next = current.outgoing[0];
       // console.log(current.name);
      }
    }

    let i = 1;
    while (i < tab.length - 1) {
      if (tab[i].incoming.find((elt: string) => elt === current.next)) {
        current = tab[i];
        if (current.type === 'activity') {
          const rhName = current.rhName; // Déclarer la variable rhName ici
          const rmName = current.rmName;
         /* await this.bpmnStePService.saveBpmnStep(current) // Enregistrer l'élément actuel dans la base de données
          .subscribe(
            () => console.log('Étape enregistrée avec succès :', current),
            (error: any) => console.error('Erreur lors de l\'enregistrement de l\'étape :', error)
          );*/
          const medExam: MedExam = new MedExam();
          medExam.medExam_Ky=this.medExamId;
          const medExamStep: MedExamStep = new MedExamStep();
          medExamStep.medExamstp_Name=current.name,
          medExamStep.medExamstp_MedExamKy= medExam // Assuming you have the 'medExam' object available
          await this.bpmnStePService.createMedExamStep(medExamStep, medExam.medExam_Ky)
          .subscribe(
            () => console.log('Étape enregistrée avec succès:', medExamStep),
            (error: any) => console.error('Erreur lors de l\'enregistrement de l\'étape:', error)
          );

          val();
          current.next = current.outgoing[0];
          //console.log(current.name);

        } else if (current.type === 'test') {
          if (current.name === 'age <3?') {
            const input = await this.promptModal(current.name);
            current.next = parseInt(input) < 3 ? current.outgoing[0] : current.outgoing[1];
          } else {
            const input = await this.customModal(current.name);
            current.next = input === 'yes' ? current.outgoing[0] : current.outgoing[1];
          }
        } else if (current.type === 'convergence') {
          current.next = current.outgoing[0];
        }
        i = 1;
      } else {
        i++;
      }
    }
    this.addElementToList(tab[tab.length - 1].type);

  }


  customModal(message: string): Promise<string> {
    return new Promise((resolve) => {
      const modal = document.getElementById("myModal")!;
      const modalText = document.getElementById("modal-text")!;
      const modalYes = document.getElementById("modal-yes")!;
      const modalNo = document.getElementById("modal-no")!;

      modalText.textContent = message;
      modal.style.display = "block";

      modalYes.addEventListener("click", () => {
        modal.style.display = "none";
        resolve("yes");
      });

      modalNo.addEventListener("click", () =>{

        modal.style.display = "none";
        resolve("no");
    });
    });
  }
    promptModal(message: string): Promise<string> {
      return new Promise((resolve) => {
        const modal1 = document.getElementById("promptModal")!;
        const modalText = document.getElementById("modal-text1")!;
        const modalOk = document.getElementById("modalOKBtn")!;
        const modalInput = document.getElementById("modalInput") as HTMLInputElement;
        modalInput.placeholder = "Entrez votre âge";
        modalText.textContent = message;
        modal1.style.display = "block";

        modalOk.addEventListener("click", () => {
          const inputVal = modalInput.value;
          modal1.style.display = "none";
          resolve(inputVal);
        });
      });
    }

    addElementToList(elt: string) {
      const listItem = document.createElement("li");
      listItem.textContent = elt;
      document.getElementById("etapes")?.appendChild(listItem);
    }

    getBlocsFromXml(type: string, tab: HTMLCollectionOf<Element>) {
      const array: any[] = [];
      for (let i = 0; i < tab.length; i++) {
        const bloc: any = {};
        const name = tab[i].getAttribute("name");
        bloc.name = name;
        bloc.outgoing = [];
        bloc.incoming = [];
        const outgoing = tab[i].getElementsByTagName('bpmn:outgoing');
        const incoming = tab[i].getElementsByTagName('bpmn:incoming');
        for (let outI = 0; outI < outgoing.length; outI++) {
          const element = outgoing[outI].innerHTML;
          bloc.outgoing.push(element);
        }
        for (let outI = 0; outI < incoming.length; outI++) {
          const element = incoming[outI].innerHTML;
          bloc.incoming.push(element);
        }
        bloc.type = type;
        array.push(bloc);
      }
      return array;
    }
  }





