import React, { Component } from 'react'
import logo from './logo.svg'
import classNames from 'classnames'
import './App.css'

class StatefulComponent extends Component {
  constructor() {
    super();

    this.state = {}

  }
}

function Game({players, onPlayerWin}) {
  const selectedPlayers = players
        .map((player, i) => [player, i])
        .filter(([player, i]) => player.selected)

  if(selectedPlayers.length !== 2) {
    return (<section id="game" className="error">Please select two players</section>)
  } else {
    // Emacs won't indent this properly
    return (
      <section id="game">
        <h1>Game Tracker</h1>
        <h2>Now Playing: </h2>
        <div id="player-game-container">
        {selectedPlayers.map(([player, i]) => (<button className="player-game-button" key={i} onClick={onPlayerWin(i)}><span className="player-game-name">{player.name}</span><span>(Select as winner)</span></button>))}
        </div>
      </section>
    )
  }
}

function Leaderboard({players, onPlayerAdd, onPlayerSelect, name, onPlayerName}) {
  return (
    <section id="leaderboard">
      <h1>Player Leaderboard</h1>
      <h2>Click a player to add them to a game</h2>
      <section id="players-list">
        {players.map((player, i) => (
          <div key={i} onClick={onPlayerSelect(i)} className={classNames("player", {selected: player.selected})}>
            {player.name} - {player.wins} wins
          </div>))}
      </section>
      <div id="add-player-container">
        <input value={name} onChange={onPlayerName}/>
        <button onClick={onPlayerAdd}>
          Add Player
        </button>
      </div>
    </section>
  )
}

class App extends StatefulComponent {
  constructor() {
    super()
    this.state = {name: "", players: []}
  }

  render() {
    return (
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React-tastic Pool Tracker</h1>
          </header>
          <Leaderboard
            {...this.state}
            onPlayerName={this.updateName.bind(this)}
            onPlayerAdd={this.addPlayer.bind(this)}
            onPlayerSelect={this.selectPlayer.bind(this)}/>
          <Game {...this.state} onPlayerWin={this.updatePlayer.bind(this)}/>
        </div>
    )
  }

  addPlayer() {
    console.log(this.state.name)
    this.setState({...this.state, players: [...this.state.players, {name: this.state.name, wins: 0}]})
  }

  selectPlayer(id) {
    return () => {
      this.setState({...this.state, players: this.state.players.map((player, i) => {
        return i === id ? {...player, selected: !player.selected} : player
      })})
    }
  }

  updatePlayer(id) {
    return () => {
      // I now see why Clojurescript is so popular with React
      this.setState({...this.state, players: this.state.players.map((player, i) => ({
        ...player,
        selected: false,
        wins: i === id ? player.wins + 1 : player.wins
      }))})
    }
  }

  updateName(event) {
    this.setState({...this.state, name: event.target.value})
  }

}

export default App
