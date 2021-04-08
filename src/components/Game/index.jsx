import React, { Component } from 'react';
import Board from '../Board';
import './game.scss';
import { calculateWinner } from '../../utils/calculateWinner';
import { DEU_VELHA } from '../../utils/constants';
import Player from '../Player';
import Scoreboard from '../Scoreboard';

export default class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      player1: '',
      player2: '',
      submitted: false,
      results: { player1: 0, player2: 0, ties: 0 },
      stepNumber: 0,
      finished: false
    };

    this.handleRestart = this.handleRestart.bind(this);
  }

  handleRestart() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      finished: false
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current?.squares.slice() || [];

    if (calculateWinner(squares, [this.state.player1, this.state.player2]) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current?.squares || [], [this.state.player1, this.state.player2]) || null;

    const moves = history.map((step, move) => {
      if (move) {
        const desc = `Voltar para a jogada ${move}`;
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });

    let status;

    if (winner) {
      status = (winner !== DEU_VELHA ? `Parabéns, ${winner} venceu!` : DEU_VELHA);
    } else {
      status = `${this.state.xIsNext ? this.state.player1 : this.state.player2}, sua vez!`;
    }

    return (
      <div>
        {
          this.state.submitted ?
            <div className="game">
              <Scoreboard
                player1={this.state.player1}
                player2={this.state.player2}
                results={this.state.results}
                winner={winner}

              />
              <div className="game-info">
                <div className="status">{status}</div>
                <ol>{moves}</ol>
              </div>
              <div className="game-board">
                <Board
                  squares={current?.squares || []}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              {
                winner ?
                  <button
                    className="restart"
                    onClick={this.handleRestart}
                  >
                    Jogar de novo
                  </button>
                  : ''
              }
            </div>
            :
            <Player
              onClick={(players) =>
                this.setState({ ...players, submitted: true })}
            />
        }
      </div>
    );
  }
}
