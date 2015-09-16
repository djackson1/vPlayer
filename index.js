/**
 * Created by djackson on 15/09/15.
 *
 * An NPM module for creating an easy to use and implement web video player modal for desktops and tablets (and fullscreen functionality for mobiles)
 */

var VPlayer = (function(){
	var vPlayer_overlay;
	var vPlayer_modal;
	var vPlayer_close_btn, vPlayer_close_btn_width_half, vPlayer_close_btn_height_half;
	var vPlayer_video, vPlayer_video_ratio;
	var vPlayer_video_mobile;

	var vPlayer_first_open;
	var vPlayer_is_video_loaded;

	var vPlayer_initialModalSize;

	function detectMobile(){
		var user_agent = navigator.userAgent.toLowerCase();

		var mobile = true;
		var device = 'desktop';

		if( user_agent.match(/iPad/i)){
			if( user_agent.match(/7./)){
				device = 'iPad 7.0';
			}else{
				device = 'iPad';
			}
			mobile = false; //tablet
		}else if( user_agent.match(/iPhone/i)){
			device = 'iPhone';
		}else if( user_agent.match(/android/)){
			device = 'android';
		}else if( user_agent.match(/Windows Phone|IEMobile|Windows CE|Windows Mobile/i)){
			device = 'windows phone';
		}else{
			mobile = false; //desktop
		}

		window.is_mobile = mobile;
		window.device_type = device;

		return mobile;
	}


	function launchVideoPlayer(e){
		e.preventDefault(); //Stop the anchor from moving around the page
		document.getElementsByTagName('body')[0].style.overflow = 'hidden'; //Stop the body from scrolling

		if( !window.is_mobile ){
			//DESKTOP or TABLETS
			if( !vPlayer_is_video_loaded ){
				var debug_ratio = 1.77777;
				var loading_gif_width = 400;

				resizeModal( {width: loading_gif_width, height: loading_gif_width / debug_ratio} );

				if( vPlayer_first_open == false ){
					var source = document.getElementById('vplayer-video-mobile').getElementsByTagName('source')[0];
					vPlayer_video.appendChild(source);
					vPlayer_first_open = true;
				}
			}
			vPlayer_overlay.style.display = 'block';
			vPlayer_modal.style.display = 'block';

			vPlayer_video.play();
		}else{
			//MOBILE
			vPlayer_video_mobile.play();

			if (vPlayer_video_mobile.requestFullscreen)
				vPlayer_video_mobile.requestFullscreen();
			else if (vPlayer_video_mobile.webkitRequestFullscreen)
				vPlayer_video_mobile.webkitRequestFullscreen();
			else if (vPlayer_video_mobile.mozRequestFullScreen)
				vPlayer_video_mobile.mozRequestFullScreen();
			else if (vPlayer_video_mobile.msRequestFullscreen)
				vPlayer_video_mobile.msRequestFullscreen();
		}
	}

	function calculateDimensions(){
		var horizontal_padding = 45;
		var vertical_padding = 50;

		//var video_ratio = vPlayer_video.videoWidth / vPlayer_video.videoHeight;
		var window_ratio = window.innerWidth / window.innerHeight;

		var size = {};

		if( vPlayer_video_ratio > window_ratio ){
			size.width = window.innerWidth - (horizontal_padding * 2);
			size.height = size.width / vPlayer_video_ratio;
		}else{
			size.height = window.innerHeight - (vertical_padding * 2);
			size.width = size.height * vPlayer_video_ratio;
		}

		return size;
	}

	function loadedMetaData(){
		vPlayer_video_ratio = vPlayer_video.videoWidth / vPlayer_video.videoHeight;

		fitModalToScreen();

		vPlayer_is_video_loaded = true;
	}

	function fitModalToScreen(){
//		var dimensions = calculateDimensions();
		resizeModal( calculateDimensions() );
	}

	function closeVideoModal(){
		document.getElementsByTagName('body')[0].style.overflow = 'scroll';

		vPlayer_overlay.style.display = 'none';
		vPlayer_modal.style.display = 'none';

		vPlayer_video.pause();
		vPlayer_video.currentTime = 0;
	}

	function exitFullscreenMobile(){
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullScreen;

		if( !state ){
			vPlayer_video_mobile.pause();
			vPlayer_video_mobile.currentTime = 0;
		}
	}

	function resizeModal(dimensions){
		var w = parseInt(dimensions.width);
		var h = parseInt(dimensions.height);

		var x = (window.innerWidth - w)/2;
		var y = (window.innerHeight - h)/2;

		vPlayer_modal.style.width = w + 'px';
		vPlayer_modal.style.height = h + 'px';
		vPlayer_modal.style.left = x + 'px';
		vPlayer_modal.style.top = y + 'px';

		vPlayer_close_btn.style.left = w - vPlayer_close_btn_width_half + 'px';
		vPlayer_close_btn.style.top = '-' + vPlayer_close_btn_height_half + 'px';

		vPlayer_video.width = w + 'px';
		vPlayer_video.height = h + 'px';
	}



	function setup(){
		// Setup hooks to fire events when the a tag is pressed
		var vplayer_hooks = document.querySelectorAll('a.vplayer-popup');

		if( vplayer_hooks.length > 0 ){
			for( var i = 0; i < vplayer_hooks.length; i++ ){
				vplayer_hooks[i].addEventListener( 'click' , launchVideoPlayer, false);
			}


			if( detectMobile() ){
				vPlayer_video_mobile = document.getElementById('vplayer-video-mobile');

				var listeners = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'webkitendfullscreen'];

				for(listener in listeners ){
					vPlayer_video_mobile.addEventListener( listeners[listener], function(e){
						// chrome safari firefox IE ios end fullscreen
						exitFullscreenMobile();
					});
				}


			}else{
				vPlayer_overlay = document.getElementById('vplayer-overlay');
				vPlayer_modal = document.getElementById('vplayer-modal');
				vPlayer_close_btn = document.getElementById('vplayer-close-btn');
				vPlayer_video = document.getElementById('vplayer-video');

				var vPlayer_close_btn_img = vPlayer_close_btn.getElementsByTagName('img')[0];

				vPlayer_close_btn_width_half = vPlayer_close_btn_img.naturalWidth / 2;
				vPlayer_close_btn_height_half = vPlayer_close_btn_img.naturalHeight / 2;


				vPlayer_video.addEventListener( 'loadedmetadata', function(){
					loadedMetaData();
				}, false);

				var closing_modal_elements = [vPlayer_close_btn, vPlayer_overlay];
				for( close_element in [vPlayer_close_btn, vPlayer_overlay] ){
					closing_modal_elements[close_element].addEventListener( 'click', function(){
						closeVideoModal();
					});
				}

				window.addEventListener( 'resize', function(){
					fitModalToScreen();
				});

			}

			vPlayer_first_open = false;
			vPlayer_is_video_loaded = false;

			vPlayer_initialModalSize = -1;
		}
	}

	return {
		setup: setup
	};
}).call(this);