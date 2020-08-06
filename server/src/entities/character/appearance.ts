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
export class Appearance extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  race: string;

  @Field()
  @Column()
  height: string;

  @Field()
  @Column()
  weight: string;

  @Field()
  @Column()
  eyeColor: string;

  @Field()
  @Column()
  hairColor: string;

  @Field((_type) => Character)
  @OneToOne((_type) => Character, (character) => character.appearance, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  character: Character;
}
