sessionStorage.setItem('target','geolacation in navigator')

let astroUrl = `https://api.weatherapi.com/v1/astronomy.json?key=6d77015dabb242d581c124608221905&q=18.5795255,-72.2718964&aqi=yes`

async function astro()
{
    let options = {
        enableHighAccuracy: true,
        maximumAge: 20000
    } 

    function error(){
        alert("Geolocalisation denied")
    }
        
    if(sessionStorage.getItem('target'))
    {
        navigator.geolocation.watchPosition((position)=>{
            astroUrl = `https://api.weatherapi.com/v1/astronomy.json?key=6d77015dabb242d581c124608221905&q=${position.coords.latitude},${position.coords.longitude}&aqi=yes`
        }, error,options) 

        const astroQuery = await fetch(astroUrl,{
            method:'GET'
        })
        if(!astroQuery.ok)
            alert('A problem has occured wait a moment we gonna fixed it asap')
        else
        {
            let astroData = await astroQuery.json() 
            document.querySelector('.lever').textContent = astroData.astronomy.astro.sunrise
            document.querySelector('.coucher').textContent= astroData.astronomy.astro.sunset
            // document.querySelector('#zone').textContent = astroData.location.name
            // document.querySelector('#region').textContent = astroData.location.region
        }
    }
    else
        alert('may active your position')
} 

setInterval(astro,10000)