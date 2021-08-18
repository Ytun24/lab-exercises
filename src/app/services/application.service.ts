import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  convertStrToDate(dateStr: string): Date {
    const [date, month, year] = dateStr.split('/');
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(date)
    );
  }

  findTimeDiff(targetDateStr: string ): Date {
    const currentDate = new Date();
    const targetDate = this.convertStrToDate(targetDateStr);
    const timeDiff = currentDate.getTime() - targetDate.getTime();
    const dateDiff = new Date(timeDiff);
    return dateDiff;
  }
}
