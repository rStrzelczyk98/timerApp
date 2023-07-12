import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [MatTabsModule],
    });
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change selected to "add-timer"', () => {
    expect(component.selected).toEqual('/');
    component.onClick('add-timer');
    expect(component.selected).toEqual('add-timer');
  });
});
