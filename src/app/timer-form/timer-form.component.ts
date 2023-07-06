import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
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

  constructor(private fb: FormBuilder, private timerService: TimerService) {
    this.createForm();
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

  private validValues(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      Object.values(control.value)
        .slice(1)
        .every((value) => !value)
        ? { noValidValues: true }
        : null;
  }

  private createForm() {
    this.timerForm = this.fb.group({
      label: null,
      hours: [
        null,
        [this.typeValidator(), Validators.min(0), Validators.max(999)],
      ],
      minutes: [
        null,
        [this.typeValidator(), Validators.min(0), Validators.max(60)],
      ],
      seconds: [
        null,
        [this.typeValidator(), Validators.min(0), Validators.max(60)],
      ],
    });
    this.timerForm.addValidators(this.validValues());
  }
}
