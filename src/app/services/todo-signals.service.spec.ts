/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoSignalsService } from './todo-signals.service';

describe('Service: TodoSignals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoSignalsService]
    });
  });

  it('should ...', inject([TodoSignalsService], (service: TodoSignalsService) => {
    expect(service).toBeTruthy();
  }));
});
