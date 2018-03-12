//initializing firebase------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------- 
  
//Global variables for game--------------------------------------------------------------
  var playerOne = null;
  var playerTwo = null;
  var playerOneName = "";
  var playerTwonName = "";
  var userplayerName = "";
//---------------------------------------------------------------------------------------
  
//database snapshot portion to see if players are logged in and displayed----------------
  database.ref('players').on("value", function(snapshot){

    if(snapshot.child("playerOne").exists()) {
      console.log('player one exists');

      playerOne = snapshot.val().playerOne;
      playerOneName = playerOne.name;
      $("#p1name-display").fadeIn('slow').text(playerOneName);
      $("#p1Stats").fadeIn('slow').html("Wins: " + playerOne.wins + "<br>" + " Losses: " + playerOne.losses + "<br>" + " Ties: " + playerOne.ties);
    };

    if(snapshot.child("playerTwo").exists()) {
      console.log('player two exists');

      playerTwo = snapshot.val().playerTwo;
      playerTwoName = playerTwo.name;
      $("#p2name-display").text(playerTwoName);
      $("#p2Stats").html("Wins: " + playerTwo.wins + "<br>" + " Losses: " + playerTwo.losses + "<br>" + " Ties: " + playerTwo.ties);
      $("#p2name-display").fadeIn('slow');
      $("#p2Stats").fadeIn('slow');
    };

    

//---------------------------------------------------------------------------------------

//database snapshot portion checking players choice then deciding who won, lost, or tied
    if (playerOne.choice !== "" && playerTwo.choice !== "") {

      if (playerOne.choice === "rock" && playerTwo.choice === "scissor") {
        playerOne.wins++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.losses++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerOneName + " Wins!" + "<br>" + "Rock crushes scissors!");

      } else if ((playerOne.choice === "rock") && (playerTwo.choice === "paper")) {
        playerOne.losses++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.wins++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerTwoName + " Wins!" + "<br>" + "Paper covers rock!");

      } else if ((playerOne.choice === "scissor") && (playerTwo.choice === "rock")) {
        playerOne.losses++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.wins++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerTwoName + " Wins!" + "<br>" + "Rock crushes scissors!");

      } else if ((playerOne.choice === "scissor") && (playerTwo.choice === "paper")) {
        playerOne.wins++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.losses++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerOneName + " Wins!" + "<br>" + "Scissor cuts through paper!");

      } else if ((playerOne.choice === "paper") && (playerTwo.choice === "rock")) {
        playerOne.wins++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.losses++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerOneName + " Wins!" + "<br>" + "Paper covers rock!");

      } else if ((playerOne.choice === "paper") && (playerTwo.choice === "scissor")) {
        playerOne.losses++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.wins++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html(playerTwoName + " Wins!" + "<br>" + "Scissor cuts through paper!");

      } else if (playerOne.choice === playerTwo.choice) {
        playerOne.ties++;
        playerOne.choice = "";
        database.ref('players/playerOne').set(playerOne);
        playerTwo.ties++;
        playerTwo.choice = "";
        database.ref('players/playerTwo').set(playerTwo);
        $(".infoText").html("Tie Game!" + "<br>" + playerOneName + " & " + playerTwoName + " chose the same!");
      }
//---------------------------------------------------------------------------------------

       $(".infoText").fadeIn('slow');
       $(".infoText").fadeOut(4000);
       $(".p1Select").show(4000);
       $(".p2Select").show(4000);
    }

//---------------------------------------------------------------------------------------

//error handling-------------------------------------------------------------------------
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
//---------------------------------------------------------------------------------------

//snapshot for chat handling-------------------------------------------------------------
database.ref("chat/message").on("child_added", function(childSnapshot){
  $('#chatTextArea').append(childSnapshot.val().message);
  
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

  
//Adding player one and player two and setting to database-------------------------------
  $("#add-player").on("click", function() {
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
  //-------------------------------------------------------------------------------------

  //playerOne selection------------------------------------------------------------------  
  $('.p1Select').on('click', function(){
    if(playerOneName === userplayerName && playerTwo !== null){
      $(".p1Select").hide('slow');
      database.ref('players/playerOne').update({'choice':$(this).data('choice')});
    }
  });
  //-------------------------------------------------------------------------------------

  //playerTwo selection------------------------------------------------------------------
  $('.p2Select').on('click', function(){
    if(playerTwoName === userplayerName && playerOne !== null){
      $(".p2Select").hide('slow');
      database.ref('players/playerTwo').update({'choice':$(this).data('choice')});
    }
  });
//---------------------------------------------------------------------------------------

//chat box-------------------------------------------------------------------------------
var message = ""

$("#add-chat").on("click", function(event){
  event.preventDefault();
  if($('#chat-input').val() !== '' && playerOne !== null && playerTwo !== null ){
    message = "<strong>" + userplayerName + "</strong>" + ": " + $('#chat-input').val().trim() + "<br>";
    database.ref('chat/message').push({
      message: message
    });
  }  
  $('#chat-input').val('');
  database.ref('chat/message').onDisconnect().remove();
});
//---------------------------------------------------------------------------------------