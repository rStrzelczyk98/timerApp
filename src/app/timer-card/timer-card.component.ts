import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent {
  timeInSeconds: number = 585;
  label: string = 'Label';
  isPaused: Boolean = false;
  color: string = 'warn';

  pauseTimer() {
    this.isPaused = !this.isPaused;
    this.color = this.isPaused ? 'primary' : 'warn';
    //functionality will be added with the rxjs streams implementation.
  }
  deleteTimer() {
    //functionality will be added with the rxjs streams implementation.
  }
}
