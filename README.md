fuzzy-fenek
===========

Client-side (Javascript) library that prolificates the work with templating frameworks.

##Table of contents
* [Background](#background)
* [What _fuzzy-fenek_ is all about](#what-fuzzy-fenek-is-all-about)
* [The library specifications](#the-library-specifications)
	* [Dependencies](#dependencies)
	* [Using the library](#using-the-library)
	* [Constructor](#constructor)
	* [refresh() method](#refresh-method)
	* [refreshWith() method](#refreshwith-method)
* [The 'TODO' section](#the-todo-section)

##Background

Client-side templating in HTML world becomes more and more popular. Libraries such as
[Mustachae](http://mustache.github.com/), [underscore.js](http://www.underscorejs.org),
[Handlerbars](http://handlebarsjs.com/) and [dust.js](http://akdubya.github.com/dustjs/) are just a few
to mention of a larger list of templating solutions.

##What _fuzzy-fenek_ is all about?

Most 'best practices' and even the tutorials themselves of main-stream templating frameworks suggest
splitting template from the body itself:

```html
<head>
	<script type="text/javascript">
		
		$(document).ready(function() {
			//
			// Fetch the template from a dedicated out-of-body-element and generate markup.
			//
			var source = $( 'hello-template' ).html();
			var template = Handlebars.compile(source);
			var generated = template({ name: 'Guy' });
			
			// Add it to the body.
			$( '.container' ).appendChild( $( generated) );
		});

	</script>
	
	<!-- Template snippet -->
	<script type="text/template" id="hello-template">
		<span>Hello, {{name}}. How are you ?
	</script>
</head>

<body>
	<div class="container">
		
	</div>
</body>
```

While this practice is very useful and even _THE_ preferred one in some cases, it is hard to apply
such a solution on an entire page. The markup is than split to multiple snippets which becomes unreadable
and ambiguous resulting in a code that is hard to maintain.

This library provides a different practice and technical solution. It allows a markup developer to apply
inline templating meta-elements to simplify the work:

```html
<head>
	<script type="text/javascript">
		var agent;
		
		$(document).ready(function() {
			agent = new TemplateAgent('.container');
			agent.refreshWith({ name: 'Guy '});
		});

	</script>
</head>

<body>
	<div class="container">
		<span>Hello, {{name}}. How are you ?
	</div>
</body>
```

Using such practice allow the developer to "see the entire markup" during his or her development cycle.

Moreover, this solution also "ties" between a template and its location in the page. We do not need to
manually generate markup and manipulate the DOM; the library does that automatically.

##The library specifications
_NOTE:_ This section is in its preliminary state and expected to change soon. It contains partial information.
###Dependencies
_fuzzy-fenek_ has three dependencies:
* jQuery (V1.7 and above) - DOM manipulation library.
* Handlebars (V1.0 and above) - Minimal templating library.
* underscore (V1.4 and above) - Utility-belt library.

In order to use _fuzzy-fenek_, you need to introduce the above dependencies before fuzzy-fenek.js import.
```html
<head>
	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="underscore-min.js"></script>
	<script type="text/javascript" src="handlebars.min.js"></script>
	<script type="text/javascript" src="fuzzy-fenek.js"></script>
</head>
```
###Using the library
The usage is pretty much simple and straightforward; simply instantiate **TemplateAgent** and start using it.

```html
<head>
	<script type="text/javascript">
		var agent;
		
		// Callback from jQuery after page was loaded.
		$(document).ready(function() {
			// Create a new agent instace.
			agent = new TemplateAgent(".container");
			
			// Refresh the contents of 'container'-class template.
			agent.refresh();
		});
	</script>
</head>
```
In the example above, after page is loaded and document is ready, jQuery will initiate a callback to our function.
This function will then create a new **TemplateAgent** instance and associate it with an element that has class
_container_ applied to it.

Following that, we call the **refresh()** method to re-generate markup from our template.

###Constructor
The constructor of **TemplateAgent** can have 2 arguments:
* The first argument is the _elementRef_; this is a required argument. Without it an exception is thrown and no action is actually performed.
* The second arguemnt is the _model_; this is an optional arguement; if not specified, one is generated internally.

The _model_ argument is typically used in cases where we want to share the same information between templates. Take 
a look at the following example:

```html
<head>
	<script type="text/javascript">
		var model = {
			username: 'anonymous';		// Property shared by all templates.
			displayRole: 'Guest user';	// Property used only by 'header' template.
			nextPageNumber: 2;			// Property used only by 'footer' template.
		}
		
		var header;
		var footer;
		
		$(document).ready(function() {
			header = new TemplateAgent("#header", model);
			footer = new TemplateAgent("#footer", model);
		})
	</script>
</head>

<body>
	<div id="header">
		Hello {{username}}, you are a {{displayRole}}.
	</div>
	
	<div id="contents">
		// .. bla bla bla
	</div>
	
	<div id="footer" style="position: absolute; bottom: 0">
		<div style="float: left">{{username}}</div>
		<div style="float: right">Next page: {{nextPageNumber}}</div>
	</div>
</body>
```
In the example above, we have two templates: _header_ and _footer_, each representing a different section on a web page.
While each have its own set of properties, they share one property -- **username**; In such case, it is easier to
maintain a single model that is shared among multiple templates.

###refresh() method
The **refresh(model)** method apply a set of values for generating a new markup. The only argument (model) is optional.
If one is provided, its properties are copied to the internal model.

Afterwards, the relevant section is refreshed with the internal model.

If you manipulate the **model** directly, it is not required to pass this argument:
```html
var model = ...
var agent = ...

// Approach #1
agent.refresh( {username: 'anonymous'} );

// Approach #2
model.username = 'anonymous';
agent.refresh();
```
In the above example, both approaches result in the same output.

###refreshWith() method
The **refreshWith(model)** method allows a caller to refresh a template using a given model. This method will ignore
the internal model and generate a new markup using only the model provided by argument passed on call.

##The 'TODO' section
What to expect in (hopefully) near future:

* Extend library to support more template-engine libraries beside Handlebars.
* Extend library to support more DOM manipulation libraries beside jQuery.
* Remove dependency on [underscore-js](http://underscorejs.org).
* Provide unit-tests.
* Add more examples.
* Document 'best practices' - DOs and DONTs.
* Availability of this library on CDNs, such as [Google Hosted Libraries](https://developers.google.com/speed/libraries/) and [CloudFlare](http://cdnjs.com/).
* A decent site on Github pages.





