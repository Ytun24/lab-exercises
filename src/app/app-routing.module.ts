import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccumulatedBalanceComponent } from './pages/accumulated-balance/accumulated-balance.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'accumulated-balance', component: AccumulatedBalanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
