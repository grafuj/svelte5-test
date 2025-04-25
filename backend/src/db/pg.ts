import { Pool } from "pg";
import { User, Film, Review, ReviewFilter } from "types";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// to check if postgreSQL is running use: sudo systemctl status postgresql
// to start postgreSQL use: sudo systemctl start postgresql
// to open postgreSQL node repl use: sudo -u postgres psql

// PostgreSQL client setup
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5001, // default PostgreSQL port
});

// Function to get all users from the database
export const getUsers = async (filter?: { id?: string }): Promise<User[]> => {
  try {
    if (filter?.id) {
      const res = await pool.query("SELECT * FROM users WHERE id = $1", [
        filter.id,
      ]);
      return res.rows;
    }
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// Function to add a user to the database
export const addUser = async (name: string, email: string): Promise<User> => {
  try {
    const res = await pool.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
};

export const getFilms = async (filter?: { id?: string }): Promise<Film[]> => {
  try {
    if (filter?.id) {
      const res = await pool.query("SELECT * FROM films WHERE id = $1", [
        filter.id,
      ]);
      return res.rows;
    }
    const res = await pool.query("SELECT * FROM films");
    return res.rows;
  } catch (err) {
    console.error("Error fetching films:", err);
    throw err;
  }
};

export const addFilm = async (
  name: string,
  releaseDate: string,
  imdbUrl: string,
  genre: string
) => {
  try {
    const res = await pool.query(
      "INSERT INTO films (name, release_date, imdb_url, genre) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, releaseDate, imdbUrl, genre]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error adding film:", err);
    throw err;
  }
};


export const getReviews = async (filter: ReviewFilter): Promise<Review[]> => {
  try {
    const query = "SELECT * FROM reviews WHERE user_id = $1 OR film_id = $2";
    const params = [filter.userId, filter.filmId];
    const res = await pool.query(query, params);
    return res.rows;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw err;
  }
};

// export const getReviews = async (filter: {
//   userId?: string;
//   filmId?: string;
// }): Promise<Review[]> => {
//   const { userId, filmId } = filter;
//   let query = "SELECT * FROM reviews";
//   const values: string[] = [];
//   const conditions: string[] = [];

//   if (userId) {
//     conditions.push("user_id = $" + (values.length + 1));
//     values.push(userId);
//   }

//   if (filmId) {
//     conditions.push("film_id = $" + (values.length + 1));
//     values.push(filmId);
//   }

//   if (conditions.length > 0) {
//     query += " WHERE " + conditions.join(" AND ");
//   }

//   try {
//     const res = await pool.query(query, values);
//     return res.rows;
//   } catch (err) {
//     console.error("Error fetching reviews:", err);
//     throw err;
//   }
// };

export const addReview = async (reviewData: {
  filmId: string;
  userId: string;
  engagement?: string;
  engagementScore: number;
  acting?: string;
  actingScore: number;
  plotConsistency?: string;
  plotConsistencyScore: number;
  sceneChoice?: string;
  sceneChoiceScore: number;
  dialogue?: string;
  dialogueScore: number;
  characterDesires?: string;
  characterDesiresScore: number;
  theme?: string;
  themeScore: number;
  suitability?: string;
  suitabilityScore: number;
  overallScore: number;
}) => {
  const {
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
  } = reviewData;

  try {
    const res = await pool.query(
      `INSERT INTO reviews (
        film_id, user_id, engagement, engagement_score, acting, acting_score,
        plot_consistency, plot_consistency_score, scene_choice, scene_choice_score,
        dialogue, dialogue_score, character_desires, character_desires_score,
        theme, theme_score, suitability, suitability_score, overall_score
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
      [
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
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error adding review:", err);
    throw err;
  }
};
