import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerFormComponent } from './timer-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TimerFormComponent', () => {
  let component: TimerFormComponent;
  let fixture: ComponentFixture<TimerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerFormComponent],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(TimerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud have formGroup with initial values set to null', () => {
    const mockFormData = {
      label: null,
      hours: null,
      minutes: null,
      seconds: null,
    };
    expect(component.timerForm.value).toEqual(mockFormData);
  });
});
