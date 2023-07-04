import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer-service.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array', () => {
    service.getTimers().subscribe((timers) => {
      expect(timers).toEqual([]);
    });
  });

  it('should call addTimer()', () => {
    spyOn(service, 'addTimer');
    service.addTimer({
      label: null,
      hours: null,
      minutes: null,
      seconds: null,
    });
    expect(service.addTimer).toHaveBeenCalled();
  });
});
