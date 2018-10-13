import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="weather-box">
        <div className="icon-and-temp">
          <div>{this.props.time}</div>
          <img className="weather-image" src={`http://openweathermap.org/img/w/${this.props.weatherIcon}.png`}/>
          <div className="temp-now">{Math.round(this.props.temp)}°</div>
        </div>
        <div className="weather-description">
          {this.props.weatherDetail}
        </div>
      </div>
    )
  }
}

export default App;
