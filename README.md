fuzzy-fenek
===========

Client-side (Javascript) library that prolificates the work with templating frameworks.

##Background

Client-side templating in HTML world becomes more and more popular. Libraries such as
[Mustachae](http://mustache.github.com/), [underscore.js](http://www.underscorejs.org),
[Handlerbars](http://handlebarsjs.com/) and [dust.js](http://akdubya.github.com/dustjs/) are just a few
to mention of a larger list of templating solutions.

##What _funny-fenek_ provides?

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





