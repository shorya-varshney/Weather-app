document.querySelector('.searchbtn').addEventListener('click', async () => {
  const city = document.querySelector('.input').value;
  if (!city) {
      alert('Please enter a city name');
      return;
  }

  const API_KEY = "3d857760531b0f1623b345c48b1b9e27"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)

      if (data.cod !== 200) {
          document.getElementById('weather').innerHTML = `<p style="color:red;">City not found!</p>`;
          document.querySelector('.weather-card').style.display = 'block';
          return;
      }

      document.getElementById('weather').innerHTML = `
          <p><strong>${data.name}, ${data.sys.country}</strong></p>
          <p>${data.weather[0].main}</p>
          <p>🌡 Temperature: ${data.main.temp}°C</p>
          <p>💨 Wind: ${data.wind.speed} Km/h</p>
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
      `;

      document.querySelector('.weather-card').style.display = 'block';

  } catch (error) {
      console.error('Error fetching weather:', error);
  }
});
