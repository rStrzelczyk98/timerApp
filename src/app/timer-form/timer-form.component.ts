import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Timer, TimerService } from '../service/timer-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html',
  styleUrls: ['./timer-form.component.scss'],
})
export class TimerFormComponent {
  timerForm!: FormGroup;
  timers$!: Observable<Timer[]>;

  constructor(private timerService: TimerService) {
    this.timerForm = new FormGroup(
      {
        label: new FormControl(null),
        hours: new FormControl(null, [
          this.typeValidator(),
          this.minValue(),
          this.maxValue(999),
        ]),
        minutes: new FormControl(null, [
          this.typeValidator(),
          this.minValue(),
          this.maxValue(60),
        ]),
        seconds: new FormControl(null, [
          this.typeValidator(),
          this.minValue(),
          this.maxValue(60),
        ]),
      },
      this.validValues()
    );
    this.timers$ = this.timerService.getTimers();
  }

  onSubmit() {
    const { label, hours, minutes, seconds } = this.timerForm.value;
    this.timerService.addTimer({ label, hours, minutes, seconds });
    this.timerForm.reset();
  }

  private typeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      typeof control.value === null || !isNaN(control.value)
        ? null
        : { invalidType: true };
  }

  private maxValue(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value > value ? { maxValue: true } : null;
  }

  private minValue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value < 0 ? { minValue: true } : null;
  }

  private validValues(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      Object.values(control.value)
        .slice(1)
        .every((value) => !value)
        ? { noValidValues: true }
        : null;
  }
}
