var socket = io();

            var nickname = null;

            window.onload = function() {
                openNav();



                while ( nickname == null ) {
                    nickname = prompt( "What is your nickname?", "" );
                }

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