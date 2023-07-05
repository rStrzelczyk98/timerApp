import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-timer-card',
  template: '',
})
export class MockTimerCard {}

@Component({
  selector: 'app-navigation',
  template: '',
})
export class MockNavigation {}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavigation, MockTimerCard],
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

  it('should render navigation component', () => {
    const nav =
      fixture.debugElement.nativeElement.querySelector('app-navigation');
    expect(nav).toBeTruthy();
  });

  it('should render timer card', () => {
    const timerCard =
      fixture.debugElement.nativeElement.querySelector('app-timer-card');
    expect(timerCard).toBeTruthy();
  });
});
