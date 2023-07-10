import { Component, Input, AfterViewInit } from '@angular/core';
import {
  Observable,
  timer,
  tap,
  takeWhile,
  fromEvent,
  map,
  withLatestFrom,
  scan,
  filter,
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
  @Input() id!: number;
  @Input() label!: string;
  color: string = 'primary';
  isPaused: Boolean = true;
  isCompleted: Boolean = false;
  countdown$!: Observable<number>;
  progress$!: Observable<number>;
  private pauseClick$!: Observable<Status>;
  private tick$ = timer(0, 1000);

  ngAfterViewInit(): void {
    this.pauseClick$ = fromEvent(
      document.getElementById('' + this.id) as HTMLButtonElement,
      'click'
    ).pipe(
      map(() => ({
        active: !this.isPaused,
      }))
    );
    this.countdown$ = this.timer(this.timeInSeconds);
    this.progress$ = this.progressBarValue(this.timeInSeconds);
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
    if (!this.isPaused) this.pauseTimer();
    this.countdown$ = this.timer(this.timeInSeconds);
    this.progress$ = this.progressBarValue(this.timeInSeconds);
  }

  private timer(value: number): Observable<number> {
    return this.tick$.pipe(
      withLatestFrom(this.pauseClick$),
      filter(([_, status]) => status.active),
      scan((acc, _) => acc - 1, value),
      takeWhile(Boolean, true)
    );
  }

  private progressBarValue(value: number) {
    return this.countdown$.pipe(
      map((time) => (time * 100) / value),
      tap((progress) => {
        if ((this.isCompleted = !progress)) {
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
