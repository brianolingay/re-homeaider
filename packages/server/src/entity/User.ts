import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @Column()
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column()
  phone: string | null;

  @Column()
  mobile: string | null;

  @Column()
  address: string | null;

  @Column()
  city: string | null;

  @Column()
  county: string | null;

  @Column()
  coordinates: any;

  @Column()
  password: string;
}
