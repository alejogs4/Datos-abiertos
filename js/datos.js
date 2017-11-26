(()=>{
    window.addEventListener('load',(e)=>{
        
        if(e.srcElement.URL.includes('tecnologia')){
            callApi()
        }else if (e.srcElement.URL.includes('salud')){
            getHealthPoints()
        }
        
    })    
    domObjects.comunasSelect.addEventListener('change',(e) =>filterWifiPoints(domObjects.comunasSelect.value))
})()
