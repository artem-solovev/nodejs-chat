var port = 8080;
var socket = require( "socket.io" );
var express = require( "express" );
var app = express();
var http = require( "http" ).Server( app );



app.get( "/", function( request, response ) {
    response.sendFile( __dirname + "/views/index.html" );
} );

http.listen( port, function() {
    console.log( "Listening on : " + port );
} );