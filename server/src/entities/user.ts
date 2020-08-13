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
  name: string;

  @Field()
  @Column("text", { unique: true })
  username: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  authToken(@Root() parent: User): string {
    try {
      const auth_token = generateJwt({ id: parent.id });
      return auth_token;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
