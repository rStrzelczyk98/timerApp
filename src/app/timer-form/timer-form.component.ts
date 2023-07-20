import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TimerService } from '../service/timer-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Status } from '../timer-card/timer-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html',
  styleUrls: ['./timer-form.component.scss'],
})
export class TimerFormComponent {
  timerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private timerService: TimerService,
    private route: Router
  ) {
    this.createForm();
  }

  onSubmit() {
    const { label, hours, minutes, seconds } = this.timerForm.value;
    const totalTime = this.totalSeconds(+hours, +minutes, +seconds);
    const id = new Date().getTime();
    this.timerService.addTimer({
      label: label ?? 'new timer',
      totalTime,
      id,
      status: new BehaviorSubject<Status>({ active: false }),
      destory: new Subject<void>(),
      completed: false,
    });
    this.timerForm.reset();
    this.route.navigate(['/']);
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
        .every((value) => !(Number(value) > 0))
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

  private totalSeconds(h: number = 0, m: number = 0, s: number = 0): number {
    return h * 60 ** 2 + m * 60 + s;
  }
}
