//
//		Fennec V0.6
//		Copyright (c) 2013 by Guy Raz Nir
//		This software is distributed under MIT license.
//

/**
 * Fennec is a utility object that binds between a template, Handlebars templating library and an actual
 * DOM element. When a caller invokes a refresh or render request, the template is processed, a new content
 * is generated and inserted into the target DOM element.
 *
 * The constructor accepts 3 parameters:
 *  - source:   Represents the source of the template. If this parameter is string,
 *              it is treated as jQuery selector and converted to actual jQuery object.
 *  - target:   Optional parameter that represents a target DOM element to place information in.
 *              If this parameter is omitted or is null, 'source' is treated as both the source DOM element and the target one.
 *  - model:    Optional parameter that represents a model (context); if this parameter is not specified,
 *              an internal model is allocated for the binder.
 *
 * @param source [required] Source to fetch template from.
 * @param target [optional] Target DOM element selector where generated contents are placed.
 * @param model [optional] An external model to work with.
 * @constructor
 */
function Fennec(source, target, model) {

    // Library version.
    this.VERSION = '0.61';
    
    // Holds the 'target' element.
    this.target = null;
    
    // Internal model.
    this.model = {};

    // Check that caller specified a source element.
    if (isUndefined(source)) {
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
    var targetUndefined = isUndefined(target);
    if (targetUndefined) {
        // If 'target' is undefined, it should be the same as 'source'. This is part of our specification.
        this.target = source;

        // Validate that 'target' parameter is an actual element and not inline-generated jQuery object (object that
        // contains markup but does not actually represents an existing DOM element).
        var targetTagName = this.target.parent().prop('tagName');
        if (isUndefined(targetTagName)) {
            throw "'target' must be specified; 'source' is an inline-template.";
        }
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
        if (this.target.length > 1) {
            throw "'target' element reference more than 1 DOM element.";
        }
    }

    // Compile a template function.
    var contents = source.html();
    this.template = Handlebars.compile(contents);

    // If model is valid, use it. Otherwise, create an internal model.
    this.model = !isUndefined(model) ? model : {};
    
    // Refresh the template after we're ready.
    this.refresh();
}

/**
 * Refresh the element associated with the template.
 *
 * @param context Context with properties to replace on template.
 */
Fennec.prototype.renderWith = function (context) {
    // Generate a new markup from template.
    var produced = this.template(context);

    // Remove all children currently associated with out target element.
    $(this.target).empty();

    // Insert the produced markup to the target element.
    console.log("Produced code: " + produced);
    $(this.target).append( produced );
}

/**
 * Generate markup and refresh target element. If a 'model' object is passed, it updates the internal model prior to generation.
 *
 * @param model Optional model (may be 'null' or 'undefined') to update our internal one.
 */
Fennec.prototype.refresh = function(model) {
    // If model is a non-empty, copy its fields into our own model.
    if (!isUndefined(model)) {
        for (var property in model) {
          this.model[property] = model[property];
        }
    }

    // Render the template.
    this.renderWith(this.model);
}

/**
 * Validate that all library dependencies are available and satisfy requirements. Error messages are sent to browser's console.
 * @return { BOOLEAN } 'true' if validation is successful, 'false' if dependency is missing.
 */
Fennec.prototype.validateRequirements = function() {
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

/**
 * Generates a jQuery object holding a template for a given string.
 *
 * @param template String to convert to a jQuery object.
 *
 * @return jQuery object holding a template contents.
 */
function _t(template) {
    if (!isString(template)) {
        throw "Parameter is not of type 'string'.";
    }

    return $("<span>" + template + "</span>");
}
