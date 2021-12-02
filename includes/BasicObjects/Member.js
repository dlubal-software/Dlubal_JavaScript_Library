function Member(no,
                node_ids,
                comment,
                params)

{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        set_comment_and_parameters(this.member, comment, params);
        return this.member;
    }
}


Member.prototype.Beam = function (no,
                                  node_ids,
                                  rotation_angle,
                                  start_section_no,
                                  end_section_no,
                                  start_member_hinge_no,
                                  end_member_hinge_no,
                                  comment,
                                  params)
    {
        if (typeof (node_ids) !== "undefined") 
        {
            node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
            rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
            ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Beam member");
            this.member;
            if (RFEM)
            {
                var line = engine.create_line(no, node_ids);
                this.member = engine.create_member(no, line);
            }
            else
            {
                this.member = engine.create_member(no, node_ids[0], node_ids[1]);
            }
            this.member.type = members.TYPE_BEAM;
            this.member.rotation_angle = rotation_angle*PI/180;
            this.member.section_start = sections[start_section_no];
            if (end_section_no > 0)
            {
                this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
                this.member.section_end = sections[end_section_no];
            }
            if (start_member_hinge_no > 0)
            {
                this.member.member_hinge_start = member_hinges[start_member_hinge_no];
            }
            if (end_member_hinge_no > 0)
            {
                this.member.member_hinge_end = member_hinges[end_member_hinge_no];
            }
    
            set_comment_and_parameters(this.member, comment, params);
        }
    }


Member.prototype.Rigid = function (no,
                                   node_ids,
                                   rotation_angle,
                                   start_member_hinge_no,
                                   end_member_hinge_no,
                                   comment,
                                   params)
    {
        if (typeof (node_ids) !== "undefined") 
        {
            node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
            rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
            ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Rigid member");
            this.member;
            if (RFEM)
            {
                var line = engine.create_line(no, node_ids);
                this.member = engine.create_member(no, line);
            }
            else
            {
                this.member = engine.create_member(no, node_ids[0], node_ids[1]);
            }
            this.member.type = members.TYPE_RIGID;
            this.member.rotation_angle = rotation_angle*PI/180;
            if (start_member_hinge_no > 0)
            {
                this.member.member_hinge_start = member_hinges[start_member_hinge_no];
            }
            if (end_member_hinge_no > 0)
            {
                this.member.member_hinge_end = member_hinges[end_member_hinge_no];
            }
    
            set_comment_and_parameters(this.member, comment, params);
        }
    }


