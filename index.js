/**
 * Created by djackson on 15/09/15.
 */

var VPlayer = (function(){
//	function areaOfSquare(w,h) {
//		return w*h;
//	}
//
//	function areaOfTriangle(b,h){
//		return b*h*0.5;
//	}
//
//	function attachTriClick(elemId){
//		document.getElementById(elemId).addEventListener('click', function(){
//			this.innerHTML = VPlayer.area_triangle(5,10);
//		})
//	}
//
//
//
//	return {
//		area_sqare: areaOfSquare,
//		area_triangle: areaOfTriangle,
//		attach: attachTriClick
//	};





	function init(){
		alert('VPlayer: init');
	}


	return {
		init: init

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