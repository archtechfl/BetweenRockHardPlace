window.onload = function()

{

var frame;

var fieldLeap = document.getElementById("field");
    
//new leap motion controller
var controller = new Leap.Controller({ enableGestures: true });
	
	//render cube, 48 frames per second
	
	//setInterval(render, (1000/48));
	
	//Leap collecting loop

    	controller.on( 'frame' , function( data ){
      
      		//Capture data
      		frame = data;
	  
	  	//Cycle through coordinates of finger tip
	  	for(var index = 0; index < frame.pointables.length; index++){
	 
			var pointable = frame.pointables[index];
			
			//Conver tip position to cube position
			xPos = pointable.tipPosition[0];
			
			console.log(xPos);
			
			fieldLeap.value = frame;

		  }

    });

    controller.connect();
    
}
