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
  var turn = 1;
  

  database.ref('players').on("value", function(snapshot){

    if(snapshot.child("playerOne").exists()) {
      console.log('player one exists');

      playerOne = snapshot.val().playerOne;
      playerOneName = playerOne.name;
      //$(".p1Select").show('slow');
      $("#p1name-display").text(playerOneName);
      $("#p1Stats").html("Win: " + playerOne.wins + "<br>" + " Losses: " + playerOne.losses + "<br>" + " Ties: " + playerOne.ties);
    };

    if(snapshot.child("playerTwo").exists()) {
      console.log('player two exists');

      playerTwo = snapshot.val().playerTwo;
      playerTwoName = playerTwo.name;
      //$(".p2Select").show('slow');
      $("#p2name-display").text(playerTwoName);
      $("#p2Stats").html("Win: " + playerTwo.wins + "<br>" + " Losses: " + playerTwo.losses + "<br>" + " Ties: " + playerTwo.ties);
    };

    if (playerOne.choice !== "" && playerTwo.choice !== "") {

      if ((playerOne.choice === "rock") && (playerTwo.choice === "scissor")) {
        alert('player one wins');
        alert('player two loses');
      } else if ((playerOne.choice === "rock") && (playerTwo.choice === "paper")) {
        alert('player one loses');
        alert('player two wins');
      } else if ((playerOne.choice === "scissor") && (playerTwo.choice === "rock")) {
        alert('player one loses');
        alert('player two wins');
      } else if ((playerOne.choice === "scissor") && (playerTwo.choice === "paper")) {
        alert('player one wins');
        alert('player two loses');
      } else if ((playerOne.choice === "paper") && (playerTwo.choice === "rock")) {
        alert('player one wins');
        alert('player two loses');
      } else if ((playerOne.choice === "paper") && (playerTwo.choice === "scissor")) {
        alert('player one loses');
        alert('player two wins');
      } else if (playerOne.choice === playerTwo.choice) {
        alert('tie game')
      }
       database.ref('players/playerOne').update({'choice': ""});
       database.ref('players/playerTwo').update({'choice': ""});
       $(".p1Select").show('slow');
       $(".p2Select").show('slow');
    }

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
            choice: ""
          };
            $('.player-input').fadeOut('slow');
            $('#add-player').fadeOut('slow');
            $(".p1Select").show('slow');
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
              $(".p2Select").show('slow');
              $('#p2Stats').show('slow');
              //database.ref('players/playerOne').update({'turn':turn});
              database.ref('players/playerTwo').set(playerTwo);
              database.ref('turn').onDisconnect().remove();
              database.ref('players/playerTwo').onDisconnect().remove();
        }
      }        
    });
  $('.p1Select').on('click', function(){
    if(playerOneName === userplayerName && playerTwo !== null){
      alert($(this).data('choice'))
      $(".p1Select").hide('slow');
      database.ref('players/playerOne').update({'choice':$(this).data('choice')});
    }
  });
  $('.p2Select').on('click', function(){
    if(playerTwoName === userplayerName && playerOne !== null){
      alert($(this).data('choice'))
      $(".p2Select").hide('slow');
      database.ref('players/playerTwo').update({'choice':$(this).data('choice')});
    }
  });

  function playAgain(){
    database.ref('players/playerOne').update({'choice': ""});
    database.ref('players/playerTwo').update({'choice': ""});
  }  
//------------------------------------------------------------------------------
