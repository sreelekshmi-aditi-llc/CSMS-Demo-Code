import { TestBed } from '@angular/core/testing';

import { LoginServiceService } from './services/login-service.service';

describe('LoginServiceService', () => {
  let service: LoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
