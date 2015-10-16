vPlayer
========

A library to provide an easy to implement but customizable video player on desktops with support for fullscreen on tablets/phones


# Installation
make sure your project has initialised npm
  `npm init`

install the vplayer module to your local project
  `npm install vplayer --save-dev`

this will install the vplayer to 'node_modules/vplayer'

# Usage
  include the script tag on your page
  `<script src="node_modules/vplayer/index.js"></script>`

  include the stylesheet for the vplayer (your path may vary, but it must load from node_modules...)
  `<link rel="stylesheet" type="text/css" href="node_modules/vplayer/style.css">`

  on the page load, you must initialise the vplayer, this can be done by calling the following inside a page load event
  `VPlayer.setup()`

  you can customise the vplayer by chaining extra functions
  ```
  .setTransitionTime( time_in_milliseconds )
  .setInitialSize( initial_width, initial_height )
  .setPadding( horizontal_padding, vertical_padding )

  VPlayer.setup().setTransitionTime(800).setInitialSize(200,100).setPadding(90,110);
   ```



# Release History

* 0.1.13 Added readme support for implementing the vplayer on a project