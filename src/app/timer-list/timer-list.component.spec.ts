import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListComponent } from './timer-list.component';
import { MockTimerCard } from '../app.component.spec';
import { of } from 'rxjs';

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

  it('should display message: "Please add a new timer."', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toEqual('Please add a new timer.');
  });

  it('should render timer card', () => {
    component.timers$ = of([{ label: 'test', totalTime: 15, id: 1 }]);
    fixture.detectChanges();
    const timerCard =
      fixture.debugElement.nativeElement.querySelector('app-timer-card');
    expect(timerCard).toBeTruthy();
  });
});
