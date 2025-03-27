import { TestBed } from '@angular/core/testing';

import { ProjectEmployeeServiceService } from '../../Service/Project/project-employee-service.service';

describe('ProjectEmployeeServiceService', () => {
  let service: ProjectEmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEmployeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
