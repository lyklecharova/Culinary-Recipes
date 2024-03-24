export interface User{
    email: string;
    password:string;
    ownerId:string;
}

export interface UserForAuth {
    email: string;
    password: string;
    userId: string;
    token:string;
  }
  