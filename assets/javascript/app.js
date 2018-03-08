var config = {
    apiKey: "AIzaSyC85Anrjx9UxRoRB8Mi6RQaKhqdlS76DWE",
    authDomain: "rps-multiplayer-6a9da.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-6a9da.firebaseio.com",
    projectId: "rps-multiplayer-6a9da",
    storageBucket: "rps-multiplayer-6a9da.appspot.com",
    messagingSenderId: "954222611936"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
//Global variables for game

  var playerOne = null;
  var playerTwo = null;
  var playerOneName = "";
  var playerTwonName = "";
  var userplayerName = "";
  var turn = false;
  var playerOneWins = 0;
  var playerOneLosses = 0;
  var playerTwoWins = 0;
  var playerTwoLosses = 0;
  var playerTies = 0;
  var playerOneSelect;
  var playerTwoSelect; 
  var playerOneDone = false;
  var playerTwoDone = false;

  database.ref('players').on("value", function(snapshot){

    if(snapshot.child("playerOne").exists()) {
      console.log('player one exists');

      playerOne = snapshot.val().playerOne;
      playerOneName = playerOne.name;
      $("#p1name-display").text(playerOneName);
      $("#p1Stats").html("Win: " + playerOne.wins + "<br>" + " Losses: " + playerOne.losses + "<br>" + " Ties: " + playerOne.ties);
    };

    if(snapshot.child("playerTwo").exists()) {
      console.log('player two exists');

      playerTwo = snapshot.val().playerTwo;
      playerTwoName = playerTwo.name;
      $(".Rock").show('slow');
      $(".Paper").show('slow');
      $(".Scissor").show('slow');
      $("#p2name-display").text(playerTwoName);
      $("#p2Stats").html("Win: " + playerTwo.wins + "<br>" + " Losses: " + playerTwo.losses + "<br>" + " Ties: " + playerTwo.ties);
    };

    if( (playerOne !== null) && (playerTwo !== null) ){

    };
    

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  
//Adding player one and player two and setting to database----------------------
  $("#add-player").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      

      if(($('#user-name').val().trim() !== "") && !(playerOne && playerTwo) ) {

        if(playerOne === null) {
          console.log('adding player one');
   
          userplayerName = $("#user-name").val().trim();

          playerOne = {
            name: userplayerName,
            wins: 0,
            losses: 0,
            ties: 0,
            choice: "",
            turn: false
          };
            $('.player-input').fadeOut('slow');
            $('#add-player').fadeOut('slow');
            $('#p1Stats').show('slow');
            database.ref('players/playerOne').set(playerOne);
            database.ref('players/playerOne').onDisconnect().remove();
        } else if( (playerOne !== null) && (playerTwo === null) ){
          console.log('Adding Player 2');

          turn = true;

          userplayerName = $("#user-name").val().trim();

            playerTwo = {
              name: userplayerName,
              wins: 0,
              losses: 0,
              ties: 0,
              choice: "",
              turn: false
            };
              $('.player-input').fadeOut('slow');
              $('#add-player').fadeOut('slow');
              $('#p2Stats').show('slow');
              database.ref('players/playerOne').update({'turn':turn});
              database.ref('players/playerTwo').set(playerTwo);
              database.ref('turn').onDisconnect().remove();
              database.ref('players/playerTwo').onDisconnect().remove();
        }
      }        
    });
  $('.pSelect').on('click', function(){
    if(playerOne.turn === true && playerOneName === userplayerName){
      alert($(this).data('choice'))
      database.ref('players/playerOne').update({'choice':$(this).data('choice')});
      $(".Rock").hide('slow');
      $(".Paper").hide('slow');
      $(".Scissor").hide('slow');
    }
  });
//------------------------------------------------------------------------------
