import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    this.getLatLng = this.getLatLng.bind(this)
  }



  getLatLng() {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Edinburgh&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }


  render() {
    this.getLatLng()
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
