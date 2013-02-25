fuzzy-fenek
===========

Client-side (Javascript) library that prolificates the work with templating frameworks.

##Table of contents
* [Background](#background)
* [What _fuzzy-fenek_ is all about](#what-fuzzy-fenek-is-all-about)
* [The library specifications](#the-library-specifications)
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
This section will provide (very soon, I hope) a thorough technical description of the library.

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





