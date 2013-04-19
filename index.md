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

Most importantly, _Fennec_ introduces a new way of working with client-side templating. It harness some old ideas and bring it up to this modern world.

To better understand what _Fennec_ provides, lets look the the following example:
(note: the below code is not a correct and will not run in a browser; some contents were removed and other were simplified for the sake of better quality).

```html
<head>
	<!-- Include reference to external library (i.e.: jQuery, Handlebars) -->
    
	<script type="text/javascript">
    	// This element holds the compiled template.
    	var template;
        
        //
        // jQuery callback after page is loaded.
        //
        $(document).ready(function() {
        	// (1) Fetch the contents of 'hello-message' DOM element (see below).
        	var source = $( "#hello-message" ).html();
            
            // (2) Compile the template.
            template = Handlebars.compile(source);
        };
        
        /**
         * Generate a new welcome message with a given @name and display it to the user.
         *
         * @param name - Name of person to welcome.
         */
		function applyMessage(name) {
        	// (3) Generate content from template.
        	var generatedContent = template({ theName : name });
            
            // (4) Insert the generated HTML into the body.
            $( "#message-container" ).insert(generatedContent);
        }
	</script>
    
    <!-- DOM element holding the source template -->
    <script id="hello-message" type="text/template">
    	Hello Mr. {{theName}}
    </script>
</head>

<body>
	<div id="message-container">
    </div>
</body>
```

The above code has the following 4 core elements:
1. Fetch the source template we want to generate contents-from later on. Typically, such a block is much larger and contains tens and hundreds of elements.
Take a special look at the location of the block itself - it is placed within a general-purpose `script` element, outside the scope of the `body`.
Though it is not mandatory and not everyone uses to idiom, most tutorials and some major open-source projects reviewed uses this convention.
2. Compile the template. This is not a mandatory phase; some use it others don't.
3. When required, the template is translated into an actual text with a given context (in our context, we have a single attributed name `theName` which accepts a string holding a person's name).
4. We insert the HTML generated at the previous phase into a `div` designated in the body section.

Now, let's look at the same example using _Fennec_:
```html
<head>
	<!-- Include reference to external library (i.e.: jQuery, Handlebars and Fennec) -->
    
	<script type="text/javascript">
    	// This element holds the compiled template.
    	var agent;
        
        //
        // jQuery callback after page is loaded.
        //
        $(document).ready(function() {
        	// (1) Creating an agent and associating it with a DOM element.
        	agent = new TemplateBinder("#message-container");
            
            // (2) Refresh the content (explained later on).
			agent.refresh();
        };
        
        /**
         * Generate a new welcome message with a given @name and display it to the user.
         *
         * @param name - Name of person to welcome.
         */
		function applyMessage(name) {
        	// (3) Refresh the template with a new name.
        	agent.refresh( { name: theName } );
        }
	</script>
</head>

<body>
	<div id="message-container">
    	Hello Mr. {{theName}}
    </div>
</body>
```

Let's review our example above:
1. Create an agent and associate it with a DOM element.
2. Refresh the contents (explained later on).
3. Whenever someone calls `applyMessage` function, the agent refresh the contents and pushes it back into the message-container `div`.

