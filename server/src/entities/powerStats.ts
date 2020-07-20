import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Character } from ".";

@ObjectType()
@Entity()
export class PowerStats extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  intelligence: number;

  @Field()
  @Column()
  strength: number;

  @Field()
  @Column()
  speed: number;

  @Field()
  @Column()
  durability: number;

  @Field()
  @Column()
  power: number;

  @Field()
  @Column()
  combat: number;

  @Field((_type) => Character)
  @OneToOne((_type) => Character, (character) => character.powerStats, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  character: Character;
}
