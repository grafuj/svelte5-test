import { AppDataSource } from "../data-source";
import { Film } from "../entities/Film";
import { User } from "../entities/User";
import { Review } from "../entities/Review";

const seedDatabase = async () => {
  await AppDataSource.initialize();
  console.log("Seeding database...");

  const filmRepository = AppDataSource.getRepository(Film);
  const userRepository = AppDataSource.getRepository(User);
  const reviewRepository = AppDataSource.getRepository(Review);

  // Insert Films
  const films = filmRepository.create([
    {
      name: "Spiderman",
      releaseDate: "2002",
      imdbUrl: "https://www.imdb.com/title/tt0145487/",
      genre: "action",
    },
    {
      name: "Spiderman 2",
      releaseDate: "2004",
      imdbUrl: "https://www.imdb.com/title/tt0316654/",
      genre: "action",
    },
    {
      name: "Spiderman 3",
      releaseDate: "2007",
      imdbUrl: "https://www.imdb.com/title/tt0413300/",
      genre: "action",
    },
    {
      name: "Everything Everywhere All At Once",
      releaseDate: "2022",
      imdbUrl: "https://www.imdb.com/title/tt6710474/",
      genre: "adventure",
    },
    {
      name: "Harry Potter and the Chamber of Secrets",
      releaseDate: "2002",
      imdbUrl: "https://www.imdb.com/title/tt0295297/",
      genre: "adventure",
    },
    {
      name: "Good Will Hunting",
      releaseDate: "1997",
      imdbUrl: "https://www.imdb.com/title/tt0119217/",
      genre: "Drama",
    },
  ]);
  await filmRepository.save(films);

  // Insert Users (excluding passwords for now)
  const users = userRepository.create([
    { username: "Graham", email: "graham@gmail.com" },
    { username: "Natalie", email: "natalie@gmail.com" },
    { username: "Michiko", email: "michiko@gmail.com" },
    { username: "Iain", email: "iain@gmail.com" },
  ]);
  await userRepository.save(users);

  // Fetch users and films again to use their IDs in reviews
  const allFilms = await filmRepository.find();
  const allUsers = await userRepository.find();

  // Insert Reviews
  const reviews = reviewRepository.create([
    {
      film: allFilms[0], // Spiderman
      user: allUsers[0], // Graham
      engagement: "some interesting scenes",
      engagementScore: 5.33,
      acting: "some bizarre acting, JK Simmons excellent",
      actingScore: 4,
      plotConsistency:
        "spiderman has dubious abilities, childhood friends are a dime a dozen",
      plotConsistencyScore: 3.67,
      sceneChoice: "moderate",
      sceneChoiceScore: 4.67,
      dialogue:
        "main character does not show awkwardness and barely says anything at opportune moments",
      dialogueScore: 2,
      characterDesires: "incomprehensible",
      characterDesiresScore: 1.67,
      theme: "the theme is do the right thing depending on how you feel",
      themeScore: 2.67,
      suitability: "terrible portrayal of gender roles, no bechdel",
      suitabilityScore: 2.67,
      overallScore: 3.63,
    },
    {
      film: allFilms[1], // Spiderman 2
      user: allUsers[1], // Natalie
      engagement: "some interesting scenes, some atrocious",
      engagementScore: 2.67,
      acting: "some bizarre acting, JK Simmons excellent",
      actingScore: 2.67,
      plotConsistency: "spiderman has plot-required abilities",
      plotConsistencyScore: 4.67,
      sceneChoice: "worse",
      sceneChoiceScore: 2.33,
      dialogue:
        "main character does not show awkwardness and barely says anything at opportune moments",
      dialogueScore: 1.67,
      characterDesires: "incomprehensible",
      characterDesiresScore: 1.67,
      theme: "the theme is do the right thing depending on how you feel",
      themeScore: 2.33,
      suitability: "terrible portrayal of gender roles, no bechdel",
      suitabilityScore: 2.33,
      overallScore: 2.63,
    },
  ]);
  await reviewRepository.save(reviews);

  console.log("Seeding completed!");
  await AppDataSource.destroy();
};

try {
  seedDatabase();
} catch {
  (error: any) => {
    console.error("Error seeding database:", error);
  };
}
