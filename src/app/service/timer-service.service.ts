import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  timer,
  filter,
  scan,
  shareReplay,
  takeWhile,
  withLatestFrom,
  tap,
  Subject,
  takeUntil,
  map,
} from 'rxjs';
import { Status } from '../timer-card/timer-card.component';

export type Timer = {
  label: string | null;
  totalTime: number;
  id: number;
  timerStream?: Observable<number>;
  status: BehaviorSubject<Status>;
  destory: Subject<void>;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timers$ = new BehaviorSubject<Timer[]>([]);

  private globalPause$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private tick$: Observable<number> = timer(0, 1000).pipe(
    withLatestFrom(this.globalPause$),
    filter(([tick, pause]) => !pause),
    map(([tick, _]) => tick)
  );

  getTimers(): Observable<Timer[]> {
    return this.timers$.asObservable();
  }

  getGlobalPause() {
    return this.globalPause$.asObservable().pipe(shareReplay(1));
  }

  addTimer(timer: Timer) {
    const array = this.timers$.value;
    if (array.every((el) => el.id !== timer.id)) {
      this.timers$.next([...array, timer]);
    } else {
      const index = this.findIndex(timer.id);
      this.timers$.value[index] = timer;
    }
  }

  removeTimer(id: number) {
    const index = this.findIndex(id);
    this.reset(index);
    this.timers$.value.splice(index, 1);
  }

  updateTimerStatus(id: number, value: boolean) {
    const index = this.findIndex(id);
    this.timers$.value[index].status.next({ active: value });
  }

  getTimerStatus(id: number) {
    const index = this.findIndex(id);
    return this.timers$.value[index].status.asObservable();
  }

  resetTimerStream(id: number) {
    const timer = this.getTimerById(id);
    const index = this.findIndex(id);
    this.reset(index);
    this.addTimer({
      ...timer,
      completed: false,
      timerStream: undefined,
      destory: new Subject<void>(),
      status: new BehaviorSubject<Status>({ active: false }),
    });
  }

  setTimerStream(id: number, stream$: Observable<number>) {
    const index = this.findIndex(id);
    this.timers$.value[index].timerStream = stream$;
  }

  getTimerStream(id: number) {
    const index = this.findIndex(id);
    return this.timers$.value[index].timerStream as Observable<number>;
  }

  setCompletedStatus(id: number, value: boolean) {
    const index = this.findIndex(id);
    this.timers$.value[index].completed = value;
  }

  getCompletedStatus(id: number) {
    const index = this.findIndex(id);
    return this.timers$.value[index].completed;
  }

  timerStream(id: number): Observable<number> {
    const timer = this.getTimerById(id);
    return this.tick$.pipe(
      takeUntil(timer.destory),
      withLatestFrom(timer.status),
      filter(([_, status]) => status.active),
      scan((acc, _) => acc - 1, timer.totalTime),
      takeWhile(Boolean, true),
      tap((time) => {
        if (!time) {
          this.setCompletedStatus(id, true);
          this.alarm();
        }
      }),
      shareReplay(1)
    );
  }

  globalPause(value: boolean = true) {
    this.globalPause$.next(value ? !this.globalPause$.value : false);
  }

  private findIndex(id: number) {
    return this.timers$.value.findIndex((timer) => timer.id === id);
  }

  private getTimerById(id: number): Timer {
    const index = this.findIndex(id);
    return this.timers$.value[index];
  }

  private alarm() {
    new Audio(
      'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav'
    ).play();
  }

  private reset(index: number) {
    this.timers$.value[index].destory.next();
    this.timers$.value[index].destory.complete();
    this.timers$.value[index].status.complete();
  }
}
