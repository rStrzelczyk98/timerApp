import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  private timers: Timer[] = [];

  constructor() {}

  addTimer(timer: Timer) {
    this.timers.push(timer);
  }

  getTimers(): Observable<Timer[]> {
    return of(this.timers);
  }
}
