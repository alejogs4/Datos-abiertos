//Consigue la posicion actual del usuario
const currentPosition = (locations) =>{
    if ( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition((data) =>{
            let geolocationData = {lat : data.coords.latitude,lng : data.coords.longitude}
            printLibrariesData(geolocationData,locations)
        },(err) =>console.log(err.message))
    }
}

//Consigue la georeferencia de cada biblioteca

const getLibraryGeolocation = georeference =>{
    let newGeolocation = georeference.split(','),
        latitude = newGeolocation[0].split('').filter((value) => !isNaN(value) || value === '-' || value === '.' ).join(''),
        longitude = newGeolocation[1].split('').filter((value) => !isNaN(value) || value === '-' || value === '.').join('')
    return{lat : Number(latitude),lng : Number(longitude)}
}

//Hace la peticion a la API para conseguir la informacion de las bibliotecas
const getLibraries = () => {
    let locations = new Array(0)
    fetch('https://www.datos.gov.co/resource/in3j-awgi.json')
        .then(response => response.json())
        .then(libraries =>{
            libraries.forEach((library) =>{
                let libraryData = {
                     position : getLibraryGeolocation(library.georeferencia),
                     name : library.nombre_de_la_biblioteca,
                     departamento : library.departamento,
                     municipio : library.municipio,
                     direccion : library.direcci_n_de_la_biblioteca
                }
                locations.push( libraryData )
            })
            currentPosition(locations)
        })
}


const printLibrariesData = (obj,location) =>{
    c(obj)
    let map
    map = new google.maps.Map(document.getElementById('map'),{
        zoom:12,
        center:obj
    })
    let marker = new google.maps.Marker({
        position: obj,
        map : map,
        title:'Tu ubicacion'
    })

    let markers = location.map((library) =>{
        let m = new google.maps.Marker({
            position:library.position,
            map: map,
            title : library.name
        })

        let contentString = `
            <h2>Datos</h2>
            <p><strong>Nombre:</strong>${library.name}</p>
            <p><strong>Departamento:</strong>${library.departamento}</p>
            <p><strong>Municipio:</strong>${library.municipio}</p>
            <p><strong>Direccion:</strong>${library.direccion}</p>
        
        `
        let info = new google.maps.InfoWindow({
            content:contentString
        })
        m.addListener('click',()=>{
            info.open(map,m)
        })
    })
    
}


const mainMaps = () =>{
    getLibraries()
}