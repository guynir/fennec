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
function TemplateBinder(source, target, model) {

    this.target = null;
    this.model = {};

    // Check that caller specified a source element.
    if (!isUndefined(source)) {
        throw "Missing source element.";
    }

    // Check type of 'source' parameter.
    if (isString(source)) {
        // If 'source' is of type 'string', convert it to jQuery object.
        source = $(source);
    } else if (source instanceof jQuery) {
        // 'source' is already of type jQuery, nothing to do !
    } else {
        // We don't know how to handle 'source' element; it's not of any type known to us.
        throw "Unknown 'source' element type.";
    }

    // If target is not specified, it is the same as the source.
    if (isUndefined(target)) {
        // If 'target' is undefined, it should be the same as 'source'. This is part of our specification.
        this.target = source;
    } else if (isString(target)) {
        // 'target' is of type string. We assume it is an element that actually exist.
        this.target = $(target);
        
        // Make sure 'target' reference an existing element.
        if (this.target.length == 0) {
            throw "'target' element does not reference an existing element.";
        }

        // Validate that 'target' parameter is an actual element and not inline-generated jQuery object (object that
        // contains markup but does not actually represents an existing DOM element).
        var targetTagName = this.target.parent().prop('tagName');
        if (isUndefined(targetTagName)) {
            throw "'target' is not an actual DOM element";
        }

        // Make sure our 'target' reference a single DOM element.
        if (targetTagName.length > 1) {
            throw "'target' element reference more than 1 DOM element.";
        }
    }

    // Fetch the original markup and compile a template function.
    var contents = source.html();
    this.template = Handlebars.compile(contents);

    // If model is valid, use it. Otherwise, create an internal model.
    this.model = !isUndefined(model) ? model : {};

    /**
     * Check if a given object is either undefined or null.
     *
     * @param obj Object to evaluate.
     *
     * @return 'true' if object is undefined, 'false' if object reference an actual value.
     */
    function isUndefined(obj) {
        return obj == undefined || obj == null;
    }

    /**
     * Check if a given object is a string.
     *
     * @param obj Object to evaluate.
     *
     * @return 'true' if 'obj' is a primitive string, 'false' otherwise.
     */
    function isString(obj) {
        return typeof obj == 'string';
    }
}

/**
 * Refresh the element associated with the template.
 *
 * @param context Context with properties to replace on template.
 */
TemplateBinder.prototype.renderWith = function (context) {
    // Generate a new markup from template.
    var produced = this.template(context);

    // Remove all children currently associated with out target element.
    $(this.target).empty();

    // Insert the produced markup to the target element.
    $(this.elementRef).append( $(produced) );
}

/**
 * Generate markup and refresh target element. If a 'model' object is passed, it updates the internal model prior to generation.
 *
 * @param model Optional model (may be 'null' or 'undefined') to update our internal one.
 */
TemplateBinder.prototype.refresh = function(model) {
    // If model is a non-empty, copy its fields into our own model.
    if (!isUndefined(model)) {
        for (var property in model) {
          this.model[prop] = model[prop];
        }
    }

    // Render the template.
    this.renderWith(this.model);
}

/**
 * Validate that all library dependencies are available and satisfy requirements. Error messages are sent to browser's console.
 * @return { BOOLEAN } 'true' if validation is successful, 'false' if dependency is missing.
 */
TemplateBinder.prototype.validateRequirements = function() {
	var succes = true;

    if (typeof jQuery == 'undefined') {
        console.error("Missing jQuery library.");
        succes = false;
    }

    if (typeof Handlebars == 'undefined') {
    	console.error("Missing Handlebars.js library.");
    	succes = false;
    }

    return success;
}

function BinderFactory() {
}