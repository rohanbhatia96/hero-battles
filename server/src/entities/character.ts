import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PowerStats } from "./powerStats";

@ObjectType()
@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { unique: true })
  apiID: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  realName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl: string;

  @Field()
  @Column()
  alignment: string;

  @Field()
  @Column()
  publisher: string;

  @Field()
  @Column({ default: false })
  isTrending: boolean;

  @Field((_type) => PowerStats)
  @OneToOne((_type) => PowerStats, (powerStats) => powerStats.character, {
    cascade: true,
  })
  powerStats: PowerStats;
}
