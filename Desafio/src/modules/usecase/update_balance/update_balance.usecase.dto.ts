export interface UpdateBalanceInputDto {
    accountID: string;
    balance: number;
  }
  export interface UpdateBalanceOutputDto {
    Id: string;
    accountID: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
  }
  