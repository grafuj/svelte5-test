export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Film {
  id: string;
  name: string;
  releaseDate: string;
  imdbUrl: string;
  genre: string;
}

export interface Review {
  id: string;
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
  userId: string;
  filmId: string;
}

export interface ReviewFilter {
  userId?: string;
  filmId?: string;
}