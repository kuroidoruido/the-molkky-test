import { Inject, Injectable } from '@nestjs/common';
import {
  GamesRepository,
  GamesRepositoryInjectionToken,
} from './games.repository';
import { Game } from './games.model';
import ShortUniqueId from 'short-unique-id';
import { computeNewTurn } from 'src/utils/score.utils';
import { computeNewStatus } from 'src/utils/status.utils';

@Injectable()
export class GamesService {
  private uid: ShortUniqueId;

  constructor(
    @Inject(GamesRepositoryInjectionToken)
    private gamesRepository: GamesRepository,
  ) {
    this.uid = new ShortUniqueId({ length: 10 });
  }

  async createGame(players: string[]) {
    const game: Game = {
      id: this.uid(),
      date: new Date(),
      players,
      score: Object.fromEntries(players.map((p) => [p, []])),
      status: 'pending',
    };
    await this.gamesRepository.upsertGame(game);
    return game;
  }

  getAllGames() {
    return this.gamesRepository.getAllGames();
  }

  getGame(gameId: string) {
    return this.gamesRepository.getOneGame(gameId);
  }

  async updateGame(gameId: string, player: string, pins: number[]) {
    try {
      const game = await this.gamesRepository.getOneGame(gameId);
      const playerTurns = game.score[player];
      if (!playerTurns) {
        throw new PlayerNotFoundError(player);
      }
      const newTurn = computeNewTurn(playerTurns, pins);
      game.score[player] = [...playerTurns, newTurn];
      game.status = computeNewStatus(game);
      await this.gamesRepository.upsertGame(game);
      return game;
    } catch (findGameError) {
      throw new GameNotFoundError(gameId);
    }
  }
}

export class GameNotFoundError extends Error {
  constructor(public gameId: string) {
    super(`Game not found ${gameId}`);
  }
}

export class PlayerNotFoundError extends Error {
  constructor(public player: string) {
    super(`Player not found ${player}`);
  }
}
