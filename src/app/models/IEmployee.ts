import { IAccumulatedBalance } from "./IAccumulatedBalance";

export class IEmployee {
  employeeid?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  startdate?: string;
  employeetype?: string;
  salary?: number;
  pvfrate?: number;
  pvfmonths?: number;
  pvfbalances?: IAccumulatedBalance;
}


