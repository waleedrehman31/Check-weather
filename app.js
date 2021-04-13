const main = document.getElementById('main');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');
const alertCloseBTN = document.getElementById('alertCloseBTN');
const goBtn = document.getElementById('goBtn');
const loading = document.getElementById('loading'); 

successAlert.style.display = 'none';
errorAlert.style.display = 'none';
loading.style.display = 'none';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        errorAlert.style.display = '';
        errorAlert.innerHTML = ` 
        <div class="alert alert-danger" id="errorAlert" role="alert">
        You Browzer Does Not Support
        </div>`
    }
}

async function showPosition(position) {
    loading.style.display = '';
    main.innerHTML = ''
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const key = process.env.API_KEY;
    const  API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=1&units=metric&appid=${key}`;
    const data = await fetch(API_URL);
    const dataApi = await data.json();

    if (dataApi ) {
        dataApi.list.forEach(temps => {        
           main.innerHTML = `
           <div class="col"> 
               <div class="card">        
                   <div class="card-body">
                       <h5 class="card-title">City Name: ${temps.name}</h5>
                       <p class="card-text">Temprature: ${temps.main.temp}c</p>
                       
                       <div class="card-header"></div>
                       <p>Feels like: ${temps.main.feels_like}</p>
                       <p>Min Temprature: ${temps.main.temp_min}</p>
                       <p>Max Temprature: ${temps.main.temp_max}</p>
                       <p>humidity: ${temps.main.humidity}</p>
                       <p>Pressure: ${temps.main.pressure}</p>
                   </div>
               </div>
           </div>`
           successAlert.style.display = '';
           loading.style.display = 'none';
       });     
    } else {
        errorAlert.style.display = '';
        errorAlert.innerHTML = ` 
        <div class="alert alert-danger alert-dismissible fade show mt-3" id="successAlert" role="alert">
        <strong>Server Down</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" ></button>
      </div>`
    }
}

alertCloseBTN.addEventListener('click', () => {
    successAlert.style.display = 'none'
});

goBtn.addEventListener('click', getLocation)