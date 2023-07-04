import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent {
  time: number = 585000;
  label: string = 'Label';
  color: string = 'warn';

  pauseTimer() {
    this.color = this.color === 'warn' ? 'primary' : 'warn';
    //functionality will be added with the rxjs streams implementation.
  }
  deleteTimer() {
    //functionality will be added with the rxjs streams implementation.
  }
}
