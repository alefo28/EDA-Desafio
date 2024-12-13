import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "balances",
  timestamps: false,
})
export class BalanceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  ID!: string;

  @Column({ allowNull: false })
  AccountID!: string;

  @Column({ allowNull: false })
  Balance!: number;

  @Column({ allowNull: false })
  CreatedAt!: Date;

  @Column({ allowNull: false })
  UpdatedAt!: Date;
}
