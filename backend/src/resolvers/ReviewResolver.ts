import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Review } from '../entities/Review';
import { getRepository } from 'typeorm';

@Resolver(Review)
export class ReviewResolver {
  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return getRepository(Review).find();
  }

  @Mutation(() => Review)
  async addReview(
    @Arg('filmId') filmId: string,
    @Arg('userId') userId: string,
    @Arg('engagementScore') engagementScore: number
    // Add other fields...
  ): Promise<Review> {
    const review = new Review();
    review.filmId = filmId;
    review.userId = userId;
    review.engagementScore = engagementScore;
    // Set other fields...
    return getRepository(Review).save(review);
  }
}