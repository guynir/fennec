---
layout: default
---

# What Fennec is all about

_Fennec_ is a small Javascript library that provides you - the client-side developer - a boilerplate code you will typically need in your code, when working with logic-less template libraries such as [Mustahe](http://mustache.github.io/), [Handlebars](http://handlebarsjs.com/), [jQuery template](https://github.com/jquery/jquery-tmpl), [dust.js](http://akdubya.github.io/dustjs/), [Underscore JS template] (http://underscorejs.org/#template) and many others.

Let's have a look at the following example:
(I removed some elements for the sake of clarity).


```html
<html>

<head>
	// Import here jQuery 1.8+, Handlerbars and Fennec libraries.

	<script type="text/javascript">
		// Reference to agent.
		var agent;
		$( document ).ready(function() {
			// Create a new template agent.
			agent = new TemplateBinder(".container");
			agent.refresh();
		});

		function applyNewName(theName) {
			agent.refresh({name: theName});
		}
	</script>
</head>

<body>
	<div class="container">
		<span>
			{{ "{{#if name"}} }}
				Hello {{name}} ! Very pleased to meet you !!!
			{{ "{{else"}} }}
				Hello Mr., I don't know your name.
			{{ "{{/if" }} }}
		</span>
		<form id="form">
			<label>
				{{ "{{#if name" }} }}
				You can change your name:
				{{ "{{else"}} }}
				Please tell me your name:
				{{ "{{/if"}} }}
			</label>
			<input type="text" id="name">
			<input type="button"
				onclick="applyNewName(this.form.name.value)"
				value="Change">
		</form>
	</div>
</body>

</html>
```

The body itself contains a simple template in a syntax supported by [Mustache](http://mustache.github.io/) and [Handlebars](http://handlebarsjs.com/).

The idea is simple: Every time we call `applyNewName()` with a new string representing a name, the body is rendered and new values are applied.
You can download the code from [this example](https://github.com/guynir/fennec/blob/master/examples/sample.html) at GitHub.

# Why do I need _Fennec_ ?

The big question.

Very simple: _Fennec_ provides two core elements:


Firstly, the .js file itself with some boilerplate code you'll probably need in your own web application to tie between a template and a target DOM.

Every template you'll generate is intended to be placed inside a DOM element (e.g.: `body` or `div`).
Since most template libraries does not provide such a functionality, you will need either to write it yourself or alternatively, import it from outside - hence the _Fennec_ library.

Secondly, _Fennec_ library comes with a lot of knowledge embedded inside it. It introduces new ways to work with templates and make their usage much more simpler and intuitive.


