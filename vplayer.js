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

	var vPlayer_initial_modal_size;
	var vPlayer_modal_padding;

	var vPlayer_ios_9;

	var multiple_videos;

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

		vPlayer_ios_9 = false
		if(device == 'iPhone' || device == 'iPad') {
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			var ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];

			if (ver[0] == "9") {
				vPlayer_ios_9 = true
			}
		}

		window.is_mobile = mobile;
		window.device_type = device;

		return mobile;
	}

	function playMobileVideo(){
		vPlayer_video_mobile.play();

		// try to request the video to be fullscreen
		if (vPlayer_video_mobile.requestFullscreen)
			vPlayer_video_mobile.requestFullscreen();
		else if (vPlayer_video_mobile.webkitRequestFullscreen)
			vPlayer_video_mobile.webkitRequestFullscreen();
		else if (vPlayer_video_mobile.mozRequestFullScreen)
			vPlayer_video_mobile.mozRequestFullScreen();
		else if (vPlayer_video_mobile.msRequestFullscreen)
			vPlayer_video_mobile.msRequestFullscreen();
	}

	function launchVideoPlayer(e){
		e.preventDefault(); //Stop the anchor from moving around the page

		if(!multiple_videos) {
			if (!vPlayer_ios_9) // ios 9 bugs out by stopping movement on the body...
				document.getElementsByTagName('body')[0].style.overflow = 'hidden'; //Stop the body from scrolling


			if (!window.is_mobile) {
				// desktop
				showModal()

				if (!vPlayer_is_video_loaded) {
					if (vPlayer_first_open == false) {
						var source = document.getElementById('vplayer-video-mobile').getElementsByTagName('source')[0];
						vPlayer_video.appendChild(source);
						vPlayer_video.load()
						vPlayer_first_open = true;
					}
				}else {
					//
					setTimeout(function(){
						fitModalToScreen()
					}, 1)
				}


			} else {
				playMobileVideo()
			}
		}else{
			var video_link = this.dataset.videoLink;

			if(video_link === undefined){
				return; //no video link
			}

			if(window.is_mobile){
				vPlayer_video_mobile.children[0].src = video_link;
				vPlayer_video_mobile.load();

				playMobileVideo()
			}else{
				//desktop

				var source = document.getElementById('vplayer-video').getElementsByTagName('source')[0];
				if(source === undefined){
					// add source tag
					var new_src_tag = document.createElement('source')
					new_src_tag.src = video_link;
					vPlayer_video.appendChild(new_src_tag)
				}else{
					// change the source src tag
					source.src = video_link
					vPlayer_video.load()
				}

				//launch modal now
				showModal()

			}
		}
	}

	function calculateDimensions(){
		var window_ratio = window.innerWidth / window.innerHeight;

		var size = {};

		if( vPlayer_video_ratio > window_ratio ){
			size.width = window.innerWidth - (vPlayer_modal_padding.horizontal * 2);
			size.height = size.width / vPlayer_video_ratio;
		}else{
			size.height = window.innerHeight - (vPlayer_modal_padding.vertical * 2);
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

	function showModal(){
		vPlayer_overlay.style.display = 'block';
		vPlayer_modal.style.display = 'block';
		resizeModal(vPlayer_initial_modal_size);
		vPlayer_video.play()
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

	function desktopSetup(){
		vPlayer_overlay = document.getElementById('vplayer-overlay');
		vPlayer_modal = document.getElementById('vplayer-modal');
		vPlayer_close_btn = document.getElementById('vplayer-close-btn');
		vPlayer_video = document.getElementById('vplayer-video');

		vPlayer_close_btn_width_half = 13;
		vPlayer_close_btn_height_half = 13;

		vPlayer_video.addEventListener( 'loadedmetadata', function(){
			loadedMetaData();
		}, false);

		var closing_modal_elements = [vPlayer_close_btn, vPlayer_overlay];
		for( var close_element in [vPlayer_close_btn, vPlayer_overlay] ){
			closing_modal_elements[close_element].addEventListener( 'click', function(){
				closeVideoModal();
			});
		}

		window.addEventListener( 'resize', function(){
			fitModalToScreen();
		});
	}

	function mobileSetup(){
		vPlayer_video_mobile = document.getElementById('vplayer-video-mobile');

		var listeners = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'webkitendfullscreen'];

		for( var listener in listeners ){
			vPlayer_video_mobile.addEventListener( listeners[listener], function(e){
				// chrome safari firefox IE ios end fullscreen
				exitFullscreenMobile();
			});
		}
	}

	function setup(many_videos){
		// Setup hooks to fire events when the a tag is pressed
		var vplayer_hooks = document.querySelectorAll('a.vplayer-popup');

		multiple_videos = many_videos || false

		if( vplayer_hooks.length > 0 ){
			for( var i = 0; i < vplayer_hooks.length; i++ ){
				vplayer_hooks[i].addEventListener( 'click' , launchVideoPlayer, false);
			}


			if( detectMobile() ){
				mobileSetup()
			}else{
				desktopSetup()
			}

			vPlayer_first_open = false;
			vPlayer_is_video_loaded = false;

			vPlayer_initial_modal_size = {width: 450, height: 250};
			vPlayer_modal_padding = {horizontal: 80, vertical: 50};

			return this;
		}
		return null;
	}

	function setPadding(horizontal, vertical){
		vPlayer_modal_padding.horizontal = horizontal;
		vPlayer_modal_padding.vertical = vertical;
		return this;
	}

	function setInitialSize(width, height){
		vPlayer_initial_modal_size.width = width;
		vPlayer_initial_modal_size.height = height;
		return this;
	}

	function setTransitionTime(ms){
		var transitionString = "width "+ms+"ms, height "+ms+"ms, left "+ms+"ms, top "+ms+"ms";

		vPlayer_modal.style.transition = transitionString;
		vPlayer_close_btn.style.transition = transitionString;
		vPlayer_video.style.transition = transitionString;
		return this;
	}

	return {
		setup: setup,
		setPadding: setPadding,
		setInitialSize: setInitialSize,
		setTransitionTime: setTransitionTime,

		fit: fitModalToScreen
	};
}).call(this);

window.vplayer = VPlayer;