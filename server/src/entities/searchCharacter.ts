import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SearchCharacter {
  @Field()
  apiId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field()
  alignment: string;

  @Field()
  publisher: string;

  @Field()
  averageRating: number;
}
