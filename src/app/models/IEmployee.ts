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
  pvfcompanyrate?: number;
  pvfmonths?: number;
  pvfyears?: number;
  pvfbalances?: IAccumulatedBalance;
}


