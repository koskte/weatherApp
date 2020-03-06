import React, { Component } from 'react'
import {Container, Row, Col} from 'reactstrap'
import './weatherCard.css';
class weatherCard extends Component {

  setDaySuffix(day) {
    let formattedDay;
    if (day.charAt(0) == 0) {
      formattedDay = day.slice(1);
    } else {
      formattedDay = day;
    }
    if (formattedDay >= 11 && formattedDay <= 13) {
        return formattedDay +  "th";
    }
    switch (formattedDay % 10) {
    case 1:
        return formattedDay +  "st";
    case 2:
        return formattedDay +  "nd";
    case 3:
        return formattedDay +  "rd";
    default:
        return formattedDay + "th";
    }
}

  getPrecipitationForCurrentWeather () {
    if (this.props.currentWeather.main !== undefined) {
      let weather = this.props.currentWeather;
      let precipitation;
        if (weather.rain) {
          precipitation = weather.rain['3h'];
        } else if (weather.snow) {
          precipitation = weather.snow['3h'];
        } else {
          precipitation = 0;
        }
        return Math.round(precipitation);
      }
    }

    getPrecipitationForForecast (index) {
      if (this.props.forecast.list !== undefined) {
        let forecast = this.props.forecast.list;
        let precipitation;
          if (forecast[index].rain) {
            precipitation = forecast[index].rain['3h'];
          } else if (forecast[index].snow) {
            precipitation = forecast[index].snow['3h'];
          } else {
            precipitation = 0;
          }
          return Math.round(precipitation);
        }
      }

  createCurrentWeatherCard () {
    if (this.props.currentWeather.main !== undefined) {
      const town = this.props.currentWeather;
      const date = new Date().toDateString();
      const month = date.slice(4,7);
      const day = date.slice(8,10);
      let iconURL = 'http://openweathermap.org/img/wn/' + town.weather[0].icon + '.png';
      let currentWeatherTime = new Date(town.dt * 1000).toTimeString();
      currentWeatherTime = currentWeatherTime.slice(0,5);

      
      return (
        
        <Col className="topCol">
        <Row className="topRow">
          <Col>
            <p className="city">{town.name}</p>
            <p className="weather">{town.weather[0].description.charAt(0).toUpperCase() + town.weather[0].description.slice(1)}</p>
          </Col>
          <Col>
            <p className="temperature">{Math.round(town.main.temp)} &#8451;</p>
            <img src={iconURL} alt="Weather icon" className="currentWeatherIcon" />
          </Col>
        </Row>

        <Row>
          <Col className="dateTime">            
            <p className="date">{month} {this.setDaySuffix(day)}</p>
            <p className="time">{currentWeatherTime}</p>
          </Col>

          <Col xs="auto">
            <p className="wind">Wind: {town.wind.speed} m/s</p>
            <p className="humidity">Humidity: {town.main.humidity}%</p>
            <p className="precipitation">Precipitation (3h): {this.getPrecipitationForCurrentWeather()}mm</p>
          </Col>
        </Row>

      </Col>
      )
    }

  }
  createForecastCards() {
    if (this.props.forecast.list !== undefined) {
      let cards = [];
  
      cards = this.props.forecast.list.slice(0,5).map((forecast, index) => {
      let iconURL = 'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png';
      return (
        <Col className="forecast" key={forecast.dt}>
        <Row className="forecastTop">
          <Col>
            <p className="forecastTime">{forecast.dt_txt.slice(11,16)}</p>
            <img src = {iconURL} alt="Weather icon"/>
            <p className="forecastTemperature">{Math.round(forecast.main.temp)} &#8451;</p>
          </Col>
        </Row>

        <Row className="forecastBottom">
          <Col>            
            <p>{forecast.wind.speed} m/s</p>
            <p>{forecast.main.humidity}%</p>
            <p>{this.getPrecipitationForForecast(index)}mm</p>
          </Col>
        </Row>
      </Col>
      )
    })
    return cards;
    }
  }

  render() {
    return (
      

      <Container className="topContainer">
        {this.createCurrentWeatherCard()}
        <Container className="forecastContainer">
          <Row className="forecastRow">
            {this.createForecastCards()}
          </Row>
        </Container>
      </Container>
      
    )
  }
}


export default weatherCard;