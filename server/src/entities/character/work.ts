import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Character } from "./character";

@ObjectType()
@Entity()
export class Work extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  occupation: string;

  @Field()
  @Column()
  base: string;

  @Field((_type) => Character)
  @OneToOne((_type) => Character, (character) => character.work, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  character: Character;
}
