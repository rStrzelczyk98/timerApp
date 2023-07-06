import { Component, Input, AfterViewInit } from '@angular/core';
import {
  Observable,
  timer,
  tap,
  takeWhile,
  fromEvent,
  map,
  switchMap,
  NEVER,
  withLatestFrom,
  scan,
  of,
} from 'rxjs';

export type Status = {
  active: boolean;
};
@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent implements AfterViewInit {
  @Input() timeInSeconds!: number;
  @Input() id!: string;
  label: string = 'Label';
  color: string = 'primary';
  isPaused: Boolean = true;
  isCompleted: Boolean = false;
  progress: number = 100;
  countdown$!: Observable<number>;
  private pauseClick$!: Observable<Status>;
  private tick$ = timer(0, 1000);

  ngAfterViewInit(): void {
    this.pauseClick$ = fromEvent(
      document.getElementById(this.id) as HTMLButtonElement,
      'click'
    ).pipe(
      map(() => ({
        active: !this.isPaused,
      }))
    );
    this.countdown$ = this.timer(this.timeInSeconds);
  }

  pauseTimer() {
    this.isPaused = !this.isPaused;
    this.color = this.isPaused ? 'primary' : 'warn';
  }

  deleteTimer() {
    //functionality will be added with the rxjs streams implementation.
  }

  reloadTimer() {
    this.isCompleted = false;
    this.progress = 100;
    if (!this.isPaused) this.pauseTimer();
    this.countdown$ = this.timer(this.timeInSeconds);
  }

  timer(value: number): Observable<number> {
    return this.tick$.pipe(
      map(() => 1),
      withLatestFrom(this.pauseClick$),
      switchMap(([seconds, status]) => (!status.active ? NEVER : of(seconds))),
      scan((acc, val) => acc - val, value),
      tap((timeLeft) => (this.progress = (timeLeft * 100) / value)),
      takeWhile(Boolean, true),
      tap(() => {
        if ((this.isCompleted = !this.progress)) {
          this.alarm();
        }
      })
    );
  }

  private alarm() {
    new Audio(
      'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav'
    ).play();
  }
}
