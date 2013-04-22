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

The story of _Fennec_
---------------------
The _Fennec_ library was created to address two issues:

1. 
