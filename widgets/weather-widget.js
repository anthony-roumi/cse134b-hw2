class weatherWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<img style="height:4em;"id="icon" src='' alt="weather icon">&nbsp&nbsp<details style="align-self:center;"><summary id="weather"></summary><ul><li id="windspeeds"></li><li id="humidity"></li></ul></details>`;

    this.fetchWeather();
    this.fetchIcon();
    this.interval = setInterval(() => this.fetchWeather(), 3600000);
    this.interval = setInterval(() => this.fetchIcon(), 3600000);
  }

  fetchIcon() {
    fetch('https://api.weatherapi.com/v1/current.json?key=45c31b0300a4450a816234651230612&q=92093&aqi=no')
    .then(response => response.json())
    .then(data => {
      this.displayIcon(data);
    })
    .catch(() => {
      this.displayIcon(null);
    });
  }

  fetchWeather() {
    const weather = this.shadowRoot.getElementById('weather');
    weather.style.opacity = 0;
    fetch('https://api.weather.gov/gridpoints/SGX/55,21/forecast')
    .then(response => response.json())
    .then(data => {
      this.displayFact(data);
    })
    .catch(() => {
      this.displayFact("Oh no our network connection failed :(");
    });            
  }

  displayFact(weather) {
    let weatherElement = this.shadowRoot.getElementById('weather');
    let windElement = this.shadowRoot.getElementById('windspeeds'); 
    let humidElement = this.shadowRoot.getElementById('humidity'); 
   
    let day = weather.properties.periods[0];
    let dayForecast = day.shortForecast;
    let dayTemp = day.temperature;
    let dayUnit = day.temperatureUnit;
    dayTemp +=  '\u00B0' + dayUnit + ' ' + '|' + ' ';
    dayTemp += dayForecast;
    let windSpeed = 'Windspeed: ' + day.windSpeed;
    windSpeed += ' ' + day.windDirection;
    let humidity = 'Humidity: ' + day.relativeHumidity.value;
    humidity += '%' ;
    weatherElement.textContent = dayTemp;
    windElement.textContent = windSpeed;
    humidElement.textContent = humidity;                
    weatherElement.style.opacity = 1;
  }

  displayIcon(icon) {
    const iconElement = this.shadowRoot.getElementById('icon');
    if (icon === null) {
      iconElement.src = '/images/sad.png';
      iconElement.style.fontSize = '2em';
    } else {
      let iconImg = icon.current.condition.icon;
    iconElement.src = iconImg;
    }
   
    
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }
}



customElements.define('weather-widget', weatherWidget);