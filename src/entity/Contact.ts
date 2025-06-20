import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn, Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @Column({type: "varchar", nullable: true})
  phoneNumber!: string | null;

  @Column({type: "varchar", nullable: true})
  email!: string | null;

  @Column({nullable: true})
  linkedIn!: number;

  @Column({enum: ["primary", "secondary"], default: "primary"})
  linkPrecedence!: string;

}