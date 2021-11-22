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
    ASSERT(control_point.length == 3, "Define control point by this format [0.0, 0.0, 0.0]");
        
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

    ASSERT(center_of_circle.length == 3, "Define center of circle by this format [0.0, 0.0, 0.0]");
    ASSERT(point_of_normal_to_circle_plane.length == 3, "Define normal vector of circle by this format [0.0, 0.0, 0.0]");
    
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
    ASSERT(p1_control_point.length == 3, "Define first control point by this format [0.0, 0.0, 0.0]");
    ASSERT(p2_control_point.length == 3, "Define second control point by this format [0.0, 0.0, 0.0]");
    ASSERT(p3_control_point.length == 3, "Define perimeter control point by this format [0.0, 0.0, 0.0]");

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
    ASSERT(p3_control_point.length == 3, "Define Ellipse control point by this format [0.0, 0.0, 0.0]");

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
    ASSERT(p3_control_point.length == 3, "Define control point by this format [0.0, 0.0, 0.0]");
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

/*
Line.prototype.NURBS = function (no,
                                 nodes_no,
                                 control_points,
                                 weights,
                                 comment,
                                 params)
{
    nodes_no = typeof nodes_no !== 'undefined' ? nodes_no : [];    
    control_points = typeof control_points !== 'undefined' ? control_points : [];
    weights = typeof weights !== 'undefined' ? weights : [];

    //ASSERT(nodes_no.length == 2, "Two nodes must be set for NURBS");
    ASSERT(control_points.length == weights.length, "Number of control points must comply with number of weights!");
    
    this.line = engine.create_line(no, nodes_no);
    this.line.type = lines.TYPE_NURBS;
  
    this.line.nurbs_control_points_by_components[1].global_coordinate_x = nodes[nodes_no[0]].coordinate_1
    this.line.nurbs_control_points_by_components[1].global_coordinate_y = nodes[nodes_no[0]].coordinate_2
    this.line.nurbs_control_points_by_components[1].global_coordinate_z = nodes[nodes_no[0]].coordinate_3
    this.line.nurbs_control_points_by_components[1].weight = 1;

    for (var i = 0; i < control_points.length; ++i)
    {
        this.line.nurbs_control_points_by_components[i + 2].global_coordinate_x = control_points[i][0];
        this.line.nurbs_control_points_by_components[i + 2].global_coordinate_y = control_points[i][1];
        this.line.nurbs_control_points_by_components[i + 2].global_coordinate_z = control_points[i][2];
        this.line.nurbs_control_points_by_components[i + 2].weight = weights[i];
    }
 
    this.line.nurbs_control_points_by_components[control_points.length + 2].global_coordinate_x = nodes[nodes_no[1]].coordinate_1
    this.line.nurbs_control_points_by_components[control_points.length + 2].global_coordinate_y = nodes[nodes_no[1]].coordinate_2
    this.line.nurbs_control_points_by_components[control_points.length + 2].global_coordinate_z = nodes[nodes_no[1]].coordinate_3
    this.line.nurbs_control_points_by_components[control_points.length + 2].weight = 1;

  
    /*
    for (var i = 0; i < control_points.length; ++i)
    {
        this.line.nurbs_control_points_by_components[i + 1].global_coordinate_x = control_points[i][0];
        this.line.nurbs_control_points_by_components[i + 1].global_coordinate_y = control_points[i][1];
        this.line.nurbs_control_points_by_components[i + 1].global_coordinate_z = control_points[i][2];
        this.line.nurbs_control_points_by_components[i + 1].weight = weights[i];
    }
    set_comment_and_parameters(this.line, comment, params);
};

*/
