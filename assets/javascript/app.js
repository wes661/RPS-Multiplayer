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
      $(".p1selectRock").show('slow');
      $(".p1selectPaper").show('slow');
      $(".p1selectScissor").show('slow');
      $("#p1name-display").text(playerOneName);
      $("#p1Stats").html("Win: " + playerOne.wins + " Losses: " + playerOne.losses + " Ties: " + playerOne.ties);
    };

    if(snapshot.child("playerTwo").exists()) {
      console.log('player two exists');

      playerTwo = snapshot.val().playerTwo;
      playerTwoName = playerTwo.name;
      $(".p2selectRock").show('slow');
      $(".p2selectPaper").show('slow');
      $(".p2selectScissor").show('slow');
      $("#p2name-display").text(playerTwoName);
      $("#p2Stats").html("Win: " + playerTwo.wins + " Losses: " + playerTwo.losses + " Ties: " + playerTwo.ties);
      $("#p1Stats").html("Win: " + playerOne.wins + " Losses: " + playerOne.losses + " Ties: " + playerOne.ties);
    };

    if( (playerOne !== null) && (playerTwo !== null) ){
    $('#infoText').html("Waiting for " + playerOneName + " to select");
    };
    

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  

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
            choice: ""
          };
            $('.player-input').fadeOut('slow');
            $('#add-player').fadeOut('slow');
            $('#p1Stats').show('slow');
            database.ref('players/playerOne').set(playerOne);
            database.ref('players/playerOne').onDisconnect().remove();
        } else if( (playerOne !== null) && (playerTwo === null) ){
          console.log('Adding Player 2');

          userplayerName = $("#user-name").val().trim();

            playerTwo = {
              name: userplayerName,
              wins: 0,
              losses: 0,
              ties: 0,
              choice: ""
            };
              $('.player-input').fadeOut('slow');
              $('#add-player').fadeOut('slow');
              $('#p2Stats').show('slow');
              database.ref('players/playerTwo').set(playerTwo);
              database.ref('players/playerTwo').onDisconnect().remove();
        }
      }        

    });

