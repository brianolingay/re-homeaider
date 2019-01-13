import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectID } from "mongodb";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phone: string | null;

  @Field()
  @Column()
  mobile: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  address: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  city: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  county: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  coordinates: any;

  @Column()
  password: string;
}
