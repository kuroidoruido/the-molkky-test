import { Game, Turn } from "../services/game.service";

interface GameScoreTableProps {
  game: Game;
}

export function GameScoreTable({ game }: GameScoreTableProps) {
  const turnCount = Math.max(
    ...Object.values(game.score).map((turns) => turns.length)
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          {new Array(turnCount).fill(null).map((_, i) => (
            <th key={i}>{i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {game.players.map((player) => (
          <tr key={player}>
            <th>{player}</th>
            {game.score[player].map((turn, i) => (
              <PlayerTurnCell key={i} turn={turn} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface PlayerTurnCellProps {
  turn: Turn;
}

function PlayerTurnCell({ turn }: PlayerTurnCellProps) {
  switch (turn.type) {
    case "fail":
      return (
        <td>
          <i className="fas fa-xmark" aria-hidden="true"></i>
        </td>
      );
    case "lost":
      return (
        <td>
          <i className="fas fa-skull" aria-hidden="true"></i>
        </td>
      );
    case "win":
      return (
        <td>
          <i className="fas fa-trophy" aria-hidden="true"></i>
        </td>
      );
    case "ok":
      return <td>{turn.score}</td>;
  }
}
