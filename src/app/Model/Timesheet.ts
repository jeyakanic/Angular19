export class Timesheet
{
    id?: number;
    projectId?: number;
    task?: string;
    date?: Date;
    startTime?: string;
    endTime?: string;
    description?:  string;
    employeeid?: number;
    email?: string;
    projectNavigation?: string;
    employeeFirstName?: string;
    projectName?: string;
    constructor (data: Partial<Timesheet>)
    {
        this.id = data?.id || 0 ;
        this.projectId =  data?.projectId || 0 ;
        this.task =  data?.task || '' ;
        this.date =   data?.date ? new Date(data.date) : new Date();
        this.startTime =   data?.startTime?.toString() || '' ;
        this.endTime =  data?.endTime?.toString() || '' ;
        this. description =    data?.description || '' ;
        this. employeeid =   data?.employeeid || 0 ;
        this. email =  data?.email || '' ;
        this. projectNavigation =  data?.projectNavigation || '' ;
        this.employeeFirstName =data?.employeeFirstName || '';

    }
}