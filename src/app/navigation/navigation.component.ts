import { Component } from '@angular/core';
import { TimerService } from '../service/timer-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  selected: string = 'list';
  pauseStream$: Observable<boolean>;
  constructor(private ts: TimerService) {
    this.pauseStream$ = this.ts.getGlobalPause();
  }
  onClick(tab: string) {
    this.selected = tab === 'list' ? 'list' : 'add-timer';
  }

  globalPause() {
    this.ts.globalPause();
  }
}
