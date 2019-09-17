var map;
var marker;
var poly;
var markerPosReal;
var sitios = [];
var circulos = [];
var listenerMarker;


function initMap() {

    sitios.push({
        coordenadas: new google.maps.LatLng(43.6473221, -5.8631759),
        titulo: "Cabo de Peñas",
        desc: "El cabo de Peñas es el cabo más septentrional del Principado de Asturias.",
        img: "caboPenias.png"
    });


    var Oviedo = new google.maps.LatLng(43.354810, -5.851805);
    var misOpciones = {
        center: Oviedo,
        zoom: 8,
        streetViewControl: false,
        disableDefaultUI: true,
        minZoom: 6,
        maxZoom: 19,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById("map"),
        misOpciones);

    this.listenerMarker = google.maps.event.addListener(map, 'click', function(event) {
        situarMarcador(event.latLng);
    });

    this.agregarFoto(0);
}

function situarMarcador(localizacion) {
    var clickedLocation = new google.maps.LatLng(localizacion);
    addMarker(localizacion);
    map.panTo(localizacion);
}

function addMarker(location) {
    if (marker) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function puntuacion(distancia){
    if(distancia<10000){
        return 100;
    }else if(distancia<20000){
        return 50;
    }else if(distancia<30000){
        return 25;
    }else{
        return 0;
    }
}
function llenarCirculos(contadorSitios) {
    var i;
    for (i = 0; i <= 30000; i += 10000) {
        var circuloOptions = {
            strokeColor: '#DCAAAC',
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: '#00FFFF',
            fillOpacity: 0.10,
            map: map,
            center: marker.position,
            radius: i
        };
        circulos.push(new google.maps.Circle(circuloOptions));
    }

    this.markerPosReal = new google.maps.Marker({
        position: sitios[contadorSitios].coordenadas,
        map: map,
        draggable: false,
        title: sitios[contadorSitios].titulo,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });

    var polyOptions = {
        strokeColor: '#FFFF00',
        strokeOpacity: 1.0,
        strokeWeight: 10
    };

    this.poly = new google.maps.Polyline(polyOptions);
    this.poly.setMap(map);
    path = poly.getPath();
    path.push(sitios[contadorSitios].coordenadas);
    path.push(marker.position);

}

function clearCirclesPath() {
    for (var i = 0; i < circulos.length; i++) {
        circulos[i].setMap(null);
    }
    circulos = [];
}

function confirmar() {
    var dist = Math.round(google.maps.geometry.spherical.computeDistanceBetween(sitios[0].coordenadas, marker.position));

    this.llenarCirculos(0);
    document.getElementById('area1').innerHTML = this.puntuacion(dist) + " Puntos Totales";
    console.log("Distancia: " + dist);

    document.getElementById('confirmarButton').setAttribute('disabled', true);
    document.getElementById('okButton').removeAttribute('disabled');
    google.maps.event.removeListener(this.listenerMarker);
}

function quitarCirculosMarkersyLineas() {
    this.clearCirclesPath();
    this.marker.setMap(null);
    this.markerPosReal.setMap(null);
    this.poly.setMap(null);
}

function okPuntuacion() {
    document.getElementById('area1').innerHTML = " ";
    this.quitarCirculosMarkersyLineas();
    this.listenerMarker = google.maps.event.addListener(map, 'click', function(event) {
        situarMarcador(event.latLng);
    });
    document.getElementById('confirmarButton').removeAttribute('disabled');
    document.getElementById('okButton').setAttribute('disabled', true);

}

function agregarFoto(posicion) {
    document.getElementById('imagen').innerHTML =
        "<h4> " + this.sitios[posicion].titulo + "</h4>" +
        "<p> " + this.sitios[posicion].desc + "</p>" +
        "<img src=\"img/" + this.sitios[posicion].img + "\" >";

}


