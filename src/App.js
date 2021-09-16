import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forminput from './components/Forminput';
import LocationData from './components/LocationData';
import axios from 'axios';
import Weather from './components/Weather';
import { Alert } from 'react-bootstrap';
import MovieCard from './components/MovieCard'

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
      movieData: [],
      movieCard: false,
      cityMovie:'',
      cityInput:'',
    }
  }
  handleLocation = (e) => {
    let city = e.target.value;
    this.setState({
      display_name: city,
      cityInput:city
    })
    return city;
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
        movieCard: true,
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
      axios.get(`https://city-moegts.herokuapp.com/weather?searchCity=${this.state.cityInput}&lat=${this.state.lat}&lon=${this.state.lon}`).then(res=>{
        this.setState({
          weatherData:res.data,
        })
      })
    }).then(()=>{
      axios.get(`https://city-moegts.herokuapp.com/movie?searchCity=${this.state.cityInput}`).then(res=>{
        this.setState({
          movieData:res.data,
        })
      })
    })
  }
  render() {
    return (
      <div style={{backgroundColor: 'gray'}}>
        <Forminput handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />
        {
          <Weather weatherData={this.state.weatherData}/>
        }
        {
          this.state.cityShow && <LocationData display_name={this.state.display_name} cityImage={this.state.cityImage} lon={this.state.lon} lat={this.state.lat} />
        }

        
          
        <section class="kingOne" >
        
          
          {
            this.state.movieCard && 
            <div class="movieHeader">
            <MovieCard movieData = {this.state.movieData}/>
            </div>

          }
        </section>
        
        { 
          this.state.erorrHandle && <Alert variant={'danger'}>
            This is a {this.state.newcity} alert—check it out!
          </Alert>
        }
      </div>
    )
  }
}

export default App
