import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListComponent } from './timer-list.component';
import { MockTimerCard } from '../app.component.spec';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerListComponent, MockTimerCard],
    });
    fixture = TestBed.createComponent(TimerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render timer card', () => {
    const timerCard =
      fixture.debugElement.nativeElement.querySelector('app-timer-card');
    expect(timerCard).toBeTruthy();
  });
});
