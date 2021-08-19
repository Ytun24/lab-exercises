import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AccumulatedBalanceComponent } from './pages/accumulated-balance/accumulated-balance.component';
import { HttpClientModule } from '@angular/common/http';
import { AccumulatedBalanceExtraComponent } from './pages/accumulated-balance-extra/accumulated-balance-extra.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeListComponent,
    AccumulatedBalanceComponent,
    AccumulatedBalanceExtraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
