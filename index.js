var port = 8080;

var socket = require( "socket.io" );
var express = require( "express" );
var app = express();
var http = require( "http" ).Server( app );
var io = require( "socket.io" )( http );

app.use( express.static( __dirname ) );


app.get( "/", function( request, response ) {
    response.sendFile( __dirname + "/views/index.html" );
} );

io.on( "connection", function( socket ){

    var username = "";

    socket.on( "user nickname", function( nickname ) {
        socket.broadcast.emit( "user nickname", nickname );
        setName( nickname );
    } );

    socket.on( "chat message", function( msg ) {
        io.emit( "chat message", username + ": " +msg );
    } );

    socket.on( "disconnect", function() {
        socket.broadcast.emit( "user logout", getName() );
    } );

    function newMessage( msg ) {
        console.log( username + " --> " + msg );
    }

    function getName() {
        return username;
    }

    function setName( name ) {
        username = name;
    }

});

http.listen( port, function() {
    console.log( "Listening on : " + port );
} );