import { TestBed } from '@angular/core/testing';

import { MedexamService } from './medexam.service';

describe('MedexamService', () => {
  let service: MedexamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedexamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
