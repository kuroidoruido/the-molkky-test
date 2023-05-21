import { useParams } from "react-router-dom";
import { useGame } from "../../services/use-game.hook";
import { MolkkyBoardInput } from "./MolkkyBoardInput";
import { GameScoreTable } from "../../ui/GameScoreTable";
import { useState } from "react";

import "./CurrentGamePage.css";

export default function CurrentGamePage() {
  const { gameId } = useParams();
  const { currentPlayer, game, saveTurn } = useGame(gameId ?? "");
  const [fallPins, setFallPins] = useState<number[]>([]);
  return (
    <div className="current-game-page">
      <div className="columns">
        <div className="column board-column">
          <h2 className="subtitle">Current player: {currentPlayer}</h2>
          <MolkkyBoardInput
            selectedPins={fallPins}
            onPinChanges={(pins) => {
              console.log({ pins });
              setFallPins(pins);
            }}
          />
          <button
            type="button"
            className="button"
            onClick={async () => {
              await saveTurn(fallPins);
              setFallPins([]);
            }}
          >
            Save
          </button>
        </div>
        <div className="column">{game && <GameScoreTable game={game} />}</div>
      </div>
    </div>
  );
}
