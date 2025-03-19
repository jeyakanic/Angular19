export class Employee{
    id: string;  // GUID from .NET, stored as a string
    userName: string;
    password: string;
    email: string;
    role: string | null;  // Nullable Role (could be null)
    isActive: string | null;  // Nullable IsActive (true/false or null)
    createdAt: Date | null;  

constructor()
{
    this.id="";  // GUID from .NET, stored as a string
    this.userName="";
   this. password ="";
    this.email="";
    this.role="";  // Nullable Role (could be null)
   this. isActive="";  // Nullable IsActive (true/false or null)
    this.createdAt=new Date();  
}
}