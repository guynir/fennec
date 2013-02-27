//
// Test template generation with 'inline-template'.
//
test("Test inline template.", function() {
	var template = "Hello, world !!!";
	var binder = new TemplateBinder_(t(template), "#target-block");
	binder.refresh();
	var contents = $( "#target-block" ).html().trim();

	equal(contents, template, "Validating generated contents of inline template.");
});

//
// Test template generation with template string available within a DOM element.
//
test("Test template fetched from actual DOM element.", function() {
	var message = "Hello, world !!!";
	var binder = new TemplateBinder("#template-block", "#target-block");
	binder.refresh({ message: message });
	var contents = $( "#target-block" ).html().trim();

	equal(contents, message, "Validating generated contents of template.");
});

//
// Test that when 'target' parameter is not passed to constructor, it is assigned the same
// element as 'source'.
//
test("'target' is the same as 'source' when it is not explicitly specified.", function() {
	var binder = new TemplateBinder("#target-block");
	equal (binder.tagret, binder.source, "Checking that source and target point to the same element when 'target' is 'undefined'." );

	binder = new TemplateBinder("#target-block", null);
	equal (binder.tagret, binder.source, "Checking that source and target point to the same element when 'target' is 'null'." );
});

//
// Test rendering on an element that is both the template and the target container.
//
test("Template block is also the target.", function() {
	var message = "Hello, world !!!";
	var binder = new TemplateBinder("#template-block");
	binder.refresh({ message: message });

	var contents = $( "#template-block" ).html();
	equal (contents.trim(), message, "Generated contents are as expected." );
});

test("Template binding with external model.", function() {
	var message1 = "Hello, world !!!";
	var message2 = "Hello to you too !!!";

	var model = { message : message1 };
	var binder = new TemplateBinder("#template-block", "#target-block", model);

	binder.refresh();
	equal ($( "#template-block" ).html().trim(), message1, "Test generated contents with external model.");

	binder.refresh({message : message2});
	equal ($( "#template-block" ).html().trim(), message1, "Test generated contents after external model was overriden.");
});