import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
