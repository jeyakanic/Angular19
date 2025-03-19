
export class Employee {
    id: string ;  // GUID from .NET, stored as a string
    firstName: string;
    lastName: string;
    email: string;
    password: string ;  // Nullable Role (could be null)
    phoneNumber: string ;  // Nullable IsActive (true/false or null)
    gender:string;
    date: Date ;  
    roleId?: string;
    departmentId?: string;
    department?: {
        id?: string;
        department1?: string;
        employees?: any[];
    };
    role?: {
        id?: string;
        role1?: string;
        employees?: any[];
    };
    constructor(data?: Partial<Employee>) {
        this.id = data?.id || '';
        this.firstName = data?.firstName || '';
        this.lastName = data?.lastName || '';
        this.email = data?.email || '';
        this.password = data?.password || '';  // Default to null if undefined
        this.phoneNumber = data?.phoneNumber || '';// data?.PhoneNumber ?? 0;
        this.gender = data?.gender ?? "Female";  // Default to null if undefined
        this.date = data?.date ? new Date(data.date) : new Date();
       this.roleId = data?.roleId;
         this.departmentId= data?.departmentId;
         this.department = {
            id: data?.department?.id || '',
            department1: data?.department?.department1 || '',
            employees: data?.department?.employees || [],
        };

        this.role = {
            id: data?.role?.id || '',
            role1: data?.role?.role1 || '',
            employees: data?.role?.employees || [],
        };
    
}


}