import React, {Component} from 'react'
import moment from 'moment'
import 'moment-timezone'

class App extends Component {
  render(){
    return (
      <div className="weather-box">
        <div className="icon-and-temp">
          <div>{moment.tz((this.props.time) * 1000, this.props.timeZoneId).format("D MMM HH:mm")}</div>
          <img className="weather-image" src={`http://openweathermap.org/img/w/${this.props.weatherIcon}.png`} alt="weather"/>
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
