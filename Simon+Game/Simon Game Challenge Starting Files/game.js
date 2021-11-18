var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextsequence() {
   userClickedPattern= [];
   level++;
   $("#level-title").text("Level "+ level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
   
}
$(".btn").click(function () {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
   var audio = new Audio("sounds/" + name + "." + "mp3");
   audio.play();
}

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");
   setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
   }, 100);
}

$(document).keydown(function () {
   if (!started) {
      $("#level-title").text("Level " + level);


      nextsequence();
      started = true;
   }
});
function checkAnswer(currentlevel){
   if(userClickedPattern[currentlevel]=== gamePattern[currentlevel]){
      console.log("Success");
      if(userClickedPattern.length===gamePattern.length){
         setTimeout(function(){
         nextsequence();   
         },1000);
      }
   }
   else {
      console.log("Wrong");
      playSound("wrong");
      $("body").addClass(".game-over");
      setTimeout(function(){
         $("body").removeClass(".game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startover();
   }
}
function startover(){
   level=0;
   started=false;
   gamePattern=[];
}