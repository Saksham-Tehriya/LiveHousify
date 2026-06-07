
mapboxgl.accessToken = mapToken;
// const center = coordinates || ;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates,// starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});


console.log(coordinates);

const marker1 = new mapboxgl.Marker({ color: "red" }) //to add class just add something in curly brackets
    .setLngLat(coordinates)  //listings.geometry.coordinates
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        // .setLngLat(e.lngLat)
        .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
    // .setMaxWidth("300px"))
    .addTo(map);

