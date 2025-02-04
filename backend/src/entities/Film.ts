import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Review } from './Review';

@ObjectType()
@Entity()
export class Film {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  releaseDate!: string;

  @Field()
  @Column()
  imdbUrl!: string;

  @Field()
  @Column()
  genre!: string;

  @Field(() => [Review])
  // One film can have many reviews
  @OneToMany(() => Review, (review) => review.film)
  reviews?: Review[];
}