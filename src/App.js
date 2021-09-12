import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forminput from './components/Forminput';
import LocationData from './components/LocationData';
import axios from 'axios';
export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display_name: '',
      lon: '',
      lat: '',
      cityShow: false,
      cityImage: '',
    }
  }
  handleLocation = (e) => {
    let city = e.target.value;
    this.setState({
      display_name: city,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      method: "GET",
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}`,
    }
    axios(config).then(res => {
      let responseData = res.data[0];
      this.setState({
        display_name: responseData.display_name,
        lon: responseData.lon,
        lat: responseData.lat,
        cityShow: true,
      })

      let configImage = {
        method: "GET",
        baseURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&size=600x600&zoom=1-18&markers=${this.state.lat},${this.state.lon}|icon:large-blue-cutout&format=png}`,
      }
      axios(configImage).then(res => {
        let responseData = res.config.baseURL;
        this.setState({
          cityImage: responseData,
        })

      })
    })
  }
  render() {
    return (
      <div>
        <Forminput handleLocation={this.handleLocation} handleSubmit={this.handleSubmit}/>
        {
          this.state.cityShow && <LocationData display_name={this.state.display_name} cityImage={this.state.cityImage} lon={this.state.lon} lat={this.state.lat}/>
        }
      </div>
    )
  }
}

export default App
