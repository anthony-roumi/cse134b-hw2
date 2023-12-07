            class weatherWidget extends HTMLElement {
              constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.innerHTML = `<img id="icon" src='' alt="weather icon"><p style="width:25vw;" style="font-size: 1em;" id="weather"></p>`;
          
                this.fetchWeather();
                this.fetchIcon();
                this.interval = setInterval(() => this.fetchWeather(), 3600000);
                this.interval = setInterval(() => this.fetchIcon(), 3600000);
              }

              fetchIcon() {
                fetch('http://api.weatherapi.com/v1/current.json?key=45c31b0300a4450a816234651230612&q=92093&aqi=no')
                .then(response => response.json())
                .then(data => {
                  this.displayIcon(data);
                })
                .catch(() => {
                  this.displayIcon("");
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
                const weatherElement = this.shadowRoot.getElementById('weather');
               
                let day = weather.properties.periods[0];
                let dayForecast = day.detailedForecast;
                
                weatherElement.textContent = dayForecast;
                weatherElement.style.opacity = 1;
              }

              displayIcon(icon) {
                const iconElement = this.shadowRoot.getElementById('icon');
                let iconImg = icon.current.condition.icon;
                iconElement.src = iconImg;
                console.log(iconElement);
              }
          
              disconnectedCallback() {
                clearInterval(this.interval);
              }
            }
          
            customElements.define('weather-widget', weatherWidget);
      