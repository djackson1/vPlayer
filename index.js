/**
 * Created by djackson on 15/09/15.
 */

var VPlayer = (function(){
	var AreaOfSquare = function areaOfSquare(w,h) {
		return w*h;
	}

	var AreaOfTriangle = function areaOfTriangle(b,h){
		return b*h*0.5;
	}



	return {
		area_sqare: AreaOfSquare,
		area_triangle: AreaOfTriangle
	};




}).call(this);




document.getElementById('test-div').addEventListener('click', function(){
	this.innerHTML = VPlayer.area(3,9);
})





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