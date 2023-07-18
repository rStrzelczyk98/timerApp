import { Component } from '@angular/core';
import { Timer, TimerService } from '../service/timer-service.service';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
})
export class TimerListComponent {
  timers$: Observable<Timer[]>;
  trash$: Observable<boolean>;

  constructor(private ts: TimerService) {
    this.timers$ = this.ts.getTimers();
    this.trash$ = this.ts.displayTrash();
  }

  drop(event: CdkDragDrop<Timer[]>) {
    this.ts.rearrangeTimers(event.previousIndex, event.currentIndex);
  }

  remove(event: CdkDragDrop<Timer[]>) {
    this.ts.removeTimer(event.previousIndex);
  }

  toggleTrash() {
    this.ts.toggleTrash();
  }
}
