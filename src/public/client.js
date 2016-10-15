var socket = io();

var nickname = null;

window.onload = function() {
    openNav();

    nickname = getName();

    socket.emit( "user nickname", nickname );
    $( "#username" ).text( "Hello " + nickname );
};


$( "form" ).submit( function() {
    socket.emit( "chat message", $( "#messageForm" ).val() );
    $( "#messageForm" ).val( "" );

    return false;
} );

socket.on( "user nickname", function( nickname ) {
    $( "#messages" ).append( $( "<li>" ).css( "font-weight", "700" ).text( nickname + " joined us" )  );
} );

socket.on( "chat message", function( msg ) {
    $( "#messages" ).append( $( "<li>" ).text( msg )  );
    var audio = new Audio( "assets/sounds/message.mp3" );
    audio.play();
} );

socket.on( "user logout", function( nickname ) {
    $( "#messages" ).append( $( "<li>" ).css( "font-weight", "700" ).text( nickname + " left us" )  );
} );


/*
Gets userName

@return string - user name
*/
function getName() {
    var userName = null;

    while ( userName === null || isEmptyString( userName )) {
        userName = prompt( "What is your nickname?", "" );
    }

    return userName.toString();
}


/*
Checks a string for an empty value

@param ? str
@return boolean
*/
function isEmptyString( str ) {
    return str === "" ? true  : false ;
}