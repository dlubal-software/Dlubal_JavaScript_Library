/**
 * Create Thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {number} uniform_thickness_d - Uniform thickness in meters.
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 * @returns 
 */
function Thickness(no,
    name,
    material,
    uniform_thickness_d,
    comment,
    params) {
    if (typeof (name) !== "undefined") {
        name = typeof name !== 'undefined' ? name : "";
        uniform_thickness_d = typeof uniform_thickness_d !== 'undefined' ? uniform_thickness_d : 0.2;

        this.thickness = engine.create_thickness(no);

        // Thickness Name
        this.thickness.name = name;

        // Set material
        if (material !== 'undefined') {
            this.thickness.material = material;
        }

        // Uniform Thickness d
        this.thickness.uniform_thickness = uniform_thickness_d;

        set_comment_and_parameters(this.thickness, comment, params);
        return this.thickness;
    }
}

/**
 * Create Uniform thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {array} properties - Properties of thickness in format [thickness]
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Uniform = function (no,
    name,
    material,
    properties,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    properties = typeof properties !== 'undefined' ? properties : [];

    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    // Uniform Thickness d
    this.thickness.uniform_thickness = properties[0];
    this.thickness.type = thicknesses.TYPE_UNIFORM;
    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Variable - 3 Nodes thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {array} properties - Properties of thickness
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Variable_3Nodes = function (no,
    name,
    material,
    properties,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    properties = typeof properties !== 'undefined' ? properties : [];
    ASSERT(properties.length == 6, "WARNING: The properties parameter needs to be of length 6. Kindly check list inputs for completeness and correctness.");

    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    this.thickness.type = thicknesses.TYPE_VARIABLE_THREE_NODES;
    this.thickness.thickness_1 = properties[0];
    this.thickness.node_1 = properties[1];
    this.thickness.thickness_2 = properties[2];
    this.thickness.node_2 = properties[3];
    this.thickness.thickness_3 = properties[4];
    this.thickness.node_3 = properties[5];

    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Variable - 2 Nodes and Direction thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {array} properties - Properties of thickness
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Variable_2NodesAndDirection = function (no,
    name,
    material,
    properties,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    properties = typeof properties !== 'undefined' ? properties : [];
    ASSERT(properties.length == 5, "WARNING: The properties parameter needs to be of length 5. Kindly check list inputs for completeness and correctness.");

    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    this.thickness.type = thicknesses.TYPE_VARIABLE_TWO_NODES_AND_DIRECTION;
    this.thickness.thickness_1 = properties[0];
    this.thickness.node_1 = properties[1];
    this.thickness.thickness_2 = properties[2];
    this.thickness.node_2 = properties[3];
    this.thickness.direction = properties[4];

    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Variable - 4 Surface Corners thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {array} properties - Properties of thickness
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Variable_4SurfaceCorners = function (no,
    name,
    material,
    properties,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    properties = typeof properties !== 'undefined' ? properties : [];
    ASSERT(properties.length == 8, "WARNING: The properties parameter needs to be of length 8. Kindly check list inputs for completeness and correctness.");

    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    this.thickness.type = thicknesses.TYPE_VARIABLE_FOUR_SURFACE_CORNERS;
    this.thickness.thickness_1 = properties[0];
    this.thickness.node_1 = properties[1];
    this.thickness.thickness_2 = properties[2];
    this.thickness.node_2 = properties[3];
    this.thickness.thickness_3 = properties[4];
    this.thickness.node_3 = properties[5];
    this.thickness.thickness_4 = properties[6];
    this.thickness.node_4 = properties[7];

    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Variable - Circle thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {int} material - Number of material
 * @param {array} properties - Properties of thickness
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Variable_Circle = function (no,
    name,
    material,
    properties,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    properties = typeof properties !== 'undefined' ? properties : [];
    ASSERT(properties.length == 2, "WARNING: The properties parameter needs to be of length 2. Kindly check list inputs for completeness and correctness.");

    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    this.thickness.type = thicknesses.TYPE_VARIABLE_CIRCLE;
    this.thickness.thickness_circle_center = properties[0];
    this.thickness.thickness_circle_line = properties[1];
    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Layers thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {array} layers - List of layers
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.Layers = function (no,
    name,
    layers,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    layers = typeof layers !== 'undefined' ? layers : [];
    this.thickness = engine.create_thickness(no);

    // Thickness Name
    this.thickness.name = name;

    this.thickness.type = thicknesses.TYPE_LAYERS;
    for (var i = 0; i < layers.length; ++i) {
        this.thickness.layers_reference_table[i + 1].material = layers[i][0];
        this.thickness.layers_reference_table[i + 1].thickness = layers[i][1];
        this.thickness.layers_reference_table[i + 1].angle     =(layers[i][2])*PI/180;
        this.thickness.layers_reference_table[i + 1].comment   = layers[i][3];
    }
    set_comment_and_parameters(this.thickness, comment, params);
};


/**
 * Create Shape                                                         Orthotropy thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {array} layers - List of layers
 * @param {string} orthotropy_type - Orthotropy Type
 * @param {number} rotation_beta - Rotation about Z-axis of surface (Degree)
 * @param {string} consideration_of_self_weight - Self-Weight definition
 * @param {array} parameters - Parameters of Shame Orthotropy
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.ShapeOrthotropy = function (no,
    name,
    material,
    orthotropy_type,
    rotation_beta,
    consideration_of_self_weight,
    parameters,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    rotation_beta = typeof rotation_beta !== 'undefined' ? rotation_beta : 0.0;
    consideration_of_self_weight = typeof consideration_of_self_weight !== 'undefined' ? consideration_of_self_weight : [];
    parameters = typeof parameters !== 'undefined' ? parameters : [];

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_EFFECTIVE_THICKNESS) {
        ASSERT(parameters.length == 2, "WARNING: The properties parameter needs to be of length 2. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_EFFECTIVE_THICKNESS;
        this.thickness.shape_orthotropy_effective_thickness_x = parameters[0];
        this.thickness.shape_orthotropy_effective_thickness_y = parameters[1];
    }

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_COUPLING) {
        ASSERT(parameters.length == 3, "WARNING: The properties parameter needs to be of length 3. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_COUPLING;
        this.thickness.coupling_thickness = parameters[0];
        this.thickness.coupling_spacing = parameters[1];
        this.thickness.coupling_width = parameters[2];
    }

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_UNIDIRECTIONAL_RIBBED_PLATE) {
        ASSERT(parameters.length == 4, "WARNING: The properties parameter needs to be of length 4. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_UNIDIRECTIONAL_RIBBED_PLATE;
        this.thickness.slab_thickness = parameters[0];
        this.thickness.rib_height = parameters[1];
        this.thickness.rib_spacing = parameters[2];
        this.thickness.rib_width = parameters[3];
    }

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_BIDIRECTIONAL_RIBBED_PLATE) {
        ASSERT(parameters.length == 7, "WARNING: The properties parameter needs to be of length 7. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_BIDIRECTIONAL_RIBBED_PLATE;
        this.thickness.slab_thickness = parameters[0];
        this.thickness.rib_height_x = parameters[1];
        this.thickness.rib_height_y = parameters[2];
        this.thickness.rib_spacing_x = parameters[3];
        this.thickness.rib_spacing_y = parameters[4];
        this.thickness.rib_width_x = parameters[5];
        this.thickness.rib_width_y = parameters[6];
    }


    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_TRAPEZOIDAL_SHEET) {
        ASSERT(parameters.length == 5, "WARNING: The properties parameter needs to be of length 5. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_TRAPEZOIDAL_SHEET;
        this.thickness.sheet_thickness = parameters[0];
        this.thickness.total_profile_height = parameters[1];
        this.thickness.rib_spacing = parameters[2];
        this.thickness.top_flange_width = parameters[3];
        this.thickness.bottom_flange_width = parameters[4];
    }

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_HOLLOW_CORE_SLAB) {
        ASSERT(parameters.length == 3, "WARNING: The properties parameter needs to be of length 3. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_HOLLOW_CORE_SLAB;
        this.thickness.slab_thickness = parameters[0];
        this.thickness.void_spacing = parameters[1];
        this.thickness.void_diameter = parameters[2];
    }

    if (orthotropy_type == thicknesses.ORTHOTROPIC_THICKNESS_TYPE_GRILLAGE) {
        ASSERT(parameters.length == 5, "WARNING: The properties parameter needs to be of length 5. Kindly check list inputs for completeness and correctness.");
        this.thickness = engine.create_thickness(no);
        this.thickness.type = thicknesses.TYPE_SHAPE_ORTHOTROPY;
        this.thickness.orthotropy_type = thicknesses.ORTHOTROPIC_THICKNESS_TYPE_GRILLAGE;
        this.thickness.slab_thickness = parameters[0];
        this.thickness.rib_spacing_x = parameters[1];
        this.thickness.rib_spacing_y = parameters[2];
        this.thickness.rib_width_x = parameters[3];
        this.thickness.rib_width_y = parameters[4];
    }

    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_COMPUTED_FROM_PARAMETERS) {
        this.thickness.shape_orthotropy_self_weight_definition_type = thicknesses.SELF_WEIGHT_COMPUTED_FROM_PARAMETERS;
    }
    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_DEFINED_VIA_FICTITIOUS_THICKNESS)
    {
        this.thickness.shape_orthotropy_self_weight_definition_type = thicknesses.SELF_WEIGHT_DEFINED_VIA_FICTITIOUS_THICKNESS;
        this.thickness.orthotropy_fictitious_thickness = consideration_of_self_weight[1];
    }
    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_DEFINED_VIA_WEIGHT)
    {
        this.thickness.shape_orthotropy_self_weight_definition_type = thicknesses.SELF_WEIGHT_DEFINED_VIA_WEIGHT;
        this.thickness.shape_orthotropy_self_weight = consideration_of_self_weight[1];
    }

    this.thickness.orthotropy_rotation_beta = rotation_beta * PI / 180;
    // Thickness Name
    this.thickness.name = name;

    // Set material
    if (material !== 'undefined') {
        this.thickness.material = material;
    }

    set_comment_and_parameters(this.thickness, comment, params);
};

/**
 * Create Stiffness Matrix thickness
 * @param {int} no - Number of Thickness
 * @param {string} name - Name of the Thickness
 * @param {number} rotation_beta - Rotation about Z-axis of surface (Degree)
 * @param {string} consideration_of_self_weight - Self-Weight definition
 * @param {array} coefficient_of_thermal_expansion - Coefficient of thermal expansion
 * @param {array} stiffness_matrix - Stiffness Matrix
 * @param {string} comment - Comment for the Thickness
 * @param {dictionary} params - Parameters of the Thickness
 */
