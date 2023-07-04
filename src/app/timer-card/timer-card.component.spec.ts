import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCardComponent } from './timer-card.component';
import { TimePipe } from '../pipe/time.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

describe('TimerCardComponent', () => {
  let component: TimerCardComponent;
  let fixture: ComponentFixture<TimerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerCardComponent, TimePipe],
      imports: [MatButtonModule, MatProgressBarModule],
    });
    fixture = TestBed.createComponent(TimerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method deleteTimer()', () => {
    spyOn(component, 'deleteTimer');
    component.deleteTimer();
    expect(component.deleteTimer).toHaveBeenCalled();
  });

  it('should call method pauseTimer()', () => {
    spyOn(component, 'pauseTimer');
    component.pauseTimer();
    expect(component.pauseTimer).toHaveBeenCalled();
  });
});
