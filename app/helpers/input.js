// A simple global input manager class to manage game controls.
// Keeps a map of all keys that are currently pressed so it
// can be queried to check a game control without individual
// assets having to listen to DOM events.
// 
// Example:
// 
// 	if(Input.up()){
//		// move somewhere...
// 	}
(function(){
	
	// Listen to keydown and keyup events to keep a map of all
	// currently pressed keys
	var _keys = {};
	document.addEventListener('keydown', function(e){
		// console.log(e.keyCode);
		_keys[e.keyCode] = true;
	});
	
	//NOTE: There is a problem here, it's possible for a key to be pressed
	// and released between two frames meaning that the keypress would not
	// be registered.
	document.addEventListener('keyup', function(e){
		// console.log(e.keyCode);
		delete _keys[e.keyCode];
	});
	
	var _mouseX = 0;
	var _mouseY = 0;
	document.addEventListener('mousemove', function(e){
		//TODO: Get the mouse position
		// var rect = game.canvas.getBoundingClientRect();
		_mouseX = e.clientX;// - rect.left;
		_mouseY = e.clientY;// - rect.top;
	});
	
	// Check if a control is currently down or not
	_isDown = function(keys){
		for(var i=0; i<keys.length; ++i){
			if(_keys[keys[i]] == true){
				return true;
			}
		}
		return false;
	}
	
	window.Input = {
		
		// w, up arrow
		up: function(){
			return _isDown([38, 87]);
		},
		
		// d, right arrow
		right: function(){
			return _isDown([39, 68]);
		},
		
		// s, down arrow
		down: function(){
			return _isDown([40, 83]);
		},
		
		// a, left arrow
		left: function(){
			return _isDown([37, 65]);
		},
		
		// space bar
		fire: function(){
			return _isDown([32]);
		},
		
		// enter
		restart: function(){
			return _isDown([13]);
		},
		
		mouse: function(){
			return {x: _mouseX, y: _mouseY};
		}
	};
})();
