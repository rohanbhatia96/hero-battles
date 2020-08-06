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
export class Connections extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  groupAffiliations: string;

  @Field()
  @Column()
  relatives: string;

  @Field((_type) => Character)
  @OneToOne((_type) => Character, (character) => character.connections, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  character: Character;
}