Thickness.prototype.StiffnessMatrix = function (no,
    name,
    rotation_beta,
    consideration_of_self_weight,
    coefficient_of_thermal_expansion,
    stiffness_matrix,
    comment,
    params) {
    name = typeof name !== 'undefined' ? name : "";
    rotation_beta = typeof rotation_beta !== 'undefined' ? rotation_beta : 0.0;
    consideration_of_self_weight = typeof consideration_of_self_weight !== 'undefined' ? consideration_of_self_weight : [];
    coefficient_of_thermal_expansion = typeof coefficient_of_thermal_expansion !== 'undefined' ? coefficient_of_thermal_expansion : [];
    stiffness_matrix = typeof stiffness_matrix !== 'undefined' ? stiffness_matrix : [];

    ASSERT(stiffness_matrix[0].length == 6, "The Stiffness Matrix format should be like this: [[D11, D12, D13, D22, D23, D33], [D44, D45, D55], [D66, D67, D68, D77, D78, D88], [D16, D17, D18, D27, D28, D38]]");
    ASSERT(stiffness_matrix[1].length == 3, "The Stiffness Matrix format should be like this: [[D11, D12, D13, D22, D23, D33], [D44, D45, D55], [D66, D67, D68, D77, D78, D88], [D16, D17, D18, D27, D28, D38]]");
    ASSERT(stiffness_matrix[2].length == 6, "The Stiffness Matrix format should be like this: [[D11, D12, D13, D22, D23, D33], [D44, D45, D55], [D66, D67, D68, D77, D78, D88], [D16, D17, D18, D27, D28, D38]]");
    ASSERT(stiffness_matrix[3].length == 6, "The Stiffness Matrix format should be like this: [[D11, D12, D13, D22, D23, D33], [D44, D45, D55], [D66, D67, D68, D77, D78, D88], [D16, D17, D18, D27, D28, D38]]");

    this.thickness = engine.create_thickness(no);
    this.thickness.type = thicknesses.TYPE_STIFFNESS_MATRIX;
    this.thickness.orthotropy_rotation_beta = rotation_beta * PI / 180;
    this.thickness.stiffness_matrix_coefficient_of_thermal_expansion = coefficient_of_thermal_expansion;

    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_FICTITIOUS_THICKNESS_AND_BULK_DENSITY) {
        this.thickness.stiffness_matrix_self_weight_definition_type = thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_FICTITIOUS_THICKNESS_AND_BULK_DENSITY;
        this.thickness.orthotropy_fictitious_thickness = consideration_of_self_weight[1];
        this.thickness.stiffness_matrix_bulk_density = consideration_of_self_weight[2];
    }

    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_FICTITIOUS_THICKNESS_AND_AREA_DENSITY) {
        this.thickness.stiffness_matrix_self_weight_definition_type = thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_FICTITIOUS_THICKNESS_AND_AREA_DENSITY;
        this.thickness.orthotropy_fictitious_thickness = consideration_of_self_weight[1];
        this.thickness.stiffness_matrix_area_density = consideration_of_self_weight[2];
    }

    if (consideration_of_self_weight[0] == thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_BULK_DENSITY_AND_AREA_DENSITY) {
        this.thickness.stiffness_matrix_self_weight_definition_type = thicknesses.SELF_WEIGHT_DEFINITION_TYPE_DEFINED_VIA_BULK_DENSITY_AND_AREA_DENSITY;
        this.thickness.stiffness_matrix_bulk_density = consideration_of_self_weight[1];
        this.thickness.stiffness_matrix_area_density = consideration_of_self_weight[2];
    }

    this.thickness.D11 = stiffness_matrix[0][0];
    this.thickness.D12 = stiffness_matrix[0][1];
    this.thickness.D13 = stiffness_matrix[0][2];
    this.thickness.D22 = stiffness_matrix[0][3];
    this.thickness.D23 = stiffness_matrix[0][4];
    this.thickness.D33 = stiffness_matrix[0][5];

    this.thickness.D44 = stiffness_matrix[1][0];
    this.thickness.D45 = stiffness_matrix[1][1];
    this.thickness.D55 = stiffness_matrix[1][2];

    this.thickness.D66 = stiffness_matrix[2][0];
    this.thickness.D67 = stiffness_matrix[2][1];
    this.thickness.D68 = stiffness_matrix[2][2];
    this.thickness.D77 = stiffness_matrix[2][3];
    this.thickness.D78 = stiffness_matrix[2][4];
    this.thickness.D88 = stiffness_matrix[2][5];

    this.thickness.D16 = stiffness_matrix[3][0];
    this.thickness.D17 = stiffness_matrix[3][1];
    this.thickness.D18 = stiffness_matrix[3][2];
    this.thickness.D27 = stiffness_matrix[3][3];
    this.thickness.D28 = stiffness_matrix[3][4];
    this.thickness.D38 = stiffness_matrix[3][5];

    // Thickness Name
    this.thickness.name = name;
    set_comment_and_parameters(this.thickness, comment, params);
};