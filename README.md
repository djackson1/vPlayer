vPlayer
========

A library to provide an easy-to-implement but customizable video player on desktops with support for fullscreen on tablets/phones.

# Installation

The library comes as an npm package:

`npm install vplayer --save`

# Usage

Include the script on your page (adjusting the link path as necessary)
  
`<script src="node_modules/vplayer/vplayer.js"></script>`

Include the vplayer stylesheet (again, exact path may vary)
  
`<link rel="stylesheet" href="node_modules/vplayer/style.css">`

You then need to initialize vplayer on page load using the following
  
`VPlayer.setup()`

There are a few library methods you can use

```
.setTransitionTime(time_in_milliseconds)

.setInitialSize(initial_width, initial_height) // (px, px)

.setPadding(horizontal_padding, vertical_padding) // (px, px)

// Methods can also be chained like so
VPlayer.setup().setTransitionTime(800).setInitialSize(200, 100).setPadding(90, 110);
```

Include the following markup where you want the link to open the vplayer
  
```
<a class="vplayer-popup" href="#">
  Launch video player!
</a>

<div id="vplayer-overlay">&nbsp;</div>

<div id="vplayer-modal">
  <a id="vplayer-close-btn" href="#">
    <img id="vplayer-close-btn-img" src="node_modules/vplayer/images/close-icon.png">
  </a>
  <video id="vplayer-video"></video>
</div>

<video controls id="vplayer-video-mobile">
  <source src="folder_to_video/video_path.mp4">
</video>
```

If you want to have multiple vplayer activation links on a page, you just need to add another anchor tag with the class `vplayer-popup`
  
```
<a class="vplayer-popup">
  <img src="images/navbar/video_open_btn.jpg" />
</a>
```
  
# Contributing

  See [issues](https://github.com/thisisbd/vPlayer/issues), general feature improvements also welcome!
  
# License

  MIT