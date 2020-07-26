import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-express";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  auth_token(@Root() parent: User): string {
    try {
      if (process.env.JWT_TOKEN) {
        const token = jwt.sign({ id: parent.id }, process.env.JWT_TOKEN);
        return token;
      } else {
        throw "Login Failed. Please Try Again";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
