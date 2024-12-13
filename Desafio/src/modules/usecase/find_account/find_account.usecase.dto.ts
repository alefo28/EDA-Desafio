export interface FindAccountInputDto {
  accountID: string;
}
export interface FindAccountOutputDto {
    Id: string;
    accountID: string;
    balance: number;
    createdAt: Date;
}
