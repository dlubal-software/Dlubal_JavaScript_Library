/**
 * Creates line mesh refinement
 * @class
 * @constructor
 * @param {Number}  no          Index of line mesh refinement, can be undefined
 * @param {Array}   lines_no    Line indexes
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Line mesh refinement's parameters, can be undefined
 * @returns Created line mesh refinement
 */
function LineMeshRefinement(no,
    lines_no,
    comment,
    params) {
    if (arguments.length > 0) {
        return this.line_mesh_refinement = createLineMeshRefinement(no, lines_no, comment, params);
    }
}

/**
 * Creates line mesh refinement with target LE length
 * @param {Number}  no                  Index of line mesh refinement, can be undefined
 * @param {Array}   lines_no            Line indexes
 * @param {Number}  target_length       Target FE length, can be undefined (0.1 as default)
 * @param {Number}  number_of_layers    Number of layers (2, 4, 6 or 8), can be undefined (2 as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Line mesh refinement's parameters, can be undefined
 */
LineMeshRefinement.prototype.TargetLeLength = function (no,
    lines_no,
    target_length,
    number_of_layers,
    comment,
    params) {
    this.line_mesh_refinement = createLineMeshRefinement(no, lines_no, comment, params);
    this.line_mesh_refinement.type = line_mesh_refinements.TYPE_LENGTH;
    if (typeof target_length !== "undefined") {
        this.line_mesh_refinement.target_length = target_length;
    }
    if (typeof number_of_layers !== "undefined") {
        this.line_mesh_refinement.number_of_layers = number_of_layers;
    }
}

/**
 * Creates line mesh refinement with number of finite elements
 * @param {Number}  no                          Index of line mesh refinement, can be undefined
 * @param {Array}   lines_no                    Line indexes
 * @param {Number}  number_of_finite_elements   Number of finite elements, can be undefined (10 as default)
 * @param {Number}  number_of_layers            Number of layers (2, 4, 6 or 8), can be undefined (2 as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Line mesh refinement's parameters, can be undefined
 */
LineMeshRefinement.prototype.NumberFiniteElements = function (no,
    lines_no,
    number_of_finite_elements,
    number_of_layers,
    comment,
    params) {
    this.line_mesh_refinement = createLineMeshRefinement(no, lines_no, comment, params);
    this.line_mesh_refinement.type = line_mesh_refinements.TYPE_ELEMENTS;
    if (typeof number_of_finite_elements !== "undefined") {
        this.line_mesh_refinement.elements_finite_elements = number_of_finite_elements;
    }
    if (typeof number_of_layers !== "undefined") {
        this.line_mesh_refinement.number_of_layers = number_of_layers;
    }
}

/**
 * Creates gradually line mesh refinement
 * @param {Number}  no                  Index of line mesh refinement, can be undefined
 * @param {Array}   lines_no            Line indexes
 * @param {Number}  number_of_rows      Number of rows, can be undefined (2 as default)
 * @param {Number}  number_of_layers    Number of layers (2, 4, 6 or 8), can be undefined (2 as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Line mesh refinement's parameters, can be undefined
 */
LineMeshRefinement.prototype.Gradually = function (no,
    lines_no,
    number_of_rows,
    number_of_layers,
    comment,
    params) {
    this.line_mesh_refinement = createLineMeshRefinement(no, lines_no, comment, params);
    this.line_mesh_refinement.type = line_mesh_refinements.TYPE_GRADUAL;
    if (typeof number_of_rows !== "undefined") {
        this.line_mesh_refinement.gradual_rows = number_of_rows;
    }
    if (typeof number_of_layers !== "undefined") {
        this.line_mesh_refinement.number_of_layers = number_of_layers;
    }
}

/**
 * Creates line mesh refinement (private)
 * @param {Number}  no          Index of line mesh refinement, can be undefined
 * @param {Array}   lines_no    Line indexes
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Line mesh refinement's parameters, can be undefined
 * @returns Created line mesh refinement
 */
var createLineMeshRefinement = function (no,
    lines_no,
    comment,
    params) {
    var line_mesh_refinement = engine.create_line_mesh_refinement(no);
    for (var i = 0; i < lines_no.length; ++i)
    {
        if (lines.exist(lines_no[i])) {
            lines[lines_no[i]].mesh_refinement = line_mesh_refinement;
        }
        else {
            console.log("Line no. " + lines_no[i] + " doesn't exist");
        }
    }
    set_comment_and_parameters(line_mesh_refinement, comment, params);
    return line_mesh_refinement;
}