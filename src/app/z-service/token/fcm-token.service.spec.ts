/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FcmTokenService } from './fcm-token.service';

describe('Service: FcmToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmTokenService]
    });
  });

  it('should ...', inject([FcmTokenService], (service: FcmTokenService) => {
    expect(service).toBeTruthy();
  }));
});
