const apiKey = "fab69fc8668feb1c1fd76d811c30b7b0"; 

const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    const cachedData = localStorage.getItem(city);

    if (cachedData) {
        displayWeatherData(JSON.parse(cachedData));
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Cidade não encontrada.');
        }
        const data = await response.json();
        console.log(data);  
        saveWeatherData(city, data);
        displayWeatherData(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherInfo.innerHTML = '';
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="Ícone do Clima">
        <p>Temperatura: ${temperature}°C</p>
        <p>Umidade: ${humidity}%</p>
        <p>Descrição: ${description}</p>
    `;


    weatherInfo.classList.add('weather-container', 'show');
    errorMessage.textContent = '';
}

function saveWeatherData(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
}
