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
    @Arg("actingScore") actingScore: number,
    @Arg("plotConsistencyScore") plotConsistencyScore: number,
    @Arg("sceneChoiceScore") sceneChoiceScore: number,
    @Arg("dialogueScore") dialogueScore: number,
    @Arg("characterDesiresScore") characterDesiresScore: number,
    @Arg("themeScore") themeScore: number,
    @Arg("suitabilityScore") suitabilityScore: number,
    @Arg("overallScore") overallScore: number,
    @Arg("engagement", { nullable: true }) engagement?: string,
    @Arg("acting", { nullable: true }) acting?: string,
    @Arg("plotConsistency", { nullable: true }) plotConsistency?: string,
    @Arg("sceneChoice", { nullable: true }) sceneChoice?: string,
    @Arg("dialogue", { nullable: true }) dialogue?: string,
    @Arg("characterDesires", { nullable: true }) characterDesires?: string,
    @Arg("theme", { nullable: true }) theme?: string,
    @Arg("suitability", { nullable: true }) suitability?: string
  ): Promise<Review> {
    const reviewRepository = AppDataSource.getRepository(Review);

    const review = reviewRepository.create({
      filmId,
      userId,
      engagement,
      engagementScore,
      acting,
      actingScore,
      plotConsistency,
      plotConsistencyScore,
      sceneChoice,
      sceneChoiceScore,
      dialogue,
      dialogueScore,
      characterDesires,
      characterDesiresScore,
      theme,
      themeScore,
      suitability,
      suitabilityScore,
      overallScore,
    });

    return reviewRepository.save(review);
  }
}
