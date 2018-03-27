# Usabilla Marketing Web Developer Interview Assignment

This repository holds the code for a landing page developed for Usabilla as part of the Marketing Web Developer interview assignment due 28 March 2018, as orchestrated by Frank Schouten.

Its folder structure can be found above. Below shortly explained what's what.

-App
Contains all files for development purposes. It holds raw and refactored SCSS that's loaded into a main SCSS that's being built into a single CSS file. It holds the necessary fonts, images, and javascript files. index.html has the complete structure that loads these

While developing, it's recommended to run

```sh
$ gulp watch
```

Which runs the "watch" function within gulpfile.js, which tracks any changes made in any of the files, and with every change processes scss into css and reloads the web page (often found on localhost:3000, depends on your editor/IDE).

Whenever you're done testing and would like to build, it's recommended to run

```sh
$ gulp build
```

which processes the index.html, all (s)css, js, images, and fonts. It concatenates and minimizes all js and css, optimizes the images, and places all these together with the fonts in the dist folder.

-Dist
Is meant for production. It holds as little as possible, yet is fully functional.

Would you like to test the page? Download all content, in your terminal run the gulp build command, and open code > dist > index.html in any browser, any device.
