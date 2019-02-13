import { TestBed } from '@angular/core/testing';

import { TachesDAOService } from './taches-dao.service';

describe('TachesDAOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TachesDAOService = TestBed.get(TachesDAOService);
    expect(service).toBeTruthy();
  });
});
