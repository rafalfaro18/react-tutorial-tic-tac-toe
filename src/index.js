import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button className="square" onClick = {props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        squares: Array(this.props.boardsize).fill(null),
        xIsNext: true,
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares : squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
      return (<Square value={this.state.squares[i]} 
      onClick={()=> this.handleClick(i)}
      />);
    }

    renderRowSquares(start, end){
      let rows = []
      for(let i=start; i<end; i++){
        rows.push(this.renderSquare(i) )
      }
      return rows
    }

    renderRow(start, end){
      return (
        <div className="board-row">
            {this.renderRowSquares(start, end)}
        </div>
      );
    }

    renderSquares(){
      let rows = []
      let amount = this.props.boardsize
      for(let i=1 ; i<= amount; i++){
        rows.push(this.renderRow(amount*i-amount,amount*i))
      }
      
      return rows
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          {this.renderSquares()}        
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board boardsize = '3'/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }