import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements DoCheck {
  selected: string = '/';

  constructor(private router: Router) {}

  ngDoCheck(): void {
    this.selected = this.router.url;
  }

  onClick(tab: string) {
    this.selected = tab ? tab : 'add-timer';
  }
}
