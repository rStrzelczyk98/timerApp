import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerListComponent } from './timer-list/timer-list.component';
import { TimerFormComponent } from './timer-form/timer-form.component';

const routes: Routes = [
  { path: '', component: TimerListComponent },
  { path: 'add-timer', component: TimerFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
