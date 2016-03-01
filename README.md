# vPlayer

A library to provide an easy-to-implement but customizable video player on desktops with support for fullscreen on tablets/phones.

### Installation

The library comes as an npm package:

`npm install vplayer --save`

### Including the correct files

Include the script on your page (adjusting the link path as necessary)
  
`<script src="node_modules/vplayer/vplayer.js"></script>`

Include the vplayer stylesheet (again, exact path may vary)
  
`<link rel="stylesheet" href="node_modules/vplayer/style.css">`

### Ways of using vPlayer

#### One video on a page

Include the following html on your page

```
<a class="vplayer-popup" href="#">
  Launch video player!
</a>

<div id="vplayer-overlay">&nbsp;</div>

<div id="vplayer-modal">
  <a id="vplayer-close-btn" href="#"></a>
  <video id="vplayer-video"></video>
</div>

<video controls id="vplayer-video-mobile">
  <source src="folder_to_video/video_path.mp4">
</video>
```

If you want to have multiple vplayer activation links on a page, you just need to add another anchor tag with the class `vplayer-popup`
  
```
<a class="vplayer-popup">
  Open the video
</a>
```

You then need to initialize vplayer on page load using the following
  
`VPlayer.setup()` 
or 
`VPlayer.setup(false)`

The parameter to the setup method is whether there are multiple videos

#### Multiple videos on a page

```
<a class="vplayer-popup" data-video-link="video-1.mp4" href="#">
  Launch video player!
</a>

<div id="vplayer-overlay">&nbsp;</div>

<div id="vplayer-modal">
  <a id="vplayer-close-btn" href="#"></a>
  <video id="vplayer-video"></video>
</div>

<video controls id="vplayer-video-mobile">
</video>

<a class="vplayer-popup" data-video-link="video-2.mp4" href="#">
  Launch video 2
</a>
```

In your <a> tags put the link of the video which that link should open in the `data-video-link` attribute
`<a class="vplayer-popup" data-video-link="link-to-video.mp4" href="#">Play video</a>`

You then need to initialize vplayer on page load using the following

`VPlayer.setup(true)` 

### Customizability

There are some methods which can customize VPlayer

```
// how long for the modal to take to increase
.setTransitionTime(time_in_milliseconds)

// the initial width and height of the modal
.setInitialSize(initial_width, initial_height) // (px, px)

// how much side padding so that the VPlayer doesn't sit right on the edge of the screen
.setPadding(horizontal_padding, vertical_padding) // (px, px)

// Methods can also be chained like so
VPlayer.setup().setTransitionTime(800).setInitialSize(200, 150).setPadding(30, 40);
```

  
# Contributing

  See [issues](https://github.com/thisisbd/vPlayer/issues), general feature improvements also welcome!
  
# License

  MIT