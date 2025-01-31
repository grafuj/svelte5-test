import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Film } from './Film';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  engagement?: string;

  @Field()
  @Column()
  engagementScore: number;

  // Add other fields...

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Field(() => Film)
  @ManyToOne(() => Film, (film) => film.reviews)
  film: Film;
}