import { TestBed } from '@angular/core/testing';

import { GestorViajes } from './gestor-viajes';

describe('GestorViajes', () => {
  let service: GestorViajes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorViajes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
