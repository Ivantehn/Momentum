const time = document.querySelector('.time');
const mainDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name');
const body = document.querySelector('body');
const greetingInput = document.querySelector('.name');
const dayTimeArray = ['night', 'morning', 'afternoon', 'evening'];
const weatherInput = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const weather_description = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherWrapper = document.querySelector('.weather-wrapper');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const weatherErrorSpan = document.querySelector('.weather-error span');


setInterval(() => {
   const date = new Date();
   const currentTime = date.toLocaleTimeString();
   const options = { weekday: 'long', month: 'long', day: 'numeric' };
   const currentDate = date.toLocaleDateString('en-GB', options);
   let arr = currentDate.split(' ');   

   time.textContent = currentTime;
   mainDate.textContent = arr[0] + ' ' + arr[2] + ' ' + arr[1];
}, 1000);

function getTimeOfDay() {
   const date = new Date();
   let hours = date.getHours();
   let time = dayTimeArray[Math.floor(hours / 6)];   
   
   SetImage(time);     

   return greeting.textContent = `Good ${time}`;  
}
function SetImage(time) {
   let randomNum = getRandomNum(1, 20).toString();
   let num = randomNum.padStart(2, '0'); 

   body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${num}.jpg')`;
}

function getRandomNum(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 greetingInput.addEventListener('input', () => {
   localStorage.setItem('greetingName', greetingInput.value);
 });

 weatherInput.addEventListener('change', () => {
   localStorage.setItem('city', weatherInput.value);
   
   getWeather();
 });

function getLocalStorage() {
   greetingInput.value = localStorage.getItem('greetingName');
}

 async function getWeather() { 
   let url;
   if (weatherInput.value.length !== 0) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&lang=en&appid=33c3bc8545f112b01cdbe6fd1aab67f6&units=metric`;
   } else {
      const city = (localStorage.getItem('city')) ? localStorage.getItem('city') : 'minsk';
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=33c3bc8545f112b01cdbe6fd1aab67f6&units=metric`;
      weatherInput.value = (localStorage.getItem('city')) ? localStorage.getItem('city') : 'Minsk';
   }
   const res = await fetch(url);
   const data = await res.json(); 

   if (data.cod === '404') {
      weatherError.classList.remove('hidden');
      weatherWrapper.classList.add('hidden');
      weatherErrorSpan.textContent = localStorage.getItem('city');
   } else {
      weatherError.classList.add('hidden');
      weatherWrapper.classList.remove('hidden');
      temperature.textContent = Math.round(+data.main.temp)  + '°C';
      weather_description.textContent = data.weather[0].description;
      wind.textContent = 'Wind speed: ' + Math.round(+data.wind.speed) + ' m/s';
      humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      }
   }

   

getWeather()

 window.addEventListener('load', () => {
   getLocalStorage();
   getTimeOfDay();
 });