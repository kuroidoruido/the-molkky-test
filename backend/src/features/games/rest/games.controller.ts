import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  GameNotFoundError,
  GamesService,
  PlayerNotFoundError,
} from '../games.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewGameDto } from './new-game.dto';
import { UpdateGameDto } from './update-game.dto';

@ApiTags('games')
@Controller({ path: '/api/games' })
export class GamesController {
  private readonly logger = new Logger(GamesController.name);

  constructor(private gamesService: GamesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  createGame(@Body() body: NewGameDto) {
    this.logger.debug('controller', { body });
    return this.gamesService.createGame(body.players);
  }

  @Get('/:gameId')
  @ApiOperation({ summary: 'Get an existing game' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getOneGame(@Param('gameId') gameId: string, @Res() res: Response) {
    const foundGame = await this.gamesService.getGame(gameId);
    if (foundGame) {
      this.logger.debug('found', { gameId, foundGame });
      return res.status(HttpStatus.OK).end(JSON.stringify(foundGame));
    } else {
      this.logger.debug('not found', { gameId, foundGame });
      return res.status(HttpStatus.NOT_FOUND).end();
    }
  }

  @Put('/:gameId')
  @ApiOperation({ summary: 'Get an existing game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Saved' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Game not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Player not found',
  })
  async update(
    @Param('gameId') gameId: string,
    @Body() body: UpdateGameDto,
    @Res() res: Response,
  ) {
    try {
      const game = await this.gamesService.updateGame(
        gameId,
        body.player,
        body.pins,
      );
      return res.status(HttpStatus.CREATED).end(JSON.stringify(game));
    } catch (err) {
      if (err instanceof GameNotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).end();
      } else if (err instanceof PlayerNotFoundError) {
        return res.status(HttpStatus.BAD_REQUEST).end();
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
      }
    }
  }
}
