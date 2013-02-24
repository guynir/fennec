//
//		fuzzy-fenek V0.4
//		Copyright (c) 2013 by Guy Raz Nir
//		This software is distributed under MIT license.
//

/**
 * Object definition and constructor for template handler. A handler is associated with a document element
 * (indirectly) which is a template by itself.
 *
 * @param elementRef Reference to a DOM (e.g.: #header, .title, li, ...) element that should become template.
 * @param model An optional model to associate with agent. If this value is undefined or null, an internal model
 * is generated for this agent.
 * @constructor
 */
function TemplateAgent(elementRef, model) {
    if (elementRef == undefined || elementRef == null) {
        throw "Missing element reference.";
    }

    // Fetch the original markup and compile a template function.
    var source = $(elementRef).get()[0].outerHTML;
    this.template = Handlebars.compile(source);

    // Keep the name of the element; we need to when we refresh the element.
    this.elementRef = elementRef;

    // If model is valid, use it. Otherwise, create an internal model.
    this.model = model != undefined && model != null ? model : {};
}

/**
 * Refresh the element associated with the template.
 *
 * @param context Context with properties to replace on template.
 */
TemplateAgent.prototype.renderWith = function (context) {
    var produced = this.template(context);
    $(this.elementRef).replaceWith($(produced));
}

/**
 * Refresh the template using the internal model.
 */
TemplateAgent.prototype.refresh = function() {
    this.renderWith(this.model);
}

/**
 * Apply a new set of values to the model and refresh.
 *
 * @param model Collection of properties to add to the internal model.
 */
TemplateAgent.prototype.applyAndRefresh = function(model) {
    _.extend(this.model, model);
    this.refresh();
}

/**
 * Validate that all library dependencies are available and satisfy requirements. Error messages are sent to browser's console.
 * @return { BOOLEAN } 'true' if validation is successful, 'false' if dependency is missing.
 */
TemplateAgent.prototype.validateRequirements = function() {
	var succes = true;

    if (typeof jQuery == 'undefined') {
        console.error("Missing jQuery library.");
        succes = false;
    }

    if (typeof _ == 'undefined') {
        console.error("Missing underscore.js library.");
        succes = false;
    }

    if (typeof Handlebars == 'undefined') {
    	console.error("Missing Handlebars.js library.");
    	succes = false;
    }

    return success;
}
