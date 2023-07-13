import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from '../service/timer-service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements DoCheck {
  selected: string = '/';
  pauseStream$: Observable<boolean>;
  constructor(private router: Router, private ts: TimerService) {
        this.pauseStream$ = this.ts.getGlobalPause();
  }

  ngDoCheck(): void {
    this.selected = this.router.url;
  }

  onClick(tab: string) {
    this.selected = tab ? tab : 'add-timer';
  }

  globalPause() {
    this.ts.globalPause();
  }
}
