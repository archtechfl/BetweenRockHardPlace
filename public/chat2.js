window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    
    var userID = '';
    
    var leapValue = '';
    
    var quit = false;
    
    //graphic screens/splash
    var loseScreen=document.createElement('img');
    loseScreen.src="splash-03.png";
    loseScreen.setAttribute("id", "loss");
    
    var winScreen=document.createElement('img');
    winScreen.src="splash-02.png";
    winScreen.setAttribute("id","win");

    var tieScreen = document.createElement('img');
    tieScreen.src="splash-04.png";
    tieScreen.setAttribute("id","tie");
    
    
    function splashScreen() {
    	
    	var splashScreen = document.createElement ('img');
    	splashScreen.className = "splash";
    	splashScreen.setAttribute("id", "splashOne");
    	splashScreen.src = "splash-01.png";
    	document.body.appendChild(splashScreen);
    	
    	splashScreen.addEventListener("click", throwPrepare, false);
    	
    }
    
    splashScreen();
    
    function throwPrepare(event){
    	
    	var splashImage = document.getElementById("splashOne");
    	splashImage.parentNode.removeChild(splashImage);
    	
    	var throwMessage = document.getElementById("throw");
    	throwMessage.innerHTML = "Prepare to throw";
    	setTimeout(throwIT, 4000);
    }
    
    //throwPrepare();
    
//start leap

