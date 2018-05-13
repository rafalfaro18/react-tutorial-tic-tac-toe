import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: null,
      };
    }
    render() {
      return (
        <button className="square" data-id={this.props.value} onClick = {() => this.setState({value: 'X'})}>
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
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

    renderSquares(amount = 3){
      let rows = []
      for(let i=1 ; i<= 3; i++){
        rows.push(this.renderRow(3*i-3,3*i))
      }
      
      return rows
    }
  
    render() {
      const status = 'Next player: X';
  
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
            <Board />
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
  