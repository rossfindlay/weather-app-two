import React, {Component} from 'react'

class App extends Component {

  constructor(props) {
    super(props)

    this.capitalise = this.capitalise.bind(this)
  }

  capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  render () {
    return(
      <div className="weather-box">
        <div className="icon-and-temp">
          <img className="weather-image" src={`http://openweathermap.org/img/w/${this.props.currentWeather.weatherIcon}.png`} alt="weather'"/>
          <div className="temp-now">{Math.round(this.props.currentWeather.nowTemp)}°</div>
        </div>
        <div className="weather-description">
          {this.capitalise(this.props.currentWeather.weatherDetail)}
        </div>
      </div>
    )
  }
}


export default App;
