fuzzy-fenek
===========

Client-side (Javascript) library that prolificates the work with templating frameworks.

##Table of contents
* [Background](#background)
* [What _fuzzy-fenek_ is all about](#what-fuzzy-fenek-is-all-about)
* [The library specifications](#the-library-specifications)
	* [Dependencies](#dependencies)
	* [Usage](#usage)
	* [TemplateBinder](#templatebinder)
	* [refresh() method](#refresh-method)
	* [refreshWith() method](#refreshwith-method)
* [The 'TODO' section](#the-todo-section)

##Background

Most client-side templating libraries such as [Mustache](http://mustache.github.com/),
[underscore.js](http://www.underscorejs.org), [Handlerbars](http://handlebarsjs.com/) and
[dust.js](http://akdubya.github.com/dustjs/) (to name just a few) allow you to generate contents from an
arbirary-length string template.
 
```html
<head>
	<script type="text/template" id="hello-world-template">
		Hello Mr. {{name}},<br>
		This is a sample Mustachae/Handlebars compatible template section.<br>
	</script>
	
	<script type="text/javascript">
		var model = {
			name: 'Guy'
		}
		
		$(document).ready(function() {
			// [1] Fetch contents of template.
			var source = $( "#hello-world-template" ).html();
		
			// [2] Compile template.
			var template = Handlebars.compile(source);
		
			// [3] Generate contents from template.
			var contents = template(model);
		
			// [4] Add contents to body.
			$( body ).append( contents );
		}
	</script>
</head>

<body>
</body>
```
A typical flow of using client-side templating is:

1. Fetch the markup of text from somewhere in the body.
2. Compile or otherwise process the template. Not all templating libraries require a compilation phase.
3. Generate contents out of a given template, using a model of information.
4. Place generated contents inside the body to be visible to the user.

This typical flow occurs for almost all cases of using client-side templating libraries. Wouldn't it be simpler to
have someone do it for you ?

##What **Fuzzy Fenek** is all about?

**Fuzzy Fenek** is a lightweight Javascript library that allows you to tie between a template, a model and a target DOM
elemet you would like to place the generated contents.

```html
<script type="text/javascript">
	var template = "Hello Mr. {{ name }}";
	binder = new TemplateBinder(_t(template), "body");
	binder.refresh( { name: "Guy" } );
</script>
```

Using the above code snipper in your page, you can issue a call to _binder_ as many time as you want. Each time will
generate a new contents from the original template and inject it directly to the `body` element.

##The library specifications
###Dependencies
**Fuzzy Fenek** has two dependencies: jQuery 1.7+ and Handlebars 1.0+.

In order to use the library, you need to include both dependencies before **Fuzzy Fenek**.
```html
<head>
	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="handlebars.min.js"></script>
	<script type="text/javascript" src="fuzzy-fenek.js"></script>
</head>
```
###Usage
To start using the binder, you first need to instantiate it.

```html
<head>
	<script type="text/javascript">
		// Keep a global variable that everyone from everywhere in the page can access it.
		var binder;
		
		// jQuery callback after page is loaded and DOM is accessible.
		$(document).ready(function() {
			// [1] Instantiate the binder.
			binder = new TemplateBinder("#container");
			
			// Generate contents and push it to #container DIV.
			binder.refresh({ name: "Guy" });
		});
	</script>
</head>

<body>
	<!-- [3] This DIV will contain the generated contents -->
	<div id="container">
		Hello Mr. {{name}},<br>
		This is a sample Mustachae/Handlebars compatible template section.<br>
	</div>
</body>
```
When a `TemplateBinder` is instantiated [1], the caller pass in a 'source' for a template. The 'source' can be
either a selector-string of a DOM element (e.g.: `body`, `div`, `#container`, `.headerClass`, ...) or an actual jQuery
object that represents a DOM element.

Since the 'source' is a DOM element in the body and we do not pass a 'target', `TemplateBinder` is smart enough to
understand that `#container` is both the source (the template) and the target place to generated contents in.

This cool feature ('source' and 'target' being the same) allow us to develop pages more fluently and make them more
readable and maintainable.
This convension is used by most server-side templating engines, such as JSP, FreeMarker, Velocity and others.

###TemplateBinder

The `TemplateBinder` constructor is defined like that:
```javascript
function TemplateBinder(source, target, model) {
}
```
The `source` parameter is required. It represents a template. It can be either a selector that identifies DOM element
that contains the template (e.g.: `#container`, `#hello-world-template`) or it can be an actual jQuery object that
represents a DOM element, e.g.:
```javascript
var element = $("#container");
var binder = new TemplateBinder(element);
```
The `target` parameter is optional. If presented, it can be either a string of a selector or an actual jQuery object
representing an element in the DOM.

If `target` is either undefined or `null`, the `TemplateBinder` will understand that `source` and `target` are the
same, like the example [above](#usage).

The `model` parameter is optional. It allows the user to specify an external model. If this parameter is not specified,
`TemplateBinder` will create an internal model.

###update() method
The update method does 2 things:
* Apply a new set of values into the model. This action allows the binder to 'remember' values of each field.
* Renders template and push it into the target DOM element.

```html
<head>
	<script type="text/javascript">
		var binder = new TemplateBinder("<span>{{a}} + {{b}} = {{a + b}}", "#resultDiv");
		
		// This will yield "30" (10 + 20).
		binder.refresh({ a : "10", b : "20" });

		// This will yield "40" (20 + 20) because the binder 'remembers' the previous value of 'b'.
		binder.refresh({ a : "20" });
	</script>
</head>	
```

###renderWith() method
There are times when a user might prefer to not use the internal model facility and provide each time the full set of
properties. For such case, `TemplateBinder` provide `renderWith(model)` method that renders the template with the given
`model`, regardlress of previous values.

###Helper functions
This library comes with helper function `_t(str)` which translates a simple string-based template to jQuery object.

This allows a caller to specify an inline template, i.e.:
```html
var binder = new TemplateBinder(_t("Hello, {{name}}", "#welcomeDiv");
```

##The 'TODO' section
What to expect in (hopefully) near future:

* Extend library to support more template-engine libraries beside Handlebars.
* Extend library to support more DOM manipulation libraries beside jQuery.
* Add more examples.
* Document 'best practices' - DOs and DONTs.
* Availability of this library on CDNs, such as [Google Hosted Libraries](https://developers.google.com/speed/libraries/) and [CloudFlare](http://cdnjs.com/).
* A decent site on Github pages.
