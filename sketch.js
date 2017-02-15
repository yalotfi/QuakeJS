
// Global Variables
var mapImage;
var earthquake;

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
    earthquake = loadStrings(csvLink)
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
}
