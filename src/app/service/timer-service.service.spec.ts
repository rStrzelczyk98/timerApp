import { TestBed, fakeAsync, tick } from '@angular/core/testing';

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

  it('should have array with one element', () => {
    service.addTimer({
      label: null,
      totalTime: 0,
      id: 1,
    });
    service.getTimers().subscribe((array) => {
      expect(array.length).toEqual(1);
    });
  });

  it('should return null', () => {
    service.getTimers().subscribe((array) => {
      expect(array.length).toEqual(1);
    });
  });
});
