var map;
var marker;
var poly;
var markerPosReal;
var sitios = [];
var circulos = [];
var listenerMarker;
var puntuacionTotal = 0;
var contadorSitios = 0;


function initMap() {

    this.puntuacionTotal=0;
    this.contadorSitios=0;
    this.sitios = [];
    
    document.getElementById('area1').innerHTML = this.puntuacionTotal + " Puntos Totales";
    
    document.getElementById('area2').innerHTML =  "0 Puntos Parciales";

    sitios.push({
        coordenadas: new google.maps.LatLng(43.6473221, -5.8631759),
        titulo: "Cabo de Peñas",
        desc: "El cabo de Peñas es el cabo más septentrional del Principado de Asturias.",
        img: "caboPenias.png"
    });
    sitios.push({
        coordenadas: new google.maps.LatLng(43.438839, -5.192542),
        titulo: "Mirador del Fitu",
        desc: "En uno de los collados más famosos de la Sierra del Sueve se levanta una antigua atalaya de hormigón de principios del siglo XX: el Mirador del Fito. Desde aquí podemos realizar un plano secuencia sin cortes, apenas sin pestañeos, que deja ver de inmediato los elementos básicos del paisaje asturiano: mar, media montaña, alta montaña, praos, valles, niebla, poblaciones. En la larga distancia, con días despejados, descubrimos abultados perfiles y siluetas como si frente a nosotros se formase un enorme mapa 3D",
        img: "miradorFitu.jpg"
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.5484521,-6.5326118),
        titulo:"Cementerio de Luarca",
        desc:"Uno de los cementerios más antiguos y quizás más bonitos de la costa del Cantábrico",
        img:"cementerioLuarca.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.421468, -4.747471),
        titulo:"Cubos de la Memoria",
        desc:"Desde que se inaugurara la obra, a finales del año 2001, los Cubos de la Memoria han convocado ya una multitud de visitantes, que se van sorprendidos, nunca indiferentes, ante la carga cromática, apasionada, y el nuevo horizonte de color de la capital del Concejo de Llanes.",
        img:"llanesCubos.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.549163, -5.663060),
        titulo:"Elogio del Horizonte",
        desc:"Está concebido a partir de un modelo de pequeño formato, que ha ido «creciendo» hasta alcanzar diez metros de altura y un peso de 500 toneladas. Está realizado en hormigón armado, en el propio emplazamiento, el Cerro de Santa Catalina, a partir de dos pilares que actúan como soportes de una elipse abierta. Con sus brazos acogedores y su cuerpo sólido y, a la vez, liviano, el Elogio parece querer lanzarse a volar. El cielo es el techo de esta casa común, en cuyo interior la música del viento suena. El Elogio del Horizonte es también el elogio de la naturaleza, sobre el promontorio donde hace veinte siglos un pueblo echó raíces y escogió los límites de su hogar.",
        img:"elogioHorizonte.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.554179,-6.1145106),
        titulo:"Playa de Aguilar",
        desc:"En el concejo de Muros de Nalón, a 1,8 km de Muros, 4,2 km de Soto del Barco y 22 km de Avilés. Se trata de una playa de 640 mt. de longitud de arena dorada fina, rodeada de acantilados suaves y bosques.Es una playa de oleaje medio y de ocupación alta en temporada de verano.Como ya es habitual, desde hace años se le viene concediendo la Bandera Azul por la Calidad de sus aguas y este año 2019 no iba a ser menos.",
        img:"playaAguilar.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.580497, -5.967484),
        titulo:"Museo de anclas Philippe Cousteau",
        desc:" El Museo de Anclas Philippe Cousteau en Salinas es un homenaje a los hombres del mar, a sólo unos metros de un Mar Cantábrico que unas veces es pacífico con los bañistas y otras rompe con fuerza contra las rocas mientras se estremecen los curiosos.",
        img:"museoAnclas.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.006490, -6.697935),
        titulo:"Muniellos",
        desc:"Paisaje forestal famoso por sus robles, con museos y exhibiciones relacionados con el hábitat natural.",
        img:"muniellos.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.363770, -5.843308),
        titulo:"Catedral de Oviedo",
        desc:"Templo terminado de construir en XVI con estructuras prerrománicas, románicas, renacentistas y barrocas.",
        img:"catedralOviedo.jpg"	
    });
    sitios.push({
        coordenadas:new google.maps.LatLng(43.309641, -5.054699),
        titulo:"Santuario de Covadonga",
        desc:"Pintoresco destino de peregrinación con una capilla dentro de una cueva y un lago bajo esta.",
        img:"covadonga.jpg"	
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

    this.agregarFoto();
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
function llenarCirculos() {
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
        position: sitios[this.contadorSitios].coordenadas,
        map: map,
        draggable: false,
        title: sitios[this.contadorSitios].titulo,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });

    var dist = Math.round(google.maps.geometry.spherical.computeDistanceBetween(sitios[this.contadorSitios].coordenadas, marker.position));


    var info = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+this.sitios[this.contadorSitios].titulo+'</h1>'+
            '<div id="bodyContent">'+
            "<p> " + this.sitios[this.contadorSitios].desc + "</p>" +
            "<p> Distancia: " + dist + " metros</p>" +
            "<p> Puntuacion: " + this.puntuacion(dist) + "</p>" +
            '</div>'+
            '</div>';
 
    var infowindow = new google.maps.InfoWindow({
        content: info
      });

      infowindow.open(this.map, this.markerPosReal);

      this.puntuacionTotal = this.puntuacionTotal + this.puntuacion(dist);
      document.getElementById('area1').innerHTML = this.puntuacionTotal + " Puntos Totales";
    
      document.getElementById('area2').innerHTML = this.puntuacion(dist) + " Puntos Parciales";

    var polyOptions = {
        strokeColor: '#FFFF00',
        strokeOpacity: 1.0,
        strokeWeight: 10
    };

    this.poly = new google.maps.Polyline(polyOptions);
    this.poly.setMap(map);
    path = poly.getPath();
    path.push(sitios[this.contadorSitios].coordenadas);
    path.push(marker.position);

}

function clearCirclesPath() {
    for (var i = 0; i < circulos.length; i++) {
        circulos[i].setMap(null);
    }
    circulos = [];
}

function confirmar() {

    this.llenarCirculos();    

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
    this.quitarCirculosMarkersyLineas();
    this.listenerMarker = google.maps.event.addListener(map, 'click', function(event) {
        situarMarcador(event.latLng);
    });
    document.getElementById('confirmarButton').removeAttribute('disabled');
    document.getElementById('okButton').setAttribute('disabled', true);

    this.contadorSitios = this.contadorSitios + 1

    if(this.contadorSitios== this.sitios.length){
        alert("Juego acabado. Puntuacion: "+ this.puntuacionTotal)
        this.initMap();
    }else{
        this.agregarFoto();

    }

}

function agregarFoto() {
    document.getElementById('area2').innerHTML =  "0 Puntos Parciales";

    document.getElementById('imagen').innerHTML =
        "<h4> Imagen número " + (this.contadorSitios+1) + "</h4>" +
        "<img src=\"img/" + this.sitios[this.contadorSitios].img + "\" >";
}


