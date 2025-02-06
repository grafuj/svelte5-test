import { AppDataSource } from "../data-source";
import { Film } from "../entities/Film";
import { User } from "../entities/User";
import { Review } from "../entities/Review";

const resetDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Resetting database...");

    const filmRepository = AppDataSource.getRepository(Film);
    const userRepository = AppDataSource.getRepository(User);
    const reviewRepository = AppDataSource.getRepository(Review);

    await reviewRepository.delete({});
    await userRepository.delete({});
    await filmRepository.delete({});

    console.log("Reset complete!");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await AppDataSource.destroy();
  }
};

resetDatabase();
