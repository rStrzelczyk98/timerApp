import { Component } from '@angular/core';
import { Timer, TimerService } from '../service/timer-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
})
export class TimerListComponent {
  timers$: Observable<Timer[]>;
  constructor(private ts: TimerService) {
    this.timers$ = this.ts.getTimers();
  }
}
