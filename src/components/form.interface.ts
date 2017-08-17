export interface User {
  firstname: string;
  lastname: string;
  Addressnickname: string;
  Address:string;
  Appartment:string;
  zipcode:string;
  special:Text;

  account: {
    phone:number;
      
    email: string;
    confirm: string;
  }
}