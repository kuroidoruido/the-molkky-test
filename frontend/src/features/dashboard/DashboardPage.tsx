import { Link } from "react-router-dom";

import "./DashboardPage.css";
import { LastGamePanelBlock } from "./LastGamePanelBlock";
import { useLastGames } from "../../services/use-last-games.hook";

export default function DashboardPage() {
  return (
    <div className="columns">
      <LastGameColumn />
      <NewGameColumn />
    </div>
  );
}

function LastGameColumn() {
  const lastGames = useLastGames();
  return (
    <div className="column is-two-thirds">
      <div className="panel">
        <h2 className="panel-heading">Last games</h2>
        {lastGames.map((game, index) => (
          <LastGamePanelBlock
            key={game.id}
            game={game}
            collapse={index !== 0}
          ></LastGamePanelBlock>
        ))}
      </div>
    </div>
  );
}

function NewGameColumn() {
  return (
    <div className="column new-game">
      <Link className="button" to="/new-game">
        New game
      </Link>
    </div>
  );
}
