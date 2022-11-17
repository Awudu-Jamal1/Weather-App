const cloudImage = document.querySelector('.images img')
const form= document.querySelector('form')
const inner =document.querySelector('.inner')
const options = document.querySelector('#tems')



const accKey ="B8TpAcY2UouDSUxA6Ax2R6kz0027Bj54"
let cityName= "accra"
let tems =  "C"
let Times;


form.addEventListener('submit',(e)=>{
e.preventDefault()
const element = form.elements[0]
cityName = element.value
weatherM()

})

options.addEventListener('change',(e)=>{
    tems = e.target.value
    weatherM()
})

const weatherM =()=>{
  cityCode(cityName).then(data => getWeather(data))
}


//get weather
const getWeather=async(id)=>{
    const weatherurl ='https://dataservice.accuweather.com/currentconditions/v1/'
    const find = `${id}?apikey=${accKey}`
    const response = await fetch(weatherurl + find)
    const result = await response.json()
    const data =await result[0]
    setTemp(data.Temperature,data.WeatherText,data.WeatherIcon,data.LocalObservationDateTime)
    dayNight(data.IsDayTime)
    console.log(result)
}

//getting city code
const cityCode = async(town)=>{
    const city ="https://dataservice.accuweather.com/locations/v1/cities/search"
    const find =`?apikey=${accKey}&q=${town}`
    const response = await fetch(city + find)
    const result = await response.json()
    const data = await result[0]
    setCountry(data.LocalizedName,data.Country)
    return data.Key
}


const setCountry=(city,country)=>{
    const {LocalizedName} =country  
    document.getElementById('sub').innerHTML=`${city} , ${LocalizedName}`
}

const setTemp =(tempreture,weather,icon,time)=>{
const {Imperial, Metric} =tempreture
let condition;
if(tems ==='F'){
    condition = Imperial.Value +" "+ "<sup>o</sup>"+ Imperial.Unit
}else{
    condition = Metric.Value +" "+ "<sup>o</sup>"+ Metric.Unit
}

let timez = time.slice(0,-6)
let times = timez.replace('T', " ")
document.getElementById('time').innerHTML=`${new Date(times).toLocaleTimeString()}`
const temps =` <div id="tnumber">${condition}</div>
<p>${weather}</p>
`
document.getElementById('tempreture').innerHTML=temps
const source =`/Image/climateIcons/${icon}.png`
cloudImage.src =source
}

const dayNight =(time)=>{
if(!time){
    inner.classList.add('night')
    inner.classList.remove('day')
}else{
    inner.classList.remove('night')
    inner.classList.add('day')
}
}


weatherM()