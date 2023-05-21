import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly player: string;
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  readonly pins: number[];
}
