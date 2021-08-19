import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccumulatedBalanceExtraComponent } from './pages/accumulated-balance-extra/accumulated-balance-extra.component';
import { AccumulatedBalanceComponent } from './pages/accumulated-balance/accumulated-balance.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'accumulated-balance', component: AccumulatedBalanceComponent},
  { path: 'accumulated-balance-extra', component: AccumulatedBalanceExtraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
