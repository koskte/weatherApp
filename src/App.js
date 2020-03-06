import React, { Component } from 'react';
import AppBar from './components/appBar';
import WeatherCard from './components/weatherCard';
import Dropdown from './components/dropdown';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
const apiKey = require('./config').apiKey

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tampereForecast: {},
      tampereCurrentWeather: {},
      kuopioForecast: {},
      kuopioCurrentWeather: {},
      jyväskyläForecast: {},
      jyväskyläCurrentWeather: {},
      helsinkiForecast: {},
      helsinkiCurrentWeather: {},
    }   
  }

  fetchForecastData() {
    Promise.all([
      fetch ('http://api.openweathermap.org/data/2.5/forecast?id=634964&units=metric&appid=' + apiKey).then(res => res.json()),
      fetch('http://api.openweathermap.org/data/2.5/forecast?id=655195&units=metric&appid='  + apiKey).then(res => res.json()),
      fetch('http://api.openweathermap.org/data/2.5/forecast?id=650225&units=metric&appid='  + apiKey).then(res => res.json()),
      fetch('http://api.openweathermap.org/data/2.5/forecast?id=658225&units=metric&appid='  + apiKey).then(res => res.json())
    ])
    .then((res) => {
      this.setState({tampereForecast: res[0], jyväskyläForecast: res[1], kuopioForecast: res[2], helsinkiForecast: res[3]})
    });
  }
  
  fetchCurrentWeatherData() {
    fetch('http://api.openweathermap.org/data/2.5/group?id=634964,655195,650225,658225&units=metric&appid=' + apiKey)
    .then((res) => res.json())
    .then((towns) => {
      this.setState({tampereCurrentWeather: towns.list[0], jyväskyläCurrentWeather: towns.list[1], 
        kuopioCurrentWeather: towns.list[2], helsinkiCurrentWeather: towns.list[3]})
    });
  }

  componentWillMount() {
    this.fetchForecastData();
    this.fetchCurrentWeatherData();
  }
  render() {
    return (
      <BrowserRouter>
        <AppBar />
        <Dropdown />
        <Route exact path='/' render={() => (
         <Redirect to='/Kaikki kaupungit'/>
        )}/>
        <Route 
          exact path='/Tampere' 
          component = {() => 
          <Container>
            <WeatherCard forecast={this.state.tampereForecast} currentWeather={this.state.tampereCurrentWeather}/>
          </Container>
        }
          />
          <Route 
          exact path='/Kuopio' 
          component = {() => 
          <Container>
            <WeatherCard forecast={this.state.kuopioForecast} currentWeather={this.state.kuopioCurrentWeather}/>
          </Container>
        }
          />
          <Route 
          exact path='/Jyväskylä' 
          component = {() => 
          <Container>
            <WeatherCard forecast={this.state.jyväskyläForecast} currentWeather={this.state.jyväskyläCurrentWeather}/>
          </Container>
        }
          />
          <Route 
          exact path='/Helsinki' 
          component = {() => 
          <Container>
            <WeatherCard forecast={this.state.helsinkiForecast} currentWeather={this.state.helsinkiCurrentWeather}/>
          </Container>
        }
          />
          <Route 
          exact path='/Kaikki kaupungit' 
          component = {() =>
            <Container>
              <WeatherCard forecast={this.state.tampereForecast} currentWeather={this.state.tampereCurrentWeather}/>
              <WeatherCard forecast={this.state.kuopioForecast} currentWeather={this.state.kuopioCurrentWeather}/>
              <WeatherCard forecast={this.state.jyväskyläForecast} currentWeather={this.state.jyväskyläCurrentWeather}/>
              <WeatherCard forecast={this.state.helsinkiForecast} currentWeather={this.state.helsinkiCurrentWeather}/>
            </Container>
          }
          
          />
      </BrowserRouter>

    );
  }
}

export default App;
