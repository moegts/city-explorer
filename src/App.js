import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forminput from './components/Forminput';
import LocationData from './components/LocationData';
import axios from 'axios';
import Weather from './components/Weather';
import { Alert } from 'react-bootstrap';
export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display_name: '',
      lon: '',
      lat: '',
      cityShow: false,
      cityImage: '',
      erorr: '',
      erorrHandle: false,
      weatherData: [],
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
    }).catch(e => {
      this.setState({
        erorr: e.toString(),
        erorrHandle: true
      })
      console.log(this.state.erorr)
    }).then(()=>{
      axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/weather?searchInQuery=${this.state.display_name}&lat=${this.state.lat}&lon=${this.state.lon}`).then(res=>{
        this.setState({
          weatherData:res.data.foreCast,
        })
      })
    })
  }
  render() {
    return (
      <div>
        <Forminput handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />
        {
          <Weather weatherData={this.state.weatherData}/>
        }
        {
          this.state.cityShow && <LocationData display_name={this.state.display_name} cityImage={this.state.cityImage} lon={this.state.lon} lat={this.state.lat} />
        }
        { 
          this.state.erorrHandle&&<Alert variant={'danger'}>
            This is a {this.state.erorr} alert—check it out!
          </Alert>
        }
      </div>
    )
  }
}

export default App
