import React, { Component } from 'react';
import Header from './Components/Header.js';
import NavBar from './Components/NavBar.js';
import CardArea from './Components/CardArea.js';
import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      games: []
    }

  }

  componentDidMount() {
    fetch("https://fe-apps.herokuapp.com/api/v1/whateverly/1901/kobesparrow/boardGames")
    .then(response => response.json())
    .then(gamesData => this.setState({games: gamesData.boardGames}))
    // .then(this.shuffle);
    .catch(err => {
      throw new Error(err);
    })

    fetch('https://fe-apps.herokuapp.com/api/v1/whateverly/1901/kobesparrow/localGameParlours')
      .then(response => response.json())
      .then(locations => {
        this.setState({
          locations: locations.localGameParlours
        })
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  shuffle() {
    console.log('shuffle success')
    let shuffledGames = this.state.games.sort(() => 0.5 - Math.random());
    let splicedGames = shuffledGames.splice(0, 8);
    console.log('splicedGames ', splicedGames)
    this.setState({
      games: splicedGames
    })
  }

  render() {
    let cardArea = this.state.games.length ?
      <CardArea
        gamesData={this.state.games}
        locationData={this.state.locations} />
      : 'Loading...';

    return (
      <div className="App">
        <Header header={Header} />
        {cardArea}
      </div>
    );

    

    // let cardArea = "loading";
    // if (this.state.games.length !== 0) {
    //   return (
    //     <div className="App">
    //       <Header header={Header}/>
    //         <CardArea
    //           gamesData={this.state.games}
    //           locationData={this.state.locations} />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="App">
    //       <Header header={Header}/>
    //         <CardArea cardArea={cardArea} />
    //     </div>
    //   )
    // }
    }

}

export default App;
