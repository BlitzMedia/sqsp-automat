Squarespace Template Helper
=======
> A structured workflow for customizing CSS and JavaScript on Squarespace templates without Developer mode.



## Overview

The Squarespace Template Helper is a structured front end development workflow and toolset to help you write organized, modular CSS and JavaScript for use with Squarespace templates **without developer mode**.

Too many designers and developers are customizing Squarespace websites without keeping quality, page load speeds and workmanship in check. Often times, CSS code is an unorganized mess and JavaScript is heavy, bloated and buggy. This workflow aims to solve that. Stick to this workflow and you'll have organized, DRY (don't repeat yourself), prefixed CSS code. You'll also learn to code well-documented, clean JavaScript code that's modular.


### How It Works

The idea here is simple, write all of your JavaScript and Sass, compile it,  upload JavaScript to Squarespace as a file storage asset, and load your compiled Sass into Squarespace's Custom CSS area. A system like this is typically best used with an AJAX-like routing system so you only initialize your app once on initial page load and all page-to-page navigation is handled via AJAX. However, that normally requires using Squarespace Developer mode for a greater level of control over the markup. There are a number of people who'd rather use advanced JavaScript and not turn on Developer mode. This project aims to help those people.


### Features

* DOM manipulation with [properjs-hobo](https://github.com/properjs/hobo), optional support for jQuery 3.0.
* Modular JavaScript structure that compiles to a single, minified file.
* Precisely configured ESLint rules to force learning ES6 code habits.
* JavaScript best practices: Compiled/bundled with Webpack, transpiled with Babel, linted with ESlint, documented with JSDoc syntax.
* Includes Polyfills for [ES6 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Loaded via Webpack plugins.
* Modular Sass structure that compiles to a single CSS file.
* PostCSS Autoprefixer prefixes your CSS.



## Getting Started

This workflow is meant to help you create and organize custom CSS and JavaScript for your Squarespace website. It will output a compressed and minified CSS and JavaScript file that you can take into your website and use.

### Requirements

This project is cross-platform but assumes you have Git and Node.js installed. Git and Node.js are required because we use them both for downloading project dependencies and running tasks.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)

### Clone

Clone this project to your local machine.

```
git clone git@github.com:Squarefront/squarespace-template-helper.git yourprojectname
```

`cd` into your newly created project folder.

### Install

Install all project dependencies.

```
npm i
```

You should now have all your dependencies installed into the `node_modules` folder.


#### Using jQuery Instead of ProperJS Hobo
This project, by default, uses a super slim DOM library called [properjs-hobo](https://github.com/properjs/hobo). It's offers numerous utilities very similar to jQuery, it's designed by [@kitajchuk](https://github.com/kitajchuk) with an "add what you need" approach versus jQuery's "remove what you don't need" approach. This keeps the dependency for properjs-hobo insanely small.

But don't fret! jQuery 3.0 is also pulled in to the project as an unused dependency. If you need it, add it! The [dom.js](source/js/core/dom.js) module caches the high level site elements and is the only place you need to update it, unless you've added consider custom code. Simply comment out properjs-hobo import in favor of either the full jQuery library or jquery.slim (which removes ajax/effects methods).

Also, make sure to adjust the [webpack.config.js](webpack.config.js) Expose Loader, which lets you expose hobo/jQuery to the global window object. *Not a requirement unless you need to do that.*

> Note: Personally I'm at a point where I don't need jQuery anymore. ProperJS Hobo and vanilla JavaScript can do virtually anything you need for web projects.


#### ProperJS Hobo Custom Builds
ProperJS Hobo supports custom builds to only add what you need in your project. By default, I've setup the npm `postinstall` script which runs your properjs-hobo build automatically after `npm i`. I've included a few common methods on top of its core methods. If you find that properjs-hobo is not supporting features you were used to on jQuery, [check the docs](https://github.com/properjs/hobo). You can add more methods by tweaking the postinstall script in [package.json](package.json) and re-running `npm run postinstall` (if you've already run `npm i` once).

If hobo doesn't support what you need, considering submitting an [issue](https://github.com/properjs/hobo/issues) to that project.


### Managing Your Own Project on Git

Just like any other project, when you `git clone` this project, the remote origin will be this Github repo. You'll probably want to just remove Git, re-initialize, and put the project in your own repo.

```shell
# Remove the current instance of Git.
rm -rf .git

# Initialize a new Git repo.
git init
```



## Apps and Tools

People always ask me what my tools of choice are. Here are my recommendations for working with this repo. I manage an app directory on Squarefront, [here](http://squarefront.com/tools).


### Text Editors

SublimeText and Atom have great ecosystems. SublimeText is lightning fast, but a paid application. Atom is open source, but not quite as good as SublimeText in my opinion. I use SublimeText.

* [SublimeText](https://squarefront.com/tools/sublimetext)
* [Atom](https://squarefront.com/tools/atom)


#### Plugins

Both SublimeText and Atom have an incredible ecosystem of plugins. You can install plugins via SublimeText 3 Package Control, or Atom's Plugin Installer. Here are a few plugins you must try out:

* **SublimeText ESLint support:** SublimeLinter and SublimeLinter-contrib-eslint
* **SublimeText Documentation Writing:** DocBlockr
* **Atom ESLint support:** linter and linter-eslint
* **Atom Documentation Writing:** DocBlockr


### Command Line

Built-in command line tools will work great, but I lean towards iTerm on Mac.

* [iTerm](https://squarefront.com/tools/iterm)


### Browser Tools

I love Google Chrome. Here are my favorite extensions:

* [Squarespace Utility](https://squarefront.com/tools/squarespace-utility) - My own Squarespace extension. Shameless plug.
* [JSONview](https://squarefront.com/tools/jsonview) - Improves readability of raw JSON files in the browser.



## Working

Now that you have everything, it's time to work. This project currently uses a a Webpack build system. No Gulp or Grunt. Webpack watches your CSS and JavaScript source files for changes and continusouly recompiles output files as you work. The output locations are configured in [webpack.config.js](webpack.config.js). My preference is outputting to the `template/assets` folder.

To get started, all you have to do is run Webpack using the start task:

```
npm start
```


### CSS

This project uses [Sass](http://sass-lang.com/), which is very similar to [LESS](http://lesscss.org). It makes no difference though because the end result is that we're going to be adding it to Squarespace's Custom CSS Editor via copy & paste, or linking directly to the asset. You could customize this workflow to use LESS if you wanted to.

Head over to the [sass](/sass) folder and explore how everything is setup. Don't be overwhelmed at the amount of files and folders. If you organize your custom CSS like this you'll have a very maintainable, modular project. I've tried to keep it as organized as possible. Here's a quick overview:

* [sass/collections](/sass/collections) - This folder contains one CSS file per Squarespace collection type. For example, if you're making customizations to a Squarespace blog collection, store the CSS in a file in this folder.
* [sass/config](/sass/config) - This should store your project variables and mixins used in all of your Sass files.
* [sass/core](/sass/core) - Core CSS files are generally items that you're going to use site-wide, such as type, grids, icons, etc.
* [sass/modules](/sass/modules) - I like to call "modules" things that are "sections" of the website. For example, a header or footer could technically be called a module. Or maybe I'm creating a custom Google Map that's used in multiple places in my site. These are modules, in my mind. Consider matching your JavaScript modules to CSS modules for add organization.
* [sass/sqs](/sass/sqs) - Contains global Squarespace customizations, block customizations, and anything else related to Squarespace.
* [sass/state](/sass/state) - State normally contains CSS related to hovers, taps, or UI state. Also, I normally put "modifiers" in here.
* [app.scss](/sass/app.scss) - This is your CSS entry point file. This is how you create a modular Sass system. Head over to this file and give it a look. It simply @imports everything in the order you specify. Sass compiles your CSS file according to the order specified.

Remember, you do not have to use everything exactly how I set it up. Feel free to customize it. The point of this CSS system is maintainability. If my client needs a design update to Squarespace video blocks, or I have a bug in my grid system, I know exactly where to go to edit my CSS.


#### Autoprefixing

This project uses a post-build task that prefixes all of your code with the Autoprefixer PostCSS package. This means you should be writing non-prefixed code in your source CSS files.


### JavaScript

This project uses an object literal module system that's bundled with [Webpack](https://webpack.github.io/). This system functions very similar to our modular Sass system mentioned above. The key component here is our [webpack.config.js](webpack.config.js) config file. This project uses the Webpack CLI, so the config file will show you what's going on. Our JavaScript entry point is the [source/js/app.js](source/js/app.js) file. All of your custom JavaScript should be separated into modules that relates to one specific use in your Squarespace website. The [app.js](app.js) should be configured to pull in all of your modules. I tried to leave comments in the project in order to help you build upon the example.



#### Testing JavaScript hooking locally

There's an [index.html](sandbox/index.html) file in the sandbox folder that links up your compiled JavaScript and CSS files. That's a great way to test JavaScript hooking methods prior to taking them into Squarespace. To use, simply open the index.html in your browser, open up your DevTools console, add some HTML hooks that match your custom JavaScript modules, and refresh your browser.



#### Using your custom JavaScript in Squarespace without Developer mode

Webpack will compile all of your JavaScript into two single files, *template/scripts/app.js* and *template/scripts/app.min.js*. You should be able to upload this JavaScript file directly into Squarespace's file storage, then use Squarespace Code Injection to reference the file.

* Step 1: Upload `template/scripts/app.min.js` to Squarespace File Storage
* Step 2: Add `<script src="/s/app.min.js"></script>` to Code Injection > Footer

That's all you need to do!


#### Debugging JavaScript

During Developer and testing, you'll want to upload the `app.js` instead, as it's easier to debug in the browser. Debugging in a live website is a little harder to do on a non-Dev mode Squarespace template, so at the very least you should be able to use Browser DevTools for basic debugging.


#### Minifying your JavaScript for production

As mentioned above, Webpack will build your dev and production files. During development, use your `app.js`. When you're finished testing, upload your `app.min.js` and use that as your production file, which will be considerably smaller.


#### Documentation

This project uses [JSDoc](http://usejsdoc.org/) syntax and includes dependencies to quickly generate a bootstrapped API documentation website that you can run on a local server. To create documentation simply run the following task:

```
npm run jsdoc
```

If it worked correctly you should have a new documentation directory at `js/docs`. If you want to run it on a simple Python server:

```
cd js/docs

python -m SimpleHTTPServer
```

Now head over you can hit [localhost:8000](http://localhost:8000) to see the docs in your browser.



## Resources, Videos & Tutorials
If you need any help understanding or working with this project, I've been creating a lot of community resources.

* [Squarefront](https://squarefront.com) - My large Squarespace education and community resource.
* [Squarefront Live](https://squarefront.com/live) - Weekly live coding your questions on [Youtube](http://youtube.com/squarefront/live).
* [Talk Squarespace Live Chat](https://squarefront.com/chat), powered by Slack.
    * Post your questions anywhere, or PM me: @jasonbarone.
* [Talk Squarespace Events](https://squarefront.com/events), organized with Meetup.
    * I host an unofficial Squarespace [Meetup group](http://meetup.com/talksquarespace) and I do regular events in New York City.