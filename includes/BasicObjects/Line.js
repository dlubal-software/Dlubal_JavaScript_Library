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
    ASSERT(nodes.length == 2, "Two nodes must be set for arc");
    control_point = typeof control_point !== 'undefined' ? control_point : $V();    
    this.line = engine.create_line(no, nodes, control_point, alpha_adjustment_target);
    this.line.type = lines.TYPE_ARC;
    this.line.arc_control_point = control_point;
    this.line.arc_alpha_adjustment_target = lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC;
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
    center_of_circle = typeof center_of_circle !== 'undefined' ? center_of_circle : $V();
    circle_radius = typeof circle_radius !== 'undefined' ? circle_radius : 0.0;
    point_of_normal_to_circle_plane = typeof point_of_normal_to_circle_plane !== 'undefined' ? point_of_normal_to_circle_plane : $V();
    this.line = engine.create_line(no, nodes, center_of_circle, circle_radius, point_of_normal_to_circle_plane, comment, params);
    this.line.type = lines.TYPE_CIRCLE;
    this.line.circle_center = center_of_circle;
    this.line.circle_radius = circle_radius;
    this.line.circle_normal = point_of_normal_to_circle_plane;
    set_comment_and_parameters(this.line, comment, params);
};
