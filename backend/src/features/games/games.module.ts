import { Module } from '@nestjs/common';
import { GamesController } from './rest/games.controller';
import { GamesService } from './games.service';
import { GamesRepositoryInjectionToken } from './games.repository';
import { FileGamesRepository } from './file-games.repository';

@Module({
  controllers: [GamesController],
  providers: [
    GamesService,
    { provide: GamesRepositoryInjectionToken, useClass: FileGamesRepository },
  ],
})
export class GamesModule {}
