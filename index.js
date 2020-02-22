var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickPattern=[];
var started=false;
var level=0;


$(document).keypress(function(){
	if (!started){
    	$("#level-title").text("Level "+level);
		nextSequence();
		started=true;
	}
});

$(".btn").click(function(){
	var userChosenColor=$(this).attr("id");
	userClickPattern.push(userChosenColor);
	new Audio("sounds/"+userChosenColor+".mp3").play();
	animatePress(userChosenColor);
	checkAnswer(userClickPattern.length-1);
});



function checkAnswer(currentLevel){
	if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
         if(userClickPattern.length===gamePattern.length){
		 	setTimeout(function(){
		 	nextSequence();
		 	}, 1000);
		}
	}

	else{
		new Audio("sounds/wrong.mp3").play();
		$("body").addClass('game-over');
		$("#level-title").text("Game Over, Press any key to restart");
		setTimeout(function(){
		$("body").removeClass('game-over');
		}, 200);
		
		startOver();	
	}
    
}


function nextSequence(){
	userClickPattern=[];
	level++;
	$("#level-title").text("Level "+level);
	var randomNumber=Math.floor(Math.random()*4);
	var randomChosenColor=buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	new Audio("sounds/"+randomChosenColor+".mp3").play();
}

function animatePress(currentColor){
	$("#"+currentColor).addClass('pressed');
	setTimeout(function(){
		$("#"+currentColor).removeClass('pressed');}, 100);
		
}

function startOver(){
	level=0;
	gamePattern=[];
	started=false;
}