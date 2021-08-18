import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { IEmployee } from '../models/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class DatalistService {

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>("./assets/data/Employees.json");
  }
}
