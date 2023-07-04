import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  selected: string = 'list';

  onClick(tab: string) {
    this.selected = tab === 'list' ? 'list' : 'add-timer';
  }
}
