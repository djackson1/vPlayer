vPlayer
========

A library to provide an easy to implement but customizable video player on desktops with support for fullscreen on tablets/phones


# Installation
make sure your project has initialised npm
  ```
  npm init
  ```

install the vplayer module to your local project
  ```
  npm install vplayer --save
  ```

this will install the vplayer to 'node_modules/vplayer'

# Usage
  include the script tag on your page
  ```
  <script src="node_modules/vplayer/vplayer.js"></script>
  ```

  include the stylesheet for the vplayer (your path may vary, but it must load from node_modules...)
  ```
  <link rel="stylesheet" type="text/css" href="node_modules/vplayer/style.css">
  ```

  on the page load, you must initialise the vplayer, this can be done by calling the following inside a page load event
  ```
  VPlayer.setup()
  ```

  you can customise the vplayer by chaining extra functions
  ```
  .setTransitionTime( time_in_milliseconds )
  .setInitialSize( initial_width, initial_height )
  .setPadding( horizontal_padding, vertical_padding )

  VPlayer.setup().setTransitionTime(800).setInitialSize(200,100).setPadding(90,110);
  ```


  include the following code where you want the link to open the vplayer
  ```
  <!-- vPlayer code -->
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
  <!-- !vPlayer code -->
  ```

  if you want to have multiple activation links on the page, you just need to add another link with the class `vplayer-poup`
  ```
  <!-- e.g. in the navbar somewhere, as well as a link on the page -->
  <a class="vplayer-popup">
    <img src="images/navbar/video_open_btn.jpg" />
  </a>
  ```

  this allows the vplayer to be started from multiple locations on a page



# Release History

* 0.2.0 Following semver standards