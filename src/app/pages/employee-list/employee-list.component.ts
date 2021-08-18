import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/models/IEmployee';
import { ApplicationService } from 'src/app/services/application.service';
import { DatalistService } from 'src/app/services/datalist.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[] = [];

  constructor(private datalistService: DatalistService, private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.datalistService
      .getEmployeeList()
      .subscribe((employees: IEmployee[]) => (this.employees = employees));
  }

  calculateAge(birthDateStr: string): number {
    const dateDiff = this.applicationService.findTimeDiff(birthDateStr);
    return dateDiff.getUTCFullYear() - 1970;
  }

  salaryUnit(type: string): string {
    return type.toLowerCase() === 'permanent' ? 'per month': 'per hour';
  }
}
