import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IEmployee } from 'src/app/models/IEmployee';
import { ApplicationService } from 'src/app/services/application.service';
import { DatalistService } from 'src/app/services/datalist.service';

@Component({
  selector: 'app-accumulated-balance-extra',
  templateUrl: './accumulated-balance-extra.component.html',
  styleUrls: ['./accumulated-balance-extra.component.scss'],
})
export class AccumulatedBalanceExtraComponent implements OnInit {
  employees: IEmployee[] = [];
  companyRate = 10;
  interestRate = 0.02;

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

  calculateProvidentPeriod(startDateStr: string): {
    years: number;
    months: number;
  } {
    const dateDiff = this.applicationService.findTimeDiff(startDateStr);
    const months =
      (dateDiff.getUTCFullYear() - 1970) * 12 + dateDiff.getUTCMonth() - 3;
    const years = Math.floor(months / 12);
    return { years, months };
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
      if (employee.startdate && employee.salary && employee.pvfrate) {
        const pvfPeriod = this.calculateProvidentPeriod(employee.startdate);
        employee.pvfmonths = pvfPeriod.months;
        employee.pvfyears = pvfPeriod.years;

        employee.pvfbalances = {};
        employee.pvfbalances.employeeBalances =
          this.calculateAccumudatedBalances(
            employee.salary,
            employee.pvfrate,
            employee.pvfmonths
          );
        employee.pvfbalances.companyBalances =
          this.calculateAccumudatedBalances(
            employee.salary,
            this.companyRate,
            employee.pvfmonths
          );

        const employeeInterestBalance = this.calcurateInterestBalance(
          pvfPeriod.years,
          employee.salary,
          employee.pvfrate
        );
        const companyInterestBalance = this.calcurateInterestBalance(
          pvfPeriod.years,
          employee.salary,
          this.companyRate
        );
        employee.pvfbalances.interestBalance =
          employeeInterestBalance + companyInterestBalance;

        employee.pvfcompanyrate =
          this.contributeCompanyRate(pvfPeriod.years) * 100;
        const contributeCompanyBalance =
          employee.pvfbalances.companyBalances *
          this.contributeCompanyRate(pvfPeriod.years);
        const contributeCompanyInterestBalance = this.calcurateInterestBalance(
          pvfPeriod.years,
          employee.salary,
          this.companyRate * this.contributeCompanyRate(pvfPeriod.years) 
        );
        employee.pvfbalances.totalBalance =
          employee.pvfbalances.employeeBalances +
          employeeInterestBalance +
          contributeCompanyBalance +
          contributeCompanyInterestBalance;
      }
      return true;
    }
    return false;
  }

  calcurateInterestBalance(year: number, salary: number, pvfrate: number): number {
    let interestBalances = 0;
    let cost = 0;
    for (let i = 0; i < year; i++) {
      cost += salary * 12 * (pvfrate / 100);
      interestBalances += cost * this.interestRate;
    }
    return interestBalances;
  }

  contributeCompanyRate(year: number): number {
    let contributeCompanyRate = 0;
    if (3 <= year && year < 5) {
      contributeCompanyRate = 0.5;
    } else if (year >= 5) {
      contributeCompanyRate = 1;
    }
    return contributeCompanyRate;
  }
}
