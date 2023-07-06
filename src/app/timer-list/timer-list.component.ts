import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
})
export class TimerListComponent {
  testData = [
    { id: 'timer-1', time: 10 },
    { id: 'timer-2', time: 300 },
    { id: 'timer-3', time: 600 },
  ];
}
