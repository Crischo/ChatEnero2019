import { TestBed, inject } from '@angular/core/testing';

import { ChatObtenerDocenteService } from './chat-obtener-docente.service';

describe('ChatObtenerDocenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatObtenerDocenteService]
    });
  });

  it('should be created', inject([ChatObtenerDocenteService], (service: ChatObtenerDocenteService) => {
    expect(service).toBeTruthy();
  }));
});
