import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";
import {CharacterAlignment} from '../enums';

registerEnumType(CharacterAlignment, {
  name: "CharacterAlignment"
});

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

  @Field()
  @Column()
  realName: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field(_type => CharacterAlignment)
  @Column({
    type: "enum",
    enum: CharacterAlignment,
  })
  alignment: CharacterAlignment;
}
