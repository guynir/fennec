---
layout: default

published: false
---

# What _Fennec_ is all about

_Fennec_ is a small Javascript library that simplifies the work in HTML/Javascript application when working with logic-less template libraries such as
[Mustahe](http://mustache.github.io/), [Handlebars](http://handlebarsjs.com/),
[jQuery template](https://github.com/jquery/jquery-tmpl),
[dust.js](http://akdubya.github.io/dustjs/),
[Underscore JS template] (http://underscorejs.org/#template) and many others.

If you're not sure how things can be simpler than they are today, look at the following example and read the [Why do I need _Fennec_ ?] (#why-do-i-need-fennec-) section.

Here is a simple example:

```html
<html>

<head>
	// Don't forget to import externals: jQuery 1.8+, Handlerbars 1.0+ and Fennec.

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
			{{ "{{ #if name" }} }}
			Hello {{ "{{ name" }} }}! Very pleased to meet you !!!
			{{ "{{ else" }} }}
			Hello Mr., I don't know your name.
			{{ "{{ /if" }} }}
		</span>
		<form id="form">
			<label>
				{{ "{{ #if name" }} }}
				You can change your name:
				{{ "{{ else" }} }}
				Please tell me your name:
				{{ "{{ /if" }} }}
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

The idea is simple: Every time we call `applyNewName()` function with a new string (representing a person's name), the body is rendered, new values are applied and a new content is placed in the `body` element.
You can download the code from [this example](https://github.com/guynir/fennec/blob/master/examples/sample.html) at GitHub.

# Why do I need _Fennec_ ?

Most importantly, _Fennec_ introduces a new way of working with client-side templating. It harness an old known solution in this modern world.

There is a lot of reading about it in an [external blog] (#), however it is suffice to say that if you ever worked with client-side template library, you've noticed the difference in the example above.

Beyond the introduction above, almost all generated contents of client-side template library you will use will end up inside a DOM element (e.g.: `body`, `div` and even `script` element); therefore, you need to write a code to tie between the output of the library and the target DOM. _Fennec_ does just that! It provides a convenient way to tie between a template, a templating-engine and a target DOM.
