/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeDateService } from './time-date.service';

describe('Service: TimeDate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeDateService]
    });
  });

  it('should ...', inject([TimeDateService], (service: TimeDateService) => {
    expect(service).toBeTruthy();
  }));
});
