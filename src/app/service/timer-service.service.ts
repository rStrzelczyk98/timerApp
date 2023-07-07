import { Injectable } from '@angular/core';
import { Observable, scan, ReplaySubject } from 'rxjs';

export type Timer = {
  label: string | null;
  totalTime: number;
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timers$ = new ReplaySubject<Timer>();

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
