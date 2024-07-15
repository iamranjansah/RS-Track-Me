const socket = io();
// console.log("hey");
if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
            const {latitude, longitude} = position.coords;
            socket.emit('send-location', {latitude, longitude});
        },
        (error)=>{
            console.log(error);
        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
            
        }
    );
}

const map = L.map("map").setView([0,0],10)
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.linkedin.com/in/iamranjansah">Ranjan Kumar</a>'
}).addTo(map);

const markers = {}

socket.on('receive-location', (data) =>{
    const {id,latitude, longitude} = data;

    map.setView([latitude,longitude],16);

    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);

    }
    
});
