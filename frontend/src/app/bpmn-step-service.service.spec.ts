import { TestBed } from '@angular/core/testing';

import { BpmnStepServiceService } from './bpmn-step-service.service';

describe('BpmnStepServiceService', () => {
  let service: BpmnStepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmnStepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
