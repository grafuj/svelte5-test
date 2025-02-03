import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Review } from "../entities/Review";
import { AppDataSource } from "../data-source";

@Resolver(Review)
export class ReviewResolver {
  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return AppDataSource.getRepository(Review).find();
  }

  @Mutation(() => Review)
  async addReview(
    @Arg("filmId") filmId: string,
    @Arg("userId") userId: string,
    @Arg("engagementScore") engagementScore: number,
    // Add other fields...
  ): Promise<Review> {
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = reviewRepository.create({ filmId, userId, engagementScore });
    return reviewRepository.save(review);
  }
}
