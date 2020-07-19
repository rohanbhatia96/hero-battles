import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class PowerStats extends BaseEntity {
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
  imageUrl: string;

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
}
