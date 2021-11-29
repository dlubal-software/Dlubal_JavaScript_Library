function Line(no,
              nodes,
              comment,
              params) 
{
    // nodes = typeof nodes !== 'undefined' ? nodes : [];
    if (typeof (nodes) !== "undefined") 
    {
        ASSERT(nodes.length > 1, "Minimum two nodes must be set to line");
        this.line = engine.create_line(no, nodes);
        set_comment_and_parameters(this.line, comment, params);
        return this.line;
    }
}


Line.prototype.Polyline = function (no,
                                    nodes,
                                    comment,
                                    params) 
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];
    ASSERT(nodes.length > 1, "Minimum two nodes must be set to line");

    this.line = engine.create_line(no, nodes);
    set_comment_and_parameters(this.line, comment, params);
};



Line.prototype.Arc = function (no,
                               nodes,
                               control_point,
                               alpha_adjustment_target,
                               comment,
                               params) 
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];    
    control_point = typeof control_point !== 'undefined' ? control_point : [];
    ASSERT(nodes.length == 2, "Two nodes must be set for arc");
    ASSERT(control_point.length == 3, "Define control point by this format [X, Y, Z]");
        
    this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_ARC;
    this.line.arc_control_point_x = control_point[0];
    this.line.arc_control_point_y = control_point[1];
    this.line.arc_control_point_z = control_point[2];
    if (alpha_adjustment_target == lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC || alpha_adjustment_target =="")
    {
        this.line.arc_alpha_adjustment_target = lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC; 
    }
    if (alpha_adjustment_target == lines.ALPHA_ADJUSTMENT_TARGET_ARC_CONTROL_POINT)
    {
        this.line.arc_alpha_adjustment_target = lines.ALPHA_ADJUSTMENT_TARGET_ARC_CONTROL_POINT; 
    }
    if (alpha_adjustment_target == lines.ALPHA_ADJUSTMENT_TARGET_END_OF_ARC)
    {
        this.line.arc_alpha_adjustment_target = lines.ALPHA_ADJUSTMENT_TARGET_END_OF_ARC; 
    }
    set_comment_and_parameters(this.line, comment, params);
};


Line.prototype.Circle = function (no,
                                  nodes,
                                  center_of_circle,
                                  circle_radius,
                                  point_of_normal_to_circle_plane,
                                  comment,
                                  params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : 0;    
    center_of_circle = typeof center_of_circle !== 'undefined' ? center_of_circle : [];
    circle_radius = typeof circle_radius !== 'undefined' ? circle_radius : 0.0;
    point_of_normal_to_circle_plane = typeof point_of_normal_to_circle_plane !== 'undefined' ? point_of_normal_to_circle_plane : [];

    ASSERT(center_of_circle.length == 3, "Define center of circle by this format [X, Y, Z]");
    ASSERT(point_of_normal_to_circle_plane.length == 3, "Define normal vector of circle by this format [X, Y, Z]");
    
    this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_CIRCLE;
    this.line.circle_center_coordinate_1 = center_of_circle[0];
    this.line.circle_center_coordinate_2 = center_of_circle[1];
    this.line.circle_center_coordinate_3 = center_of_circle[2];
    this.line.circle_radius = circle_radius;
    this.line.circle_normal_coordinate_1 = point_of_normal_to_circle_plane[0];
    this.line.circle_normal_coordinate_2 = point_of_normal_to_circle_plane[1];
    this.line.circle_normal_coordinate_3 = point_of_normal_to_circle_plane[2];
    set_comment_and_parameters(this.line, comment, params);
};


