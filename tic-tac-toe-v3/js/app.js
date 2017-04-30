(function(){
'use strict'

	var start_game = "<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><a href='#' class='button'>Play Game</a><br></header></div>";
	var end_game = "<div class='screen screen-win' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'></p><a href='#' class='button'>New game</a></header></div>";

  // set the players
	var player1 = '#player1';
	var player2 = '#player2';

  // player win the combinations
	var winner_game = "";

  // Append the screen start
  $('body').append(start_game);
	$('body').append(end_game);
	$('#start, #finish').hide();
	$('#start').show();

  // function to start the game
	var play_the_game = function() {

    // check each box
		$('.box').each(function(){

    	$(this).mouseenter(function(){

          // add the background image on hover
  				if ( $(player1).hasClass("active")) {

              $(this).css('background-image', 'url(img/o.svg)');

          }else {

          	   $( this ).css('background-image', 'url(img/x.svg)');
          }
      });

			$(this).mouseleave(function(){
        // On mouseleave, remove the background image
				$(this).css('background-image', 'none');

			});

		}); // .box end for each loop

    // check if the box is taken
    // If not, fills selected box while switching the active player
    // Check for winner combination.
    $('.box').click(function(){

  			if ($(player1).hasClass("active")) {

  				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {

  					$(this).addClass('box-filled-1');
            $(this).css('background-image', 'url(img/o.svg)');
            $(this).unbind('mouseenter mouseleave');

            // initiate the function
  					game_status();
  					player_move();
  				}
  			}else if ($('#player2').hasClass("active")) {
  				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
            //
  					$(this).addClass('box-filled-2');
            $(this).css('background-image', 'url(img/x.svg)');
  					$(this).unbind('mouseenter mouseleave');

            // initiate the function
  					game_status();
  					player_move();

  				}
  			}
    });

  };

  // function for next player's turn
	var player_move = function() {

		if ( $(player1).hasClass('active') ) {

			$(player1).removeClass("active");
			$(player2).addClass("active");

    }else {

    	$(player2).removeClass("active");
			$(player1).addClass("active");
    }

  };

  // Check the players result, if win or a tie
  // Store to an empty arrary game result
	var game_status = function() {
		var game_winner = [];

		//check eacn boxes and add currently placed piece
		$('.box').each(function(){

  			if ($(this).hasClass('box-filled-1')) {
  				game_winner.push("player1");

  			} else if ($(this).hasClass('box-filled-2')) {
          game_winner.push("player2");

  			} else {
          game_winner.push("empty");

        }
    });

   // Compares squares and players to see if someone has won or it's a draw.
		if (game_winner[0] !== "empty" && game_winner[0] === game_winner[1] && game_winner[1] === game_winner[2]){
			winner_game = game_winner[0];
			player_winner_game();

		} else if (game_winner[3] !== "empty" && game_winner[3] === game_winner[4] && game_winner[4] === game_winner[5]) {

			winner_game = game_winner[3];
			player_winner_game();

    } else if (game_winner[6] !== "empty" && game_winner[6] === game_winner[7] && game_winner[7] === game_winner[8]) {
			winner_game = game_winner[6];
			player_winner_game();

    } else if (game_winner[0] !== "empty" && game_winner[0] === game_winner[3] && game_winner[3] === game_winner[6]) {
			winner_game = game_winner[0];
			player_winner_game();

    } else if (game_winner[1] !== "empty" && game_winner[1] === game_winner[4] && game_winner[4] === game_winner[7]) {
			winner_game = game_winner[1];
			player_winner_game();

    } else if (game_winner[2] !== "empty" && game_winner[2] === game_winner[5] && game_winner[5] === game_winner[8]) {
			winner_game = game_winner[2];
			player_winner_game();

    } else if (game_winner[0] !== "empty" && game_winner[0] === game_winner[4] && game_winner[4] === game_winner[8]) {
			winner_game = game_winner[0];
			player_winner_game();

    } else if (game_winner[2] !== "empty" && game_winner[2] === game_winner[4] && game_winner[4] === game_winner[6]) {
			winner_game = game_winner[2];
			player_winner_game();

    } else if (game_winner.includes("empty") === false){

      // no winner, declare tie game
			winner_game = "Tie Game";

      //initiate the function
			player_winner_game();

		}

	}; //game_status

	// display  game result for the player winner or tie result
	var player_winner_game = function() {

		if (winner_game === "player1") {
			$("#finish").removeClass("screen-win-two");
			$("#finish").removeClass("screen-win-tie");

      // add message
			$(".message").html("Player 1 wins!");
			$("#finish").addClass("screen-win-one");
			$("#finish").show();
			$("#board").hide();

    } else if (winner_game === "player2") {

			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-tie");

      // add message
			$(".message").html("Player 2 wins!");
			$("#finish").addClass("screen-win-two");
			$("#finish").show();
			$("#board").hide();

		} else if (winner_game === "Tie Game") {

			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-two");

      // add message
			$(".message").html("It's a Tie!");
			$("#finish").addClass("screen-win-tie");
			$("#finish").show();
			$("#board").hide();

		}
	}; //player_winner_game

  // load  starting screen
	$('.button').on('click', function(){

  		$('#start').hide();
  		$('#finish').hide();
  		$('#board').show();

  		$(".box").each(function () {

  			$(this).css('background-image', 'none');
  			$(this).removeClass("box-filled-1");
  			$(this).removeClass("box-filled-2");

      });

  		// remove active classes
  		$('li .players').removeClass('active');

  		// randomly assign
  		var li = $("ul li");
  		var rand = Math.floor(Math.random() * 2);

      li.eq(rand % li.length).addClass("active");

      //Initiate the start game function
  		play_the_game();

  });


}());
