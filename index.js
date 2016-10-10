var port = 8080;

var socket = require( "socket.io" );
var express = require( "express" );
var app = express();
var http = require( "http" ).Server( app );
var io = require( "socket.io" )( http );




app.get( "/", function( request, response ) {
    response.sendFile( __dirname + "/views/index.html" );
} );

io.on( "connection", function( socket ){
    console.log( "User is logged in" );

    socket.on( "disconnect", function() {
        console.log( "User is logged out" );
    } );
});

http.listen( port, function() {
    console.log( "Listening on : " + port );
} );