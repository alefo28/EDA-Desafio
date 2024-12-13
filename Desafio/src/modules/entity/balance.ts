import { v4 as uuidv4 } from "uuid";

type AccountProps = {
  ID?: string;
  AccountID: string;
  Balance: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
};

export default class Balance {
  private _ID: string;
  private _AccountID: string;
  private _Balance: number;
  private _CreatedAt: Date;
  private _UpdatedAt: Date;

  constructor(props: AccountProps) {
    this._ID = props.ID || uuidv4();
    this._AccountID = props.AccountID;
    this._Balance = props.Balance;
    this._CreatedAt = props.CreatedAt || new Date(Date.now());
    this._UpdatedAt = props.UpdatedAt || new Date(Date.now());
  }

  get ID(): string {
    return this._ID;
  }
  get AccountId(): string {
    return this._AccountID;
  }
  get Balance(): number {
    return this._Balance;
  }
  get CreatedAt(): Date {
    return this._CreatedAt;
  }
  get UpdatedAt(): Date {
    return this._UpdatedAt;
  }

  set Balance(balance: number) {
    this._Balance = balance;
  }
}
