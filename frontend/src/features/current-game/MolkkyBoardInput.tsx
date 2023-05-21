import "./MolkkyBoardInput.css";

export interface MolkkyBoardInputProps {
  selectedPins: number[];
  onPinChanges(pins: number[]): void;
}

const BOARD = [
  [7, 9, 8], //
  [5, 11, 12, 6], //
  [3, 10, 4], //
  [1, 2], //
] as const;

export function MolkkyBoardInput({
  selectedPins,
  onPinChanges,
}: MolkkyBoardInputProps) {
  return (
    <div className="molkky-board-input">
      {BOARD.map((row, rowIndex) => (
        <div key={rowIndex} className="molkky-row">
          {row.map((pin) => (
            <label
              key={pin}
              className={selectedPins.includes(pin) ? "selected" : ""}
            >
              <input
                type="checkbox"
                value={pin}
                checked={selectedPins.includes(pin)}
                onChange={() => {
                  if (selectedPins.includes(pin)) {
                    onPinChanges(selectedPins.filter((p) => p !== pin));
                  } else {
                    onPinChanges([...selectedPins, pin]);
                  }
                }}
              />
              {pin}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