Member.prototype.Rib = function (no,
                                  node_ids,
                                  start_section_no,
                                  end_section_no,
                                  start_member_hinge_no,
                                  end_member_hinge_no,
                                  comment,
                                  params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Rib member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_RIB;
        this.member.section_start = sections[start_section_no];
        if (end_section_no > 0)
        {
            this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
            this.member.section_end = sections[end_section_no];
        }
        if (start_member_hinge_no > 0)
        {
            this.member.member_hinge_start = member_hinges[start_member_hinge_no];
        }
        if (end_member_hinge_no > 0)
        {
            this.member.member_hinge_end = member_hinges[end_member_hinge_no];
        }
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.Truss = function (no,
                                  node_ids,
                                  rotation_angle,
                                  start_section_no,
                                  comment,
                                  params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Truss member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_TRUSS;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.TrussOnlyN = function (no,
                                        node_ids,
                                        rotation_angle,
                                        start_section_no,
                                        comment,
                                        params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length == 2, "Just two nodes must be set for TrussOnlyN member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_TRUSS_ONLY_N;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}

Member.prototype.Tension = function (no,
                                     node_ids,
                                     rotation_angle,
                                     start_section_no,
                                     comment,
                                     params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length == 2, "Just two nodes must be set for Tension member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_TENSION;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.Compression = function (no,
                                         node_ids,
                                         rotation_angle,
                                         start_section_no,
                                         comment,
                                         params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length == 2, "Just two nodes must be set for Compression member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_COMPRESSION;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.Buckling = function (no,
                                      node_ids,
                                      rotation_angle,
                                      start_section_no,
                                      comment,
                                      params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length == 2, "Just two nodes must be set for Buckling member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_BUCKLING;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.Cable = function (no,
                                   node_ids,
                                   rotation_angle,
                                   start_section_no,
                                   comment,
                                   params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Cable member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_CABLE;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.ResultBeam = function (no,
                                        node_ids,
                                        rotation_angle,
                                        start_section_no,
                                        end_section_no,
                                        comment,
                                        params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to ResultBeam");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_RESULT_BEAM;
        this.member.rotation_angle = rotation_angle*PI/180;
        this.member.section_start = sections[start_section_no];
        if (end_section_no > 0)
        {
            this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
            this.member.section_end = sections[end_section_no];
        }
        set_comment_and_parameters(this.member, comment, params);
    }
}



Member.prototype.DefinableStifness = function (no,
                                               node_ids,
                                               rotation_angle,
                                               member_definable_stiffness,
                                               start_member_hinge_no,
                                               end_member_hinge_no,
                                               comment,
                                               params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to DefinableStifness member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_DEFINABLE_STIFFNESS;
        this.member.rotation_angle = rotation_angle*PI/180;
        if (start_member_hinge_no > 0)
        {
            this.member.member_hinge_start = member_hinges[start_member_hinge_no];
        }
        if (end_member_hinge_no > 0)
        {
            this.member.member_hinge_end = member_hinges[end_member_hinge_no];
        }
        this.member.member_type_definable_stiffness = member_definable_stiffnesses[member_definable_stiffness]
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.CouplingRigid_Rigid = function (no,
                                                 node_ids,
                                                 rotation_angle,
                                                 comment,
                                                 params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to CouplingRigid_Rigid member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_COUPLING_RIGID_RIGID;
        this.member.rotation_angle = rotation_angle*PI/180;
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.CouplingRigid_Hinge = function (no,
                                                 node_ids,
                                                 rotation_angle,
                                                 comment,
                                                 params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to CouplingRigid_Hinge member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_COUPLING_RIGID_HINGE;
        this.member.rotation_angle = rotation_angle*PI/180;
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.CouplingHinge_Rigid = function (no,
                                                 node_ids,
                                                 rotation_angle,
                                                 comment,
                                                 params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to CouplingHinge_Rigid member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_COUPLING_HINGE_RIGID;
        this.member.rotation_angle = rotation_angle*PI/180;
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.CouplingHinge_Hinge = function (no,
                                                 node_ids,
                                                 rotation_angle,
                                                 comment,
                                                 params)
{
    if (typeof (node_ids) !== "undefined") 
    {
        node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
        rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
        ASSERT(node_ids.length > 1, "Minimum two nodes must be set to CouplingHinge_Hinge member");
        this.member;
        if (RFEM)
        {
            var line = engine.create_line(no, node_ids);
            this.member = engine.create_member(no, line);
        }
        else
        {
            this.member = engine.create_member(no, node_ids[0], node_ids[1]);
        }
        this.member.type = members.TYPE_COUPLING_HINGE_HINGE;
        this.member.rotation_angle = rotation_angle*PI/180;
        set_comment_and_parameters(this.member, comment, params);
    }
}


Member.prototype.BeamByLine = function (no,
                                        line_no,
                                        rotation_angle,
                                        start_section_no,
                                        end_section_no,
                                        start_member_hinge_no,
                                        end_member_hinge_no,
                                        comment,
                                        params)
    {
        if (typeof (line_no) !== "undefined") 
        {
            line_no = typeof line_no !== 'undefined' ? line_no : 0;
            rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
            this.member = engine.create_member(no, line_no);
            this.member.line = line_no;
            this.member.type = members.TYPE_BEAM;
            this.member.rotation_angle = rotation_angle*PI/180;
            this.member.section_start = sections[start_section_no];
            
            if (end_section_no > 0)
            {
                this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
                this.member.section_end = sections[end_section_no];
            }
            if (start_member_hinge_no > 0)
            {
                this.member.member_hinge_start = member_hinges[start_member_hinge_no];
            }
            if (end_member_hinge_no > 0)
            {
                this.member.member_hinge_end = member_hinges[end_member_hinge_no];
            }
            set_comment_and_parameters(this.member, comment, params);
        }
        
    }

    
Member.prototype.TrussByLine = function (no,
                                         line_no,
                                         rotation_angle,
                                         start_section_no,
                                         comment,
                                         params)
    {
        if (typeof (line_no) !== "undefined") 
        {
            line_no = typeof line_no !== 'undefined' ? line_no : 0;
            rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
            this.member = engine.create_member(no, line_no);
            this.member.line = line_no;
            this.member.type = members.TYPE_TRUSS;
            this.member.rotation_angle = rotation_angle*PI/180;
            this.member.section_start = sections[start_section_no];
            set_comment_and_parameters(this.member, comment, params);
        }
        
    }

    Member.prototype.CableByLine = function (no,
                                             line_no,
                                             rotation_angle,
                                             start_section_no,
                                             comment,
                                             params)
    {
        if (typeof (line_no) !== "undefined") 
        {
            line_no = typeof line_no !== 'undefined' ? line_no : 0;
            rotation_angle = typeof rotation_angle !== 'undefined' ? rotation_angle : 0.0;
            this.member = engine.create_member(no, line_no);
            this.member.line = line_no;
            this.member.type = members.TYPE_CABLE;
            this.member.rotation_angle = rotation_angle*PI/180;
            this.member.section_start = sections[start_section_no];
            set_comment_and_parameters(this.member, comment, params);
        }
        
    }
    Member.prototype.RibByLine = function (no,
                                           line_no,
                                           start_section_no,
                                           end_section_no,
                                           start_member_hinge_no,
                                           end_member_hinge_no,
                                           comment,
                                           params)
    {   
    if (typeof (line_no) !== "undefined") 
    {
        line_no = typeof line_no !== 'undefined' ? line_no : 0;
        this.member = engine.create_member(no, line_no);
        this.member.line = line_no;
        this.member.type = members.TYPE_RIB;
        this.member.section_start = sections[start_section_no];
        if (end_section_no > 0)
        {
            this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
            this.member.section_end = sections[end_section_no];
        }
        if (start_member_hinge_no > 0)
        {
            this.member.member_hinge_start = member_hinges[start_member_hinge_no];
        }
        if (end_member_hinge_no > 0)
        {
            this.member.member_hinge_end = member_hinges[end_member_hinge_no];
        }
        set_comment_and_parameters(this.member, comment, params);
    }
}