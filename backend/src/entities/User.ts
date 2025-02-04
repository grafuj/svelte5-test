import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Review } from './Review';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];
}