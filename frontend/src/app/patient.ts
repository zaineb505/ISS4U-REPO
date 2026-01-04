export interface patient{
  p_kyPatient: number
  P_Adress:String
  P_FirstName:String
  P_Name:String
  P_Tel: String
  P_birthDate:Date

}
export class MedExam{
  medExam_Ky!: number;
  medExam_Name!: string;
  medExam_Note!:string;
  medExam_TimeStampBegin!:Date;
  medExam_TimeStampEnd!:Date;
  medExam_Srvc!:Service;
  medExam_Pk!:patient
}

export class MedExamStep{
  medExamstp_Ky!: number;
  medExamstp_Name!: string;
  medExamstp_MedExamKy!:MedExam
}
export class Service{
  Service_Ky!: number;
  Service_Name!: string;
}
export class User{
  user_Ky!: number;
  user_Name!: string;
  user_GroupUser_Ky!:GroupUser
}
export class Room{
  room_Ky!: number;
  room_Name!: string;
  room_GroupRoomKy!: GroupRoom ;

}
export class GroupUser{
  groupUser_Ky!: number;
  groupUser_Name!: string;
  GroupUser_Srvc!:Service
}
export class GroupRoom{
  GroupRoom_Ky!: number;
  GroupRoom_Name!:string;
  GroupRoom_ServiceArea_Ky!:ServiceArea

}
export class ServiceArea{
  ServiceArea_Ky!: number;
  ServiceArea_Name!: string;
  ServiceArea_Service_Ky!:Service
}
export class MedExamR{
  id!: number;
  roomId!: Room;
  userId!:User;
  medExamStep!:MedExam

}
