const domObjects = ((d)=>{
    //Templates and elements to print wifi location info
    let dataInfo = d.getElementById('wifi')
    let comunasSelect = d.getElementById('comunas')    
    let template

    function initializeTemplate(){
        this.template = `
        <table class="striped">
            <tr>
                <th>Barrio</th>
                <th>Comuna</th>
                <th>Direccion</th>
                <th>Nombre del sitio</th>
            </tr>`
    }
    function fillWifiTable(point){
        this.template += `
        <tr>
            <td>${point.barrio}</td>
            <td>${point.comuna}</td>
            <td>${point.direcci_n}</td>
            <td>${point.nombre_del_sitio}</td>
        </tr>`
    }

    function printWifiData (){
        this.template += '</table>'
        this.dataInfo.innerHTML = domObjects.template
    }


    return{
        dataInfo,
        template,
        fillWifiTable,
        printWifiData,
        initializeTemplate,
        comunasSelect
    }
})(document)


const healthDomObjects = ((d)=>{
    //Get user position    
    let map
    let healthPoints = []

    function initMap(positionObj){
        this.map = new google.maps.Map(document.getElementById('map'), {
           zoom: 13,
           center: positionObj
         });
      
        let marker = new google.maps.Marker({
           position: positionObj,
           title: 'Tu ubicacion'
        });
        marker.setMap(this.map)


        let markers = healthPoints.map( (hospital)=>{
            return new google.maps.Marker({
                position: hospital.position,
                map:this.map,
                title:hospital.name
            })
        })
    }
    return{
        initMap,
        healthPoints
    }
})(document)
// function initMap() {
//     var myLatLng = {lat: -25.363, lng: 131.044};

//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: myLatLng
//     });

//     var marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       title: 'Hello World!'
//     });
//   }

