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
export class Biography extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  alterEgos: string;

  @Field()
  @Column()
  aliases: string;

  @Field()
  @Column()
  placeOfBirth: string;

  @Field()
  @Column()
  firstAppearance: string;

  @Field((_type) => Character)
  @OneToOne((_type) => Character, (character) => character.biography, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  character: Character;
}
