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
      const status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
  
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
  