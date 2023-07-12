import { Component } from '@angular/core';
import { TimerService } from '../service/timer-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  selected: string = 'list';
  constructor(private ts: TimerService) {}
  onClick(tab: string) {
    this.selected = tab === 'list' ? 'list' : 'add-timer';
  }

  globalPause() {
    this.ts.globalPause();
  }
}
