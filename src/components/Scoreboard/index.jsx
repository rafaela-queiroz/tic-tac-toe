import React, { useEffect, useState } from "react";
import { DEU_VELHA } from "../../utils/constants";
import "./scoreboard.scss";

const Scoreboard = ({ player1, player2, winner }) => {
  const [results, setResults] = useState({ player1: 0, player2: 0, ties: 0 });

  useEffect(() => {
    if (winner) {
      switch (winner) {
        case "X":
          setResults({ ...results, player1: results.player1 + 1 });
          break;
        case "O":
          setResults({ ...results, player2: results.player2 + 1 });
          break;
        case DEU_VELHA:
          setResults({ ...results, ties: results.ties + 1 });
          break;
      }
    }
  }, [winner]);

  return (
    <div className="scoreboard">
      <div className="results">
        <div>
          <span>{player1.toUpperCase()}</span>
          <h1>{results.player1}</h1>
        </div>
        <div>
          <span>EMPATES</span>
          <h1>{results.ties}</h1>
        </div>
        <div>
          <span>{player2.toUpperCase()}</span>
          <h1>{results.player2}</h1>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
