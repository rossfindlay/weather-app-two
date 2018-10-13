import React, { Component } from 'react'

class App extends Component {
  render() {
    return(
      <div>
        <div>
          The weather in {this.state.currentWeather.city} is:
        </div>
      </div>
    )
  }
}

export default App;
