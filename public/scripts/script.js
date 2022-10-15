// let weather = {
//     "apikey": "49467b36561faff3399dd1ec37358d26",
//     fetchWeather: function(){
//         fetch(
//             "https://api.openweathermap.org/data/2.5/weather?q=jaipur&appid=49467b36561faff3399dd1ec37358d26"
//         ).then((response) => response.json())
//         .then((data) => console.log(data));
//     },

//     // displayWeather: function(data){
// const { name } = data;
// const { icon, description } = data.weather[0];
// const { temp, humidity } = data.main;
// const { speed } = data.wind;
// console.log(name, icon, description);
// document.querySelector(".city").innerText = "Weather in Jaipur";
// document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
// document.querySelector(".description").innerText = description;
// document.querySelector(".temp").innerText = temp + "C";
//     // }
// }

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=jaipur&units=metric&appid=49467b36561faff3399dd1ec37358d26"
)
  .then((response) => response.json())
  .then((data) => {
    t = data;
    console.log(data);
    const Name = t.name;
    const Icon = data.weather[0].icon;
    const Description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const speed = data.wind.speed;
    console.log(Name, Icon, Description);
    document.querySelector(".city").innerText = "Currently";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + Icon + ".png";
    document.querySelector(".description").innerText = Description;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerText =
      "Wind Speed: " + speed + "km/H";
  });

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6ca5a8c68bmshcd758c8aabf3debp11de78jsn5406392f5636",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};

fetch(
  "https://weatherbit-v1-mashape.p.rapidapi.com/alerts?lat=26.91&lon=75.78",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    d = response;
    const alert = d.alert;
  })
  .catch((err) => console.error(err));

