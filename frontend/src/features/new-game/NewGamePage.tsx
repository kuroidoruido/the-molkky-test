import { useRef, useState } from "react";

import "./NewGamePage.css";
import { useCreateGame } from "../../services/use-create-game.hook";
import { useNavigate } from "react-router-dom";

export default function NewGamePage() {
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <div className="new-game-page">
      <h2 className="subtitle">Add player</h2>
      <AddPlayerForm
        onNewPlayer={(player) => setPlayers([...players, player])}
      />
      <PlayerList
        players={players}
        onRemoveClick={(player) =>
          setPlayers(players.filter((p) => p !== player))
        }
      />
      <CreateGameButton players={players} />
    </div>
  );
}

interface AddPlayerFormProps {
  onNewPlayer(player: string): void;
}

function AddPlayerForm({ onNewPlayer }: AddPlayerFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      className="add-player-form"
      onSubmit={(event) => {
        event.stopPropagation();
        event.preventDefault();
        if (ref.current) {
          onNewPlayer(ref.current.value);
          ref.current.value = "";
        }
        return false;
      }}
    >
      <input ref={ref} className="input" type="text" placeholder="Jane" />
      <button className="button is-primary">Add</button>
    </form>
  );
}

interface PlayerListProps {
  players: string[];
  onRemoveClick(player: string): void;
}

function PlayerList({ players, onRemoveClick }: PlayerListProps) {
  return (
    <ul className="player-list">
      {players.map((p) => (
        <li key={p} className="player">
          {p}{" "}
          <button className="button is-small" onClick={() => onRemoveClick(p)}>
            <span className="icon">
              <i className="fas fa-trash" aria-hidden="true"></i>
            </span>
            <span>Remove</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

interface CreateGameButtonProps {
  players: string[];
}

function CreateGameButton({ players }: CreateGameButtonProps) {
  const createGame = useCreateGame();
  const navigate = useNavigate();

  const onCreateGame = async () => {
    const game = await createGame(players);
    navigate(`/current-game/${game.id}`);
  };
  return (
    <button className="button is-primary" onClick={onCreateGame}>
      Create game
    </button>
  );
}
