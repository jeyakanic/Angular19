
export class ProjectEmployee {

    employeeName: string;
    projectName: string;
    role: string;
    leadByEmployee:string;
    employeeId: string ;                                                                                                                                                                                                                                                               
    projectId: string;
    assignedDate?: Date;
    email?:string;
    phone?:string;

    constructor(data?:Partial<ProjectEmployee>)
    {
        this.employeeName = data?.employeeName || "";
        this.projectName= data?.projectName || "";
        this.leadByEmployee =data?.leadByEmployee || "";
        this.role= data?.role || "";
        this. employeeId= data?.employeeId || "";                                                                                                                                                                                                                                                            
        this.projectId= data?.projectId || "";
        this.email=data?.email || "";
        this.phone=data?.phone || "";
        this.assignedDate = data?.assignedDate || new Date;
    }
}
