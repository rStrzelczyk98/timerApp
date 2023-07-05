import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, reduce, scan, tap } from 'rxjs';

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
  private timers$ = new BehaviorSubject<Timer[]>([]);

  constructor() {}

  getTimers(): Observable<Timer[]> {
    return this.timers$.asObservable();
  }

  addTimer(timer: Timer) {
    this.timers$.next([...this.timers$.value, timer]);
  }
}
