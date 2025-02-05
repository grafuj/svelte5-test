import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Film } from "./Film";

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column() // ensures that they exist in the database
  userId!: string;

  @Field(() => String)
  @Column()
  filmId!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  engagement?: string;

  @Field()
  @Column("float") // we need float or else TypeORM will assume the type number is an INT and throw an error when it gets decimals
  engagementScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  acting?: string;

  @Field()
  @Column("float")
  actingScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  plotConsistency?: string;

  @Field()
  @Column("float")
  plotConsistencyScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sceneChoice?: string;

  @Field()
  @Column("float")
  sceneChoiceScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dialogue?: string;

  @Field()
  @Column("float")
  dialogueScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  characterDesires?: string;

  @Field()
  @Column("float")
  characterDesiresScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  theme?: string;

  @Field()
  @Column("float")
  themeScore!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  suitability?: string;

  @Field()
  @Column("float")
  suitabilityScore!: number;

  @Field()
  @Column("float")
  overallScore?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @Field(() => Film)
  @ManyToOne(() => Film, (film) => film.reviews)
  film!: Film;
}
