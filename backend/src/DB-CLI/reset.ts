import { AppDataSource } from "../data-source";
import { Film } from "../entities/Film";
import { User } from "../entities/User";
import { Review } from "../entities/Review";

const resetDatabase = async () => {
  await AppDataSource.initialize();
  console.log("Seeding database...");

  const filmRepository = AppDataSource.getRepository(Film);
  const userRepository = AppDataSource.getRepository(User);
  const reviewRepository = AppDataSource.getRepository(Review);

  reviewRepository.delete;
  userRepository.delete;
  filmRepository.delete;
  
  console.log("Reset complete!");
  await AppDataSource.destroy();
}

try {
  resetDatabase();
} catch {
  (error: any) => {
    console.error("Error reseting database:", error);
  };
}