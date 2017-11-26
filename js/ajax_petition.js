const callApi = () =>{  
    fetch('https://www.datos.gov.co/resource/4ai7-uijz.json')
        .then( response => response.json())
        .then( wifis => {
            domObjects.template = ''
            domObjects.initializeTemplate()
            wifis.forEach(point => {
                domObjects.fillWifiTable(point)
            })
            domObjects.printWifiData()
        })
        .catch( err => console.log(err.message))
}
//filtrar puntos wifi
const filterWifiPoints = (comuna) =>{
    fetch(`https://www.datos.gov.co/resource/4ai7-uijz.json?comuna=${comuna}`)
        .then(response => response.json() )
        .then(wifi => {
            console.log(wifi)

            domObjects.template = null
            domObjects.initializeTemplate()
            domObjects.dataInfo.innerHTML = ''

            wifi.forEach(point => {
                domObjects.fillWifiTable(point)
            })
            domObjects.printWifiData()
        })
}

const getHealthPoints = () =>{
    fetch('https://www.datos.gov.co/resource/g373-n3yy.json')
    .then(response => response.json())
    .then((hospital)=>{
        
        hospital.forEach((place)=>{
            let healthPoint = {
                position:{lat:place.punto.coordinates[1],lng:place.punto.coordinates[0]},
                name:place.nombre_sede
            }
            healthDomObjects.healthPoints.push(healthPoint)
        })

        //get initial position for the map
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (data)=>{
                let position = {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                }
                healthDomObjects.initMap(position)
            },(err)=>{
                console.log(err)
            })
        }
    })
}