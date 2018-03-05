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

  var playerOne = false;
  var playerTwo = false;
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
      $("#selectRock").show('slow');
      $("#selectPaper").show('slow');
      $("#selectScissor").show('slow');
    }

    $("#p1name-display").text(playerOneName);
    $("#p1Stats").html("Win: " + playerOne.wins + " Losses: " + playerOne.losses + " Ties: " + playerOne.ties);
    

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  

  $("#add-player").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      

      if(($('#user-name').val().trim() !== "") && !(playerOne && playerTwo) ) {

        if(playerOne === false) {
          console.log('adding player one');
        }
      }

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      userplayerName = $("#user-name").val().trim();

      playerOne = {
        name: userplayerName,
        wins: 0,
        losses: 0,
        ties: 0,
        choice: ""
      };
      

      database.ref('players/playerOne').set(playerOne);

    });
