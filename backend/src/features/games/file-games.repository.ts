import { readFileSync, writeFileSync } from 'node:fs';
import { Game } from './games.model';
import { GamesRepository } from './games.repository';
import { Logger } from '@nestjs/common';

const FILE_PATH = './data/games.json';

export class FileGamesRepository implements GamesRepository {
  private readonly logger = new Logger(FileGamesRepository.name);

  async upsertGame(game: Game) {
    const games = await this.getAllGames();
    console.log('GamesRepository', { games });
    const foundGameIndex = games.findIndex((g) => g.id === game.id);
    if (foundGameIndex !== -1) {
      games[foundGameIndex] = game;
    } else {
      games.push(game);
    }
    writeFileSync(FILE_PATH, JSON.stringify(games, undefined, 2), {
      encoding: 'utf-8',
    });
  }

  async getOneGame(gameId: string) {
    const games = await this.getAllGames();
    this.logger.debug('getGame', { games, gameId });

    return games.find((g) => g.id === gameId);
  }

  getAllGames(): Promise<Game[]> {
    const games = JSON.parse(readFileSync(FILE_PATH, { encoding: 'utf-8' }));
    return Promise.resolve(games);
  }
}
