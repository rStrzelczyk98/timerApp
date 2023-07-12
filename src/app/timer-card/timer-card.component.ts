import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { TimerService } from '../service/timer-service.service';

export type Status = {
  active: boolean;
};
@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent implements AfterViewInit, OnDestroy {
  @Input() timeInSeconds!: number;
  @Input() id!: number;
  @Input() label!: string;
  color: string = 'primary';
  isPaused!: boolean;
  isCompleted: boolean = false;
  countdown$!: Observable<number>;
  progress$!: Observable<number>;
  private sub!: Subscription;

  constructor(private ts: TimerService) {}

  ngAfterViewInit(): void {
    this.setStreams();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pauseTimer() {
    this.isPaused = !this.isPaused;
    this.ts.updateTimerStatus(this.id, this.isPaused);
    this.toggleButtonColor();
  }

  deleteTimer() {
    this.ts.removeTimer(this.id);
  }

  reloadTimer() {
    if (!this.isPaused) this.pauseTimer();
    this.ts.updateTimerStatus(this.id, false);
    this.resetStreams();
  }

  private progressBarValue(value: number) {
    return this.countdown$.pipe(
      map((time) => (time * 100) / value),
      tap((time) => {
        if (!time) this.timerProgressStatus();
      })
    );
  }

  private setStreams() {
    setTimeout(() => {
      if (!this.ts.getTimerStream(this.id)) {
        this.ts.setTimerStream(this.id, this.ts.timerStream(this.id));
      }
      this.timerProgressStatus();
      this.sub = this.ts
        .getTimerStatus(this.id)
        .subscribe(({ active }) => (this.isPaused = active));
      this.toggleButtonColor();
      this.countdown$ = this.ts.getTimerStream(this.id);
      this.progress$ = this.progressBarValue(this.timeInSeconds);
    });
  }

  private resetStreams() {
    setTimeout(() => {
      this.ts.resetTimerStream(this.id);
    });
  }

  private timerProgressStatus() {
    this.isCompleted = this.ts.getCompletedStatus(this.id);
  }

  private toggleButtonColor() {
    this.color = !this.isPaused ? 'primary' : 'warn';
  }
}