function throwIT(){
	
var throwMessage = document.getElementById("throw");
throwMessage.innerHTML = "Throw!";	
	
setTimeout(transmit, 1650);
    
var frame;
    
//new leap motion controller
var controller = new Leap.Controller({ enableGestures: true });
	
	//Leap collecting loop

    	controller.on( 'frame' , function( data )
    	
    	{
    		
    		if (quit){
    			return;
    		}
      
      		//Capture data
      		frame = data;
	  
	  		//Cycle through coordinates of finger tip
	  		for(var index = 0; index < frame.pointables.length; index++)
	  		
	  		{
	 
				var pointable = frame.pointables[index];
				
				//Conver tip position to cube position
				xPos = pointable.tipPosition[0];
					
				console.log(frame.hands);
				//console.log(xPos);
				
				/////////////////
				var hand1 = document.getElementById("hand1");
				
						
				if (frame.fingers.length == 2) {
					console.log("scissors");
					hand1.className="scissors";
					leapValue = 'scissors';
							
				} else if (frame.fingers.length > 3) {
					console.log("paper");
					hand1.className="paper";
					leapValue = 'paper';
				
				} else if (frame.fingers.length == 1 || frame.fingers.length == 0) {
					console.log("rock");
					hand1.className="rock";
					leapValue = 'rock';
				
				} else {
					console.log("no valid gesture")
				}	
				
				/////////////////

			  }//end of for loop

    });//end of controller

    controller.connect();

//end leap controller
 
    socket.on('message', function (data) {
        if(data.message) 
        	{
            messages.push(data.message);
        	}
    	});
    	
}//end of throw
    	
    function transmit() {
        //var leapValue = field.value;
        sessionCompare[userID] = leapValue;
        socket.emit('send', { message: leapValue });
        
        console.log("Messages: " + messages);
        
        console.log(sessionCompare);
        
	setTimeout (compare, 2000);
	
	quit = true;
        
    };
    
    function compare() {
    
    var display = document.getElementById("hand1");
    display.parentNode.removeChild(display);
    
    //********************************CREATE ELEMENTS FOR DOM ****************************
    	        var player1View = document.createElement("div");
                player1View.setAttribute("id","1");
                var name1 = document.createTextNode("PLAYER 1");
                player1View.appendChild(name1);
                document.body.appendChild(player1View);

                var player2View = document.createElement("div");
                player2View.setAttribute("id","2");
                var name2 = document.createTextNode("PLAYER 2");
                player2View.appendChild(name2);
                document.body.appendChild(player2View);
                //End Div add DOM
                
    //************************************************************************************
    	
    		var result1 = messages[0];
        	var result2 = messages[1];
        	console.log(messages);
                console.log ("Result one: " + result1 + " result 2: " + result2);
                
                var displayResult = document.getElementById("throw");
                
                //***************serve images for states*************
		    if (result1 =='scissors' && result2 =='scissors'){
		        player1View.className='scissors';
		        player2View.className='scissors';
		        displayResult.innerHTML = 'Tie!';
		        document.body.appendChild(tieScreen);
		    }
		    else if (result1 =='rock' && result2 =='rock'){
		        player1View.className='rock';
		        player2View.className='rock';
		        displayResult.innerHTML = 'Tie!';
		        document.body.appendChild(tieScreen);
		    }
		    else if (result1 =='paper' && result2 =='paper'){
		        player1View.className='paper';
		        player2View.className='paper';
		        displayResult.innerHTML = 'Tie!';
		        document.body.appendChild(tieScreen);
		    } 
		    else if (result1 =='paper' && result2 =='scissors'){
		        player1View.className='paper';
		        player2View.className='scissors';
		        displayResult.innerHTML = 'Player 2 wins!';
		        document.getElementById('2').appendChild(winScreen);
		        document.getElementById('1').appendChild(loseScreen);
		    }
		    else if (result1 =='paper' && result2 =='rock'){
		        player1View.className='paper';
		        player2View.className='rock';
		        displayResult.innerHTML = 'Player 1 wins!';
		        document.getElementById('1').appendChild(winScreen);
		        document.getElementById('2').appendChild(loseScreen);
		    }
		    else if (result1 =='rock' && result2 =='paper'){
		        player1View.className='rock';
		        player2View.className='paper';
		        displayResult.innerHTML = 'Player 2 wins!';
		        document.getElementById('2').appendChild(winScreen);
		        document.getElementById('1').appendChild(loseScreen);
		    }
		    else if (result1 =='rock' && result2 =='scissors'){
		        player1View.className='rock';
		        player2View.className='scissors';
		        displayResult.innerHTML = 'Player 1 wins!';
		        document.getElementById('1').appendChild(winScreen);
		        document.getElementById('2').appendChild(loseScreen);
		    }
		    else if (result1 =='scissors' && result2 =='rock'){
		        player1View.className='scissors';
		        player2View.className='rock';
		        displayResult.innerHTML = 'Player 2 wins!';
		        document.getElementById('2').appendChild(winScreen);
		        document.getElementById('1').appendChild(loseScreen);
		    }
		    else if (result1 =='scissors' && result2 =='paper'){
		        player1View.className='scissors';
		        player2View.className='paper';
		        displayResult.innerHTML = 'Player 1 Wins!';
		        document.getElementById('1').appendChild(winScreen);
		        document.getElementById('2').appendChild(loseScreen);
		    } else {
		    	console.log("Error");
		    }

                //*************end serve images
                
                
                /*
                if (result1 == 'scissors' && result2 == 'rock'){
                	console.log("Player 2 wins! Rock beats scissors");
                } else if (result1 == 'scissors' && result2 == 'paper'){
                	console.log("Player 1 wins! Scissors beats paper");
                } else if (result1 == 'scissors' && result2 == 'scissors'){
                	console.log("Tie!");
                } else if (result1 == 'paper' && result2 == 'scissors'){
                	console.log("Player 2: scissors wins!");
                } else if (result1 == 'paper' && result2 == 'rock'){
                	console.log("Player 1: paper wins!");
                } else if (result1 == 'paper' && result2 == 'paper'){
                	console.log("Tie!");
                } else if (result1 == 'rock' && result2 == 'paper'){
                	console.log("Player 2: paper wins!");
                } else if (result1 == 'rock' && result2 == 'scissors'){
                	console.log("player 1: rock wins!");
                } else if (result1 == 'rock' && result2 == 'rock'){
                	console.log("Tie!");
                } else {
                	console.log("error");
                }
                */
                
                
    	
    	
    }
    
    //Creating users and storing info
    var sessionCompare = {};//holder
    
    socket.on('connect', function () 
    	{
    	
    		userID = this.socket.sessionid;
    		sessionCompare[userID] = '';
    		//console.log(this.socket.sessionid);
    		
    		console.log(sessionCompare);
    
    	});
    
}
