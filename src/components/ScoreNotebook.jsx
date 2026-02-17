import { useEffect, useState } from "react";
import "./ScoreNotebook.css";

export default function ScoreNotebook() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [rounds, setRounds] = useState(3);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("scoreNotebook");
    if (saved) setPlayers(JSON.parse(saved));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("scoreNotebook", JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (!playerName.trim()) return;

    setPlayers([
      ...players,
      {
        name: playerName,
        scores: Array(rounds).fill(0),
        total: 0,
      },
    ]);

    setPlayerName("");
  };

  const updateScore = (pIndex, rIndex, value) => {
    const updated = [...players];
    updated[pIndex].scores[rIndex] = Number(value);
    setPlayers(updated);
  };

  const calculateTotal = (index) => {
    const updated = [...players];
    updated[index].total = updated[index].scores.reduce(
      (sum, val) => sum + val,
      0
    );
    setPlayers(updated);
  };

  return (
    <div className="container">
      <h1>🎴 Game Score Notebook</h1>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <input
          type="number"
          min="1"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
        />

        <button onClick={addPlayer}>Add Player</button>
      </div>

      {/* Desktop Table */}
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {[...Array(rounds)].map((_, i) => (
              <th key={i}>R{i + 1}</th>
            ))}
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player, pIndex) => (
            <tr key={pIndex}>
              <td>{player.name}</td>

              {player.scores.map((score, rIndex) => (
                <td key={rIndex}>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) =>
                      updateScore(pIndex, rIndex, e.target.value)
                    }
                  />
                </td>
              ))}

              <td className="total">{player.total}</td>

              <td>
                <button onClick={() => calculateTotal(pIndex)}>
                  Calculate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="players slider">
        {players.map((player, pIndex) => (
          <div className="player-card" key={pIndex}>
            <h3>{player.name}</h3>

            <div className="scores">
              {player.scores.map((score, rIndex) => (
                <div className="score-input" key={rIndex}>
                  <label>Round {rIndex + 1}</label>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) =>
                      updateScore(pIndex, rIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="card-footer">
              <span>Total: {player.total}</span>
              <button onClick={() => calculateTotal(pIndex)}>
                Calculate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}