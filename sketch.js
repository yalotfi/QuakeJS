// Global Variables
var mapImage;
var earthquakes;
var csvLink = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';

// Mapbox API things
var imageURL = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/';
var centerLat = 0;
var centerLon = 0;
var zoom = 1;
var ww = 1024;
var hh = 512;
var token = '?access_token=pk.eyJ1IjoieWFsb3RmaSIsImEiOiJjaXo3MXg3Y3YwMDRnMzNvajJnMXl3NjdzIn0.D2DxeQZPj3juo7x5FbsQQQ';

// Shanghai test point
/*var lat = 31.2304;
var lon = 121.4737;*/

function preload() {
    mapImage = loadImage(imageURL + centerLat + ',' + centerLon + ',' + zoom + '/' + ww + 'x' + hh + token);
    earthquakes = loadStrings(csvLink)
}

// Convert longitude to Web-Mercator pixels
function mercatorX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

// Convert latitude to Web-Mercator pixels
function mercatorY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2,zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c
}

function setup() {
    createCanvas(1024,512);
    translate(width/2, height/2);
    imageMode(CENTER);
    image(mapImage, 0, 0);

    var centerX = mercatorX(centerLon);
    var centerY = mercatorY(centerLat);

    for (var i = 0; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercatorX(lon) - centerX;
        var y = mercatorY(lat) - centerY;

        mag = pow(10, mag);
        mag = sqrt(mag);

        var maxMag = sqrt(pow(10,10));
        var d = map(mag, 0, maxMag, 0, 180);

        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d)
    }
}
