import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PowerStats } from "./powerStats";
import { Appearance } from "./appearance";
import { Work } from "./work";
import { Connections } from "./connections";
import { Biography } from "./biography";

@ObjectType()
@Entity()
export class Character extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { unique: true })
  apiId: number;

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

  @Field((_type) => Appearance)
  @OneToOne((_type) => Appearance, (appearance) => appearance.character, {
    cascade: true,
  })
  appearance: Appearance;

  @Field((_type) => Work)
  @OneToOne((_type) => Work, (work) => work.character, {
    cascade: true,
  })
  work: Work;

  @Field((_type) => Connections)
  @OneToOne((_type) => Connections, (connections) => connections.character, {
    cascade: true,
  })
  connections: Connections;

  @Field((_type) => Biography)
  @OneToOne((_type) => Biography, (biography) => biography.character, {
    cascade: true,
  })
  biography: Biography;
}
