import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/models/IEmployee';
import { DatalistService } from 'src/app/services/datalist.service';
import { map } from 'rxjs/operators';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-accumulated-balance',
  templateUrl: './accumulated-balance.component.html',
  styleUrls: ['./accumulated-balance.component.scss'],
})
export class AccumulatedBalanceComponent implements OnInit {
  employees: IEmployee[] = [];
  companyRate = 10;

  constructor(
    private datalistService: DatalistService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.datalistService
      .getEmployeeList()
      .pipe(
        map((employees) =>
          employees.filter((employee: IEmployee) =>
            this.processProvidentFund(employee)
          )
        )
      )
      .subscribe((employees) => {
        this.employees = employees;
      });
  }

  calculateProvidentFundMonths(startDateStr: string): number {
    const dateDiff = this.applicationService.findTimeDiff(startDateStr);
    return (dateDiff.getUTCFullYear() - 1970) * 12 + dateDiff.getUTCMonth() - 3;
  }

  calculateAccumudatedBalances(
    salary: number,
    pvrate: number,
    months: number
  ): number {
    const rate = pvrate / 100;
    const balance = salary * rate * months;
    return balance;
  }

  processProvidentFund(employee: IEmployee) {
    if (employee.employeetype?.toLowerCase() === 'permanent') {
      employee.pvfmonths = employee.startdate
        ? this.calculateProvidentFundMonths(employee.startdate)
        : 0;
      employee.pvfbalances = {};
      employee.pvfbalances.employeeBalances =
        employee.salary && employee.pvfrate && employee.pvfmonths
          ? this.calculateAccumudatedBalances(
              employee.salary,
              employee.pvfrate,
              employee.pvfmonths
            )
          : 0;
      employee.pvfbalances.companyBalances =
        employee.salary && employee.pvfmonths
          ? this.calculateAccumudatedBalances(
              employee.salary,
              this.companyRate,
              employee.pvfmonths
            )
          : 0;
      return true;
    }
    return false;
  }
}
