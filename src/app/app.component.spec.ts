import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-card',
  template: '',
})
export class MockTimerCard {}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockTimerCard],
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'timerApp'`, () => {
    expect(app.title).toEqual('timerApp');
  });

  it('should render timer card', () => {
    const timerCard =
      fixture.debugElement.nativeElement.querySelector('app-timer-card');
    expect(timerCard).toBeTruthy();
  });
});
