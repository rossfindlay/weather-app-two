import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latlng: {},
      currentWeather: [],
      searchCity: '',
      searchValue: ''
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
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lng}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        currentWeather: {
          city: data.name,
          humidity: data.main.humidity,
          temp: data.main.temp,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          
        }
      })
    })
  }

  handleSearchButton() {
    this.getLatLng(this.state.searchValue)
      .then(result => this.getCurrentWeather(result))
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

      </div>
    );
  }
}

export default App;
