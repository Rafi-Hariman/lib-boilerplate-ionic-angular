/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiFirebaseService } from './api-firebase.service';

describe('Service: ApiFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFirebaseService]
    });
  });

  it('should ...', inject([ApiFirebaseService], (service: ApiFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
