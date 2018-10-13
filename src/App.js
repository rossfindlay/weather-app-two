import React, { Component } from 'react';
import './App.css';
import Weather from './Weather'
import City from './City'
import Forecast from './Forecast'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latlng: {},
      currentWeather: [],
      weatherForecast: [],
      searchCity: '',
      searchValue: '',
      gotWeather: false,
    }

    this.getLatLng = this.getLatLng.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSearchBar = this.handleSearchBar.bind(this)
  }



  getLatLng(city) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        latlng: data.results[0].geometry.location,
        searchCity: data.results[0].formatted_address
      })
      return data.results[0].geometry.location
    })
  }

  getCurrentWeather(result) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lng}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        currentWeather: {
          city: data.name,
          humidity: data.main.humidity,
          nowTemp: data.main.temp,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          weatherCode: data.weather[0].id,
          weatherMain: data.weather[0].main,
          weatherDetail: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          cloudCover: data.clouds.all
        }
      })
      this.setState({
        gotWeather: true
      })
    })
  }

  getForecastWeather(result) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${result.lat}&lon=${result.lng}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const weatherData = data.list.map(forecast => {
        return (
          {
            time: forecast.dt,
            temp: forecast.main.temp,
            weatherCode: forecast.weather[0].id,
            weatherMain: forecast.weather[0].main,
            weatherDetail: forecast.weather[0].description,
            weatherIcon: forecast.weather[0].icon,
            cloudCover: forecast.clouds.all
          }
        )
      })
      this.setState({
        weatherForecast: weatherData
      })
    })
  }

  handleSearchButton() {
    this.getLatLng(this.state.searchValue)
      .then(result => this.getCurrentWeather(result))

    this.getLatLng(this.state.searchValue)
    .then(result => this.getForecastWeather(result))
  }

  handleSearchBar(e) {
    this.setState({
      searchValue: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <input
          id="search"
          placeholder="City..."
          type="text"
          value={this.state.searchValue}
          onChange={this.handleSearchBar}>
        </input>
        <button onClick={this.handleSearchButton}>Search</button>
      {this.state.gotWeather ? (
          <div>
            <City
              searchCity={this.state.searchCity}
            />
            <Weather
              currentWeather={this.state.currentWeather}
            />
            {this.state.weatherForecast.map(forecast => {
              return (
                <Forecast
                  time={forecast.time}
                  temp={forecast.temp}
                  weatherDetail={forecast.weatherDetail}
                  weatherIcon={forecast.weatherIcon}
                />
              )
            })}
          </div>
      ) : null}
      </div>
    );
  }
}

export default App;