Line.prototype.EllipticalArc = function (no,
                                         nodes,
                                         p1_control_point,
                                         p2_control_point,
                                         p3_control_point,
                                         arc_angle_alpha,
                                         arc_angle_beta,
                                         comment,
                                         params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];    
    p1_control_point = typeof p1_control_point !== 'undefined' ? p1_control_point : [];
    p2_control_point = typeof p2_control_point !== 'undefined' ? p2_control_point : [];
    p3_control_point = typeof p3_control_point !== 'undefined' ? p3_control_point : [];
    arc_angle_alpha = typeof arc_angle_alpha !== 'undefined' ? arc_angle_alpha : 0.0;
    arc_angle_beta = typeof arc_angle_beta !== 'undefined' ? arc_angle_beta : 0.0;
    
    ASSERT(nodes.length == 2, "Two nodes must be set for Elliptical Arc");
    ASSERT(p1_control_point.length == 3, "Define first control point by this format [X, Y, Z]");
    ASSERT(p2_control_point.length == 3, "Define second control point by this format [X, Y, Z]");
    ASSERT(p3_control_point.length == 3, "Define perimeter control point by this format [X, Y, Z]");

    this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_ELLIPTICAL_ARC;
    this.line.elliptical_arc_first_control_point_x = p1_control_point[0];
    this.line.elliptical_arc_first_control_point_y = p1_control_point[1];
    this.line.elliptical_arc_first_control_point_z = p1_control_point[2];
    this.line.elliptical_arc_second_control_point_x = p2_control_point[0];
    this.line.elliptical_arc_second_control_point_y = p2_control_point[1];
    this.line.elliptical_arc_second_control_point_z = p2_control_point[2];
    this.line.elliptical_arc_perimeter_control_point_x = p3_control_point[0];
    this.line.elliptical_arc_perimeter_control_point_y = p3_control_point[1];
    this.line.elliptical_arc_perimeter_control_point_z = p3_control_point[2];

    this.line.elliptical_arc_alpha = arc_angle_alpha;
    this.line.elliptical_arc_beta = arc_angle_beta;

    set_comment_and_parameters(this.line, comment, params);
};


Line.prototype.Ellipse = function (no,
                                   nodes,
                                   p3_control_point,
                                   comment,
                                   params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];    
    p3_control_point = typeof p3_control_point !== 'undefined' ? p3_control_point : [];
    ASSERT(nodes.length == 2, "Two nodes must be set for Ellipse");
    ASSERT(p3_control_point.length == 3, "Define Ellipse control point by this format [X, Y, Z]");

    this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_ELLIPSE;
    this.line.ellipse_control_point_x = p3_control_point[0];
    this.line.ellipse_control_point_y = p3_control_point[1];
    this.line.ellipse_control_point_z = p3_control_point[2];

    set_comment_and_parameters(this.line, comment, params);
};


Line.prototype.Parabola = function (no,
                                    nodes,
                                    p3_control_point,
                                    parabola_alpha,
                                    comment,
                                    params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];    
    p3_control_point = typeof p3_control_point !== 'undefined' ? p3_control_point : [];
    parabola_alpha = typeof parabola_alpha !== 'undefined' ? parabola_alpha : 0.0;
 
    ASSERT(nodes.length == 2, "Two nodes must be set for Parabola");
    ASSERT(p3_control_point.length == 3, "Define control point by this format [X, Y, Z]");
    this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_PARABOLA;
    this.line.parabola_control_point_x = p3_control_point[0];
    this.line.parabola_control_point_y = p3_control_point[1];
    this.line.parabola_control_point_z = p3_control_point[2];
    this.line.parabola_alpha = parabola_alpha;
    set_comment_and_parameters(this.line, comment, params);
};


Line.prototype.Spline = function (no,
                                  nodes,
                                  comment,
                                  params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];    

    ASSERT(nodes.length >= 2, "at least two nodes must be set for Splines");
     this.line = engine.create_line(no, nodes);
    this.line.type = lines.TYPE_SPLINE;
    set_comment_and_parameters(this.line, comment, params);
};

