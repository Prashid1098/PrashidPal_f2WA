 const API_KEY= "d495187284f7b366e498adfd81ccf877";
 const searchBox=document.querySelector(".search-bar");
 const searchBtn=document.querySelector(".add-city");
 const Image=document.querySelector(".Images");
 const weatherC=document.querySelector(".weather-cards");
 const  url= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city)
{
    const response=await fetch(url + city + `&appid=${API_KEY}`);
    var data= await response.json();
    console.log(data);

    // document.querySelector(".city-name").innerHTML=data.name+",";
    // document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
    // document.querySelector(".country").innerHTML=data.sys.country;
    // document.querySelector(".humid").innerHTML="Humidity:"+data.main.humidity;
    // document.querySelector(".press").innerHTML="Pressure:"+data.main.pressure;
    // document.querySelector(".rise").innerHTML="Sunrise:"+data.sys.sunrise;
    // document.querySelector(".set").innerHTML="Sunset:"+data.sys.sunset;
    // document.querySelector(".speed").innerHTML=data.wind.speed;
    // document.querySelector(".degree").innerHTML=data.wind.deg;
    const res=createCard(data);
    // weatherC.appendChild(res); ----
    return res;
}

const showWeather= (data) => {
    // console.log(data)
    Image.innerHTML=`<div class="Images">
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
  </div>`
}


function createCard(data)
{
    const card=document.createElement("div");
    card.classList.add("weather-c");
    card.innerHTML=`
    <div class="weather-flex">
        <div class="weather-el">
            <h3 class="temp">${Math.round(data.main.temp)}°C</h3>
            <div class="hl">
              <span class="max">H:${data.main.temp_max}</span>
              <span class="min">L:${data.main.temp_min}</span>
            </div>
            <div class="hp">
              <span class="humid">p:${data.main.humidity}</span>
              <span class="press">H:${data.main.pressure}</span>
            </div>
            <div class="rise-set">
              <span class="rise">sunrise:${data.sys.sunrise}</span>
              <span class="set">sunset:${data.sys.sunset}</span>
            </div>
            <div class="winds">
              <span>Wind: </span>
              <span class="speed">${data.wind.speed} ,</span>
              <span class="degree">${data.wind.deg}</span>
            </div>
            <span class="city-name">${data.name},</span>
            <span class="country">${data.sys.country}</span>
        </div>

        <div class="Images">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
          <div class="cond">${data.weather[0].main}</div>
        </div>

        </div>`;

        return card;
}



function updateWeatherCardContainer(cards) { //----
    // Clear the container
    weatherC.innerHTML = "";

    // Sort the cards in ascending order based on temperature
    cards.sort((a, b) => {
        const tempA = parseInt(a.querySelector(".temp").textContent);
        const tempB = parseInt(b.querySelector(".temp").textContent);
        return tempA - tempB;
    });

    // Append sorted cards back to the container
    cards.forEach(card => {
        weatherC.appendChild(card);
    });
}




// searchBtn.addEventListener("click", ()=>{
//     checkWeather(searchBox.value);  
// });

searchBtn.addEventListener("click", async () => {
    const city = searchBox.value;
    const card = await checkWeather(city);
    const cards = Array.from(weatherC.getElementsByClassName("weather-c"));
    cards.push(card);
    updateWeatherCardContainer(cards);
});


