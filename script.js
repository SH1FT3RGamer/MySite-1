const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");

async function getWeather(city){
  weatherDiv.textContent = "Loading...";
  try{
    // Step 1: Get lat/lon from city name
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geo.json();
    if(!geoData.results) throw new Error();
    
    const { latitude, longitude, name, country } = geoData.results[0];
    
    // Step 2: Get weather from lat/lon
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await weatherRes.json();
    
    weatherDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p style="font-size:40px">${data.current_weather.temperature}°C</p>
      <p>Wind: ${data.current_weather.windspeed} km/h</p>
      <p>Code: ${data.current_weather.weathercode}</p>
    `;
  } catch{
    weatherDiv.textContent = "City not found, try again";
  }
}

btn.addEventListener("click", () => getWeather(input.value));
input.addEventListener("keypress", e => { if(e.key==="Enter") getWeather(input.value) });
getWeather("Johannesburg");