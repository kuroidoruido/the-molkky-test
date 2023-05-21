import { format } from "date-fns";

import { Game } from "../../services/game.service";
import { CollapsiblePanelBlock } from "../../ui/CollapsiblePanelBlock";
import { GameScoreTable } from "../../ui/GameScoreTable";

export interface LastGamePanelBlockProps {
  game: Game;
  collapse?: boolean;
}

export function LastGamePanelBlock({
  game,
  collapse,
}: LastGamePanelBlockProps) {
  const label = `${format(game.date, "dd/MM/yyyy")}`;
  return (
    <CollapsiblePanelBlock collapse={collapse} label={label}>
      <GameScoreTable game={game} />
    </CollapsiblePanelBlock>
  );
}
