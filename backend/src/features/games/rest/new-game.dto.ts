import { IsArray, IsDefined, IsNotEmpty } from 'class-validator';

export class NewGameDto {
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  readonly players: string[];
}