Line.prototype.RectangularPolygon = function (no,
                                              center_point,
                                              length,
                                              width,
                                              plane, //"XY" or "XZ" or "YZ"
                                              comment,
                                              params) 
{
    center_point = typeof center_point !== 'undefined' ? center_point: [];
    length = typeof length !== 'undefined' ? length: 0.0;
    width = typeof width !== 'undefined' ? width: 0.0;
    plane = typeof plane !== 'undefined' ? plane: "";
    ASSERT(center_point.length == 3, "Define the center point of rectangle by this format [X, Y, Z]");
    var X = center_point[0];
    var Y = center_point[1];
    var Z = center_point[2];
    var no_n = nodes.lastId();
    if(plane == "XY" || plane == "")
    {
        Node(no_n + 1, X - length/2, Y - width/2, Z);
        Node(no_n + 2, X + length/2, Y - width/2, Z);
        Node(no_n + 3, X + length/2, Y + width/2, Z);
        Node(no_n + 4, X - length/2, Y + width/2, Z);
    }
    if(plane == "XZ")
    {
        Node(no_n + 1, X - length/2, Y, Z - width/2);
        Node(no_n + 2, X + length/2, Y, Z - width/2);
        Node(no_n + 3, X + length/2, Y, Z + width/2);
        Node(no_n + 4, X - length/2, Y, Z + width/2);
    }
    if(plane == "YZ")
    {
        Node(no_n + 1, X, Y - length/2, Z - width/2);
        Node(no_n + 2, X, Y + length/2, Z - width/2);
        Node(no_n + 3, X, Y + length/2, Z + width/2);
        Node(no_n + 4, X, Y - length/2, Z + width/2);
    }

    var nodes_list = [no_n + 1, no_n + 2, no_n + 3, no_n + 4, no_n + 1];
    this.line = Line(no, nodes_list)
    set_comment_and_parameters(this.line, comment, params);
};

Line.prototype.nPolygon = function (no,
                                    center_point,
                                    no_edges, // number of edges
                                    radius,   // Circumscribed circle radius
                                    plane,    //"XY" or "XZ" or "YZ"
                                    rotation_angle,
                                    comment,
                                    params) 
{
    center_point = typeof center_point !== 'undefined' ? center_point: [];
    no_edges = typeof no_edges !== 'undefined' ? no_edges: 0.0;
    radius = typeof radius !== 'undefined' ? radius: 0.0;
    plane = typeof plane !== 'undefined' ? plane: "";
    rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle: 0.0;
    ASSERT(center_point.length == 3, "Define the center point of rectangle by this format [X, Y, Z]");
    ASSERT(no_edges > 2, "Number of edges should be more than 2");
    var X = center_point[0];
    var Y = center_point[1];
    var Z = center_point[2];
    var no_n = nodes.lastId() + 1;
    var nodes_list = [];
    if(plane == "XY" || plane == "")
    {
        for (var i = 0; i < no_edges; ++i)
        {
            var alpha = i*PI*2/no_edges + PI/no_edges + rotation_angle;
            Node(no_n, X + radius*cos(alpha),  Y + radius*sin(alpha),  Z);
            nodes_list.push(no_n);
            no_n++;
        }
    }
    if(plane == "XZ")
    {
        for (var i = 0; i < no_edges; ++i)
        {
            var alpha = i*PI*2/no_edges + PI/no_edges + rotation_angle;
            Node(no_n, X + radius*cos(alpha),  Y,  Z + radius*sin(alpha));
            nodes_list.push(no_n);
            no_n++;
        }
    }
    if(plane == "YZ")
    {
        for (var i = 0; i < no_edges; ++i)
        {
            var alpha = i*PI*2/no_edges + PI/no_edges + rotation_angle;
            Node(no_n, X,  Y + radius*cos(alpha),  Z + radius*sin(alpha));
            nodes_list.push(no_n);
            no_n++;
        }
    }
    nodes_list.push(no_n - no_edges);
    this.line = Line(no, nodes_list)
    set_comment_and_parameters(this.line, comment, params);
};
