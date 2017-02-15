
// Global Variables
var mapImage;
var earthquakes;

// Mapbox API things
var centerLat = 0;
var centerLon = 0;
var ww = 1024;
var hh = 512;
var imageURL = 'url';
var token = 'text';
var zoom = 1;

// USGS Data
var csvLink = 'url';

function preload() {
    mapImage = loadImage(imageURL);
    earthquakes = loadStrings(csvLink)
}


// Convert longitude to Web-Mercator pixels
function mercatorX(lon) {
    lon = radians(lon);
    var a = ((hh/2) / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

// Convert latitude to Web-Mercator pixels
function mercatorY(lat) {
    lat = radians(lat);
    var a = ((hh/2) / PI) * pow(2,zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b)
    return a * c
}

function setup() {
    createCanvas(ww, hh);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapImage, 0, 0);

    var centerX = mercatorX(centerLon);
    var centerY = mercatorY(centerLat);

    for (var i = 1; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercatorX(lon) - centerX;
        var y = mercatorY(lat) - centerY;

        mag = pow(10, mag);
        mag = sqrt(mag);

        var maxMag = sqrt(pow(10, 10));
        var d = map(mag, 0, maxMag, 0, 100);

        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }
}
