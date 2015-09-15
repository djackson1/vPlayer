/**
 * Created by djackson on 15/09/15.
 */

var VPlayer = (function(){
	var AreaOfSquare = function areaOfSquare(w,h) {
		return w*h;
	}



	return {
		area: AreaOfSquare
	};

}).call(this);










//module.exports = {
//	areaOfSquare: function areaOfSquare(w,h){
//		return w*h;
//	}
//};

/**
 * NPM server side way of doing it
 * Needs to be a self executing func to be used client-side
 */

//exports.printMsg = function(){
//	console.log("This is a message from the demo package 2");
//}
//
//exports.printMsg3 = function(){
//	console.log("Msg 3");
//}


//module.exports = {
//    consoleLog: function(console_msg){
//        console.log(console_msg);
//
//        return true;
//    }
//}