import { Injectable } from '@angular/core';
import { Subject, Observable, scan } from 'rxjs';

export type Timer = {
  label: string | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timers$ = new Subject<Timer>();

  constructor() {}

  getTimers(): Observable<Timer[]> {
    return this.timers$.pipe(
      scan((acc: Timer[], val: Timer) => [...acc, val], [])
    );
  }

  addTimer(timer: Timer) {
    this.timers$.next(timer);
  }
}
