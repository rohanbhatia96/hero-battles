import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import { generateJwt } from "../utils/jwtHandler";

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
      const auth_token = generateJwt({ id: parent.id });
      return auth_token;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
