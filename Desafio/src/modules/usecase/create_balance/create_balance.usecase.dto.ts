export interface CreateBalanceInputDto {
  accountID: string;
  balance: number;
}
export interface CreateBalanceOutputDto {
  Id: string;
  accountID: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
