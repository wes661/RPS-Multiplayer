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
  var playerOneWins = 0;
  var playerOneLosses = 0;
  var playerTwoWins = 0;
  var playerTwoLosses = 0;
  var playerTies = 0;
  var playerOneSelect;
  var playerTwoSelect; 
  var playerOneDone = false;
  var playerTwoDone = false;

  //#player-button and #player-name are not added, going to make form for these in the html

  $("#add-player").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      playerOneName = $("#user-name").val().trim();
      

      database.ref('players').set({
        playerOneName: playerOneName,
        playerOne: true
       
      });

    });

  database.ref('players').on("value", function(snapshot){

    $("#p1name-display").html(snapshot.val().playerOneName);

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });