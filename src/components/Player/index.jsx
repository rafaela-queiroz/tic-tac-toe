import React, { useState } from 'react';
import './player.scss';

const Player = (props) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  return (
    <>
      <div className="players">
        <form>
          <div className="player">
            <label>Jogador 1</label>
            <input
              type="text"
              name="player1"
              placeholder="Jogador 1"
              onChange={event => setPlayer1(event.target.value)}
            />
          </div>
          <div className="player">
            <label>Jogador 2</label>
            <input
              type="text"
              name="player2"
              placeholder="Jogador 2"
              onChange={event => setPlayer2(event.target.value)}
            />
          </div>
          <button
            type="button"
            disabled={!player1 || !player2}
            onClick={() => props.onClick({ player1, player2 })}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

export default Player;