Why _Fennec_ ?
==============

Background
----------
To understand why should we use _Fennec_ and why _Fennec_ was created, we need to review some of the conventions already
adopted and used in the community and their drawbacks.

Client-side templating existed for a long time, ever since Javascript was first introduced by Netscape. Templating has
evolved since than and simplified the work of web developers, however only lately, in the past several years, web-based
client-side templating has really gone into main stream.

Since client-side templating is a re-born idea (an idea that existed for a long time but was "just discovered" now),
new attempts are made by the community to generate _best practices_ for this notion.

Most tutorials, examples and several sites in production uses the concept of *partials* or *snippets*:
```html

<html>
	
<head>
	<script type="text/javascript">
	
		function updateTime(theHour, theMinute, theSecond, periodOfDay) {
			// Fetch the template from a DOM element named time-template.
			var template = $( "#time-template" ).html();
			
			// Prepare a context.
			var context = {
				hour: theHour,
				minute: theMinute,
				seconds: theSeconds,
				period_of_day: periodOfDay
			}
			
			// Generate HTML markup from the template and the context.
			var html = SomeTemplateEngine.generate(template, context);
			
			// Put the generated markup in a dedicated DIV element so the user can see it on screen.
			$( "#time-div" ).insert(html);
		}
	</script>
	
	<script id="time-template" type="text/template">
		It is now {{hour}}:{{minute}}:{{seconds}} in the {{period_of_day}}.
	</script>
	
</head>

<body>
	<div id="time-div">
		
	</div>
</body>

</html>
```

The example above illustrates one of the core elements in modern client-side templating as recommended by most tutorials
out in the net.

We can observe leading elements:

1. A function in Javascript that reads the template from another DOM element (in our example, it is `updateTime()` function).
2. A block of text representing the template held in a dedicated `script`. There are other ways, of course, for a document to hold partial, but this is the recommended way by some tutorials, because it is easy to move this _partials_ to external file.
3. A target block (in our case `<div id="#time-div">`) which holds the generated content.

This approach, while preferred for for some cases - is the least preferred one for most cases.

Let us explore a different solution:
```html

<html>
	
<head>
	<script type="text/javascript">
	
		function updateTime(theHour, theMinute, theSecond, periodOfDay) {
			// Fetch the template from a DOM element named time-template.
			var template = $( "#time-div" ).html();
			
			// Prepare a context.
			var context = {
				hour: theHour,
				minute: theMinute,
				seconds: theSeconds,
				period_of_day: periodOfDay
			}
			
			// Generate HTML markup from the template and the context.
			var html = SomeTemplateEngine.generate(template, context);
			
			// Put the generated markup in a dedicated DIV element so the user can see it on screen.
			$( "#time-div" ).empty().insert(html);
		}
	</script>

</head>

<body>
	<div id="time-div">
		It is now {{hour}}:{{minute}}:{{seconds}} in the {{period_of_day}}.
	</div>
</body>

</html>
```

In the example above, we can notice a major change in approach. Instead of holding the template in a detached `script` element,
we embed it inside the body itself - more specifically, where it is intended to be placed after being processed.

What did we gain from that approach ?

Firstly, the flow of the page is much more clearer. We can have a global view of how the page is built.

Secondly, HTML authers, who build HTML pages and leave Javascript programming to others, can develop an entire markup with tokens such as `{{hour}}` that can be inserted during runtime later on.

Thirdly, HTML-oriented editors can assist developers to be more productive while using this approach. When the template is placed in a detached `script` element, as smart as an editor can be, it cannot guest the final location of the generate template; however, in this approach, editors CAN understand the template's place.

It is important to note, however, that the above implementation can only be run once. After the first execution, the template is erased an a static HTML block is inserted insted of it.
If we run the function `updateTime()` for the second time with different values, nothing will happen.

The story of _Fennec_
---------------------
The _Fennec_ library was created to address or serve two issues:

1. Provide an implementation that eases the work with client-side template libraries.
2. Provide better practices and knowledge base for working with templating.

_Fennec_ provides an implementation in Javascript that adheres to the first bullet. It allows the library user to
specify a DOM element that contains template.

As for the second bullet, _Fennec_'s implementation and ecosystem provide a great place to publish and propogate
best-practices and knowledge sharing.

Let's look at how can one use _Fennec_, based on the sample above:

```javascript
// Call during init time to bind between Fennec and a source/target DOM element.
var binder = new TemplateBinder( "#time-div" );

function updateTime(theHour, theMinute, theSecond, periodOfDay) {

	var context = {
		hour: theHour,
		minute: theMinute,
		seconds: theSeconds,
		period_of_day: periodOfDay
	}
	
	binder.refresh(context);
	
}
```

For those who wish to still separate between the template and the target location, _Fennec_ also provides facilities:

```html
<head>
	<script type="text/javascript">
		var binder = new TemplateBinder( "#time-message", "#time-div" );
	
		<script type="text/javascript">

			function updateTime(theHour, theMinute, theSecond, periodOfDay) {
				var context = {
					hour: theHour,
					minute: theMinute,
					seconds: theSeconds,
					period_of_day: periodOfDay
				}
	
				binder.refresh(context);

			}
		</script>
	</script>
	
	<script id="time-template" type="text/template">
		It is now {{hour}}:{{minute}}:{{seconds}} in the {{period_of_day}}.
	</script>
	
</head>

<body>
	<div id="time-div">
	</div>
</body>

```

Notice that the fact that we separate the source template element from the target placeholder required us to change only
the initialization of the binder and nothing else.

What if we have a simple string (like in our example above) and we do not want to explode our code with a lot of
`script` elements ? _Fennec_ provides a simple way to accommodate that as well:

```html
<head>
	<script type="text/javascript">
		var theTemplate = "It is now {{hour}}:{{minute}}:{{seconds}} in the {{period_of_day}}.";
		var binder = new TemplateBinder( _t(theTemplate), "#time-div" );
	
		<script type="text/javascript">

			function updateTime(theHour, theMinute, theSecond, periodOfDay) {
				var context = {
					hour: theHour,
					minute: theMinute,
					seconds: theSeconds,
					period_of_day: periodOfDay
				}
	
				binder.refresh(context);

			}
		</script>
	</script>
</head>

<body>
	<div id="time-div">
	</div>
</body>

```

_Fennec_ provides a simple function `_t()` that accepts a string representing a template and generates a pseudo element
for it. It is a shortcut for times when we have short templates.



