import { Game } from './games.model';

export const GamesRepositoryInjectionToken = 'GamesRepository';

export interface GamesRepository {
  upsertGame(game: Game): Promise<void>;
  getOneGame(gameId: string): Promise<Game | null>;
  getAllGames(): Promise<Game[]>;
}
