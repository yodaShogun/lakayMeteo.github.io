let date = new Date()
document.querySelector('.datetime').textContent = date.toDateString()
sessionStorage.setItem('app','geolacation in navigator')

let weatheUrl = `https://api.weatherapi.com/v1/current.json?key=6d77015dabb242d581c124608221905&q=18.5795255,-72.2718964&aqi=yes`
 
let options = {
    enableHighAccuracy: true,
    maximumAge: 20000
} 

function error(){
    alert("Geolocalisation denied")
}

mapImg = new Map(); 

mapImg.set('sunny','design/images/cloudly.jpg')
mapImg.set('covered','design/images/covered.jpg')
mapImg.set('stormy','design/images/stormy.jpg')
mapImg.set('Partly cloudy','design/images/partlyCloudly.jpg')
mapImg.set('tempestuous','design/images/cloudly.jpg')
mapImg.set('rainy','design/images/rainy.jpg')

async function weather()
{
    if(sessionStorage.getItem('app'))
    {
        navigator.geolocation.watchPosition((position)=>{
            weatherurl = `https://api.weatherapi.com/v1/current.json?key=6d77015dabb242d581c124608221905&q=${position.coords.latitude},${position.coords.longitude}&aqi=yes`
        }, error,options) 

        const query = await fetch(weatheUrl,{
            method:'GET'
        })

        if(!query.ok)
            alert('A problem has occured wait a moment we gonna fixed it asap')
        else{
                let data = await query.json()
                document.querySelector('.temp').innerHTML = `${data.current.temp_c}°C`
                document.querySelector('.nuage').textContent = data.current.cloud
                document.querySelector('.dirvent').textContent = data.current.wind_dir
                document.querySelector('.vitesse').textContent = data.current.wind_mph
                document.querySelector('.humidite').textContent = data.current.humidity
                document.querySelector('.descImg').innerHTML= `<img src=${data.current.condition.icon} alt=icon meteorologique\>` 
                if(mapImg.has(data.current.condition.text)){
                    document.body.style.background = `url(${mapImg.get(data.current.condition.text)})`
                    document.body.style.backgroundRepeat = "repeat";
                    document.body.style.backgroundSize = 'cover'
                }
                
            }
    }
    else
        alert('may active your position')
} 
setInterval(weather,10000) 
