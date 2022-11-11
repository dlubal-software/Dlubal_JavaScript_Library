if (RFEM) {
    run("../includes/tools/clearAll.js");
    include("../includes/Tools/global.js");
    STRUCTURE_STABILITY.setActive(true);
    MATERIAL_NONLINEAR_ANALYSIS.setActive(true);


    //GEOMETRY
    var a = 3;
    var b = 3;
    var hp = 6;

    var h1 = 2;
    var a1 = 1.5;
    var b1 = 1.5;

    var a2 = 3;
    var b2 = 3;
    var h = 6;

    var t1 = 10mm;
    var t2 = 8mm;
    var t3 = 5mm;

    //LOAD CASES
    createStandardStaticAnalysisSettings();
    static_analysis_settings[2].max_number_of_iterations = 100;
    static_analysis_settings[2].number_of_load_increments = 2;

    createStandardLoadCase(1, 1, load_cases.ACTION_CATEGORY_PERMANENT_G, "Self weight");
    createStandardLoadCase(2, 2, load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_GQ, "Live load");
    createStandardLoadCase(3, 1, load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_GQ, "Stability - linear");

    //assign stability
    load_cases[3].self_weight_active = true;
    load_cases[3].calculate_critical_load = true;
    load_cases[3].stability_analysis_settings = 1;

    //STABILITY ANALYSIS
    stability_analysis_settings.erase(1);
    stability_analysis_settings.erase(2);
    createStandardStabilityAnalysisSettings();
    createStandardDesignSituation(1, design_situations.DESIGN_SITUATION_TYPE_EQU_PERMANENT_AND_TRANSIENT, "DS 1");
    stability_analysis_settings[1].number_of_lowest_eigenvalues = 20;

    //LOAD COMBINATIONS
    var LC = createStandardLoadCombination(1, 2, 1, "");
    LC.items[1].factor = 1.35;
    LC.items[1].load_case = 1;
    LC.items[2].factor = 1.5;
    LC.items[2].load_case = 2;

    //RESULT COMBINATION
    var RC = createStandardResultCombination(1, 1, "");
    RC.items[1].case_object_item = load_combinations[1];
    RC.items[1].case_object_factor = 1.0;
    RC.items[1].case_object_load_type = result_combinations.LOAD_TYPE_PERMANENT;

    //MODEL PARAMETERS
    // Material
    createStandardMaterial(1, 'S450 | EN 1993-1-1:2005-05');
    createStandardMaterial(2, 'Sand, well-graded (SW) | DIN 18196:2011-05');
    createStandardMaterial(3, 'Dry air | --');
    createStandardMaterial(4, 'S450 | EN 1993-1-1:2005-05');
    //materials[1].material_model=materials.MODEL_ISOTROPIC_PLASTIC_1D;
    materials[4].material_model = materials.MODEL_ISOTROPIC_PLASTIC_2D_3D;

    // Section
    createStandardSection(1, 1, 'IPN 300 | DIN 1025-1:1995-05; ... | ArcelorMittal (2009)');
    createStandardSection(2, 1, 'UPE 200 | DIN 1026-2:2002-10 | ArcelorMittal (2009)');
    createStandardSection(3, 1, 'MSH KHP 88.9x3.6 | DIN EN 10210-2:2006 | Vallourec und Mannesmann');
    createStandardSection(4, 1, 'MSH KHP 88.9x3.6 | DIN EN 10210-2:2006 | Vallourec und Mannesmann');
    createStandardSection(5, 1, 'LU 0.300/0.200/0.010/0.010');

    // Thicknesses
    createStandardThickness(1, 4, t1);
    createStandardThickness(2, 1, t2);
    createStandardThickness(3, 4, t3);

    //Supports
    createNodalSupport(1, '1-4', [700000, 800000, 5000000, 0, 0, 0]);

    //Hinges
    createMemberHinge(1, ["inf", "inf", "inf", 28000, 0, 0]);
    createMemberHinge(2, ["inf", "inf", "inf", 29000, 0, "inf"]);

    createNode(1, $V(0, 0, 0));       //1
    createNode(nodes.lastId() + 1, $V(a, 0, 0));
    createNode(nodes.lastId() + 1, $V(a, b, 0));
    createNode(nodes.lastId() + 1, $V(0, b, 0));

    var z = -hp / 2;
    createNode(nodes.lastId() + 1, $V(0, 0, z));       //5
    createNode(nodes.lastId() + 1, $V(a / 2, 0, z));
    createNode(nodes.lastId() + 1, $V(a, 0, z));
    createNode(nodes.lastId() + 1, $V(a, b / 2, z));
    createNode(nodes.lastId() + 1, $V(a, b, z));
    createNode(nodes.lastId() + 1, $V(a / 2, b, z));
    createNode(nodes.lastId() + 1, $V(0, b, z));
    createNode(nodes.lastId() + 1, $V(0, b / 2, z));

    z = z - hp / 2;
    createNode(nodes.lastId() + 1, $V(0, 0, z));        //13
    createNode(nodes.lastId() + 1, $V(a / 2, 0, z));
    createNode(nodes.lastId() + 1, $V(a, 0, z));
    createNode(nodes.lastId() + 1, $V(a, b / 2, z));
    createNode(nodes.lastId() + 1, $V(a, b, z));
    createNode(nodes.lastId() + 1, $V(a / 2, b, z));
    createNode(nodes.lastId() + 1, $V(0, b, z));
    createNode(nodes.lastId() + 1, $V(0, b / 2, z));

    z = z + h1;
    var center = $V(a / 2, b / 2, z);
    createNode(nodes.lastId() + 1, center.add($V(-a1 / 2, -b1 / 2, 0)));               //21
    createNode(nodes.lastId() + 1, center.add($V(a1 / 2, -b1 / 2, 0)));
    createNode(nodes.lastId() + 1, center.add($V(a1 / 2, b1 / 2, 0)));
    createNode(nodes.lastId() + 1, center.add($V(-a1 / 2, b1 / 2, 0)));

    z = -hp - h;
    center = $V(a / 2, b / 2, z);
    createNode(nodes.lastId() + 1, center.add($V(-a2 / 2, -b2 / 2, 0)));               //25
    createNode(nodes.lastId() + 1, center.add($V(a2 / 2, -b2 / 2, 0)));
    createNode(nodes.lastId() + 1, center.add($V(a2 / 2, b2 / 2, 0)));
    createNode(nodes.lastId() + 1, center.add($V(-a2 / 2, b2 / 2, 0)));

    // 1
    createMember(1, '1,5', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(2, '2,7', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(3, '3,9', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(4, '4,11', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });

    createMember(5, '5,13', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(6, '7,15', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(7, '9,17', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(8, '11,19', { section_start: 1, member_hinge_start: 1, member_hinge_end: 2 });

    // 2
    createMember(9, '13, 14', { section_start: 2 });
    createMember(10, '14, 15', { section_start: 2 });
    createMember(11, '15, 16', { section_start: 2 });
    createMember(12, '16, 17', { section_start: 2 });

    createMember(13, '17, 18', { section_start: 2 });
    createMember(14, '18, 19', { section_start: 2 });
    createMember(15, '19, 20', { section_start: 2 });
    createMember(16, '20, 13', { section_start: 2 });

    // 3
    createMember(17, '1, 6', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(18, '2, 6', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(19, '2, 8', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(20, '3, 8', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });

    createMember(21, '3, 10', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(22, '4, 10', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(23, '4, 12', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(24, '1, 12', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });

    createMember(25, '5, 14', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(26, '7, 14', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(27, '7, 16', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(28, '9, 16', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });

    createMember(29, '9, 18', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(30, '11, 18', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(31, '11, 20', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });
    createMember(32, '5, 20', { section_start: 3, member_hinge_start: 1, member_hinge_end: 2 });


    // 4
    createMember(33, '5, 6', { section_start: 4, member_hinge_start: 1 });
    createMember(34, '6, 7', { section_start: 4, member_hinge_end: 2 });
    createMember(35, '7, 8', { section_start: 4, member_hinge_start: 1 });
    createMember(36, '8, 9', { section_start: 4, member_hinge_end: 2 });

    createMember(37, '9, 10', { section_start: 4, member_hinge_start: 1 });
    createMember(38, '10, 11', { section_start: 4, member_hinge_end: 2 });
    createMember(39, '11, 12', { section_start: 4, member_hinge_start: 1 });
    createMember(40, '12, 5', { section_start: 4, member_hinge_end: 2 });

    // Others
    createLine(41, '21, 22');         // 41
    createLine(lines.lastId() + 1, '22, 23');
    createLine(lines.lastId() + 1, '23, 24');
    createLine(lines.lastId() + 1, '24, 21');

    createLine(lines.lastId() + 1, '13, 21');         // 45
    createLine(lines.lastId() + 1, '15, 22');
    createLine(lines.lastId() + 1, '17, 23');
    createLine(lines.lastId() + 1, '19, 24');

    createLine(lines.lastId() + 1, '13, 25');         // 49
    createLine(lines.lastId() + 1, '15, 26');
    createLine(lines.lastId() + 1, '17, 27');
    createLine(lines.lastId() + 1, '19, 28');

    createLine(lines.lastId() + 1, '25, 26');         // 53
    createLine(lines.lastId() + 1, '26, 27');
    createLine(lines.lastId() + 1, '27, 28');
    createLine(lines.lastId() + 1, '28, 25');

    createMember(members.lastId() + 1, '', { section_start: 5, line: 49, rotation_angle: 90deg });
    createMember(members.lastId() + 1, '', { section_start: 5, line: 50, rotation_angle: 0deg });
    createMember(members.lastId() + 1, '', { section_start: 5, line: 51, rotation_angle: -90deg });
    createMember(members.lastId() + 1, '', { section_start: 5, line: 52, rotation_angle: 180deg });


    createSurface(1, '41, 42, 43, 44', { type: surfaces.TYPE_STANDARD, thickness: 2 });

    createSurface(surfaces.lastId() + 1, '45, 41, 46, 10, 9', { type: surfaces.TYPE_STANDARD, thickness: 1 });
    createSurface(surfaces.lastId() + 1, '46, 42, 47, 11, 12', { type: surfaces.TYPE_STANDARD, thickness: 1 });
    createSurface(surfaces.lastId() + 1, '47, 43, 48, 14, 13', { type: surfaces.TYPE_STANDARD, thickness: 1 });
    createSurface(surfaces.lastId() + 1, '48, 44, 45, 16, 15', { type: surfaces.TYPE_STANDARD, thickness: 1 });

    createSurface(surfaces.lastId() + 1, '9, 10, 50, 53, 49', { type: surfaces.TYPE_STANDARD, thickness: 2 });
    createSurface(surfaces.lastId() + 1, '11, 12, 51, 54, 50', { type: surfaces.TYPE_STANDARD, thickness: 2 });
    createSurface(surfaces.lastId() + 1, '13, 14, 52, 55, 51', { type: surfaces.TYPE_STANDARD, thickness: 2 });
    createSurface(surfaces.lastId() + 1, '15, 16, 49, 56, 52', { type: surfaces.TYPE_STANDARD, thickness: 2 });

    createSurface(surfaces.lastId() + 1, '9-16');
    createSurface(surfaces.lastId() + 1, '53-56', { thickness: 3 });

    createSolid(solids.lastId() + 1, '1-5,10', { material: 2 });
    //createSolid(solids.lastId() + 1, '6-9,10,11',{material: 3,type: solids.TYPE_GAS, gas: 1});
    //createSolidGas(1, 1200, 120);

    members[9].type = members.TYPE_RIB;
    members[9].member_rib_surface_assignment_autodetect = false;
    members[9].member_rib_first_surface = "6";
    members[9].member_rib_second_surface = "--";

    members[10].type = members.TYPE_RIB;
    members[10].member_rib_surface_assignment_autodetect = false;
    members[10].member_rib_first_surface = "6";
    members[10].member_rib_second_surface = "--";

    members[11].type = members.TYPE_RIB;
    members[11].member_rib_surface_assignment_autodetect = false;
    members[11].member_rib_first_surface = "7";
    members[11].member_rib_second_surface = "--";

    members[12].type = members.TYPE_RIB;
    members[12].member_rib_surface_assignment_autodetect = false;
    members[12].member_rib_first_surface = "7";
    members[12].member_rib_second_surface = "--";

    members[13].type = members.TYPE_RIB;
    members[13].member_rib_surface_assignment_autodetect = false;
    members[13].member_rib_first_surface = "8";
    members[13].member_rib_second_surface = "--";

    members[14].type = members.TYPE_RIB;
    members[14].member_rib_surface_assignment_autodetect = false;
    members[14].member_rib_first_surface = "8";
    members[14].member_rib_second_surface = "--";

    members[15].type = members.TYPE_RIB;
    members[15].member_rib_surface_assignment_autodetect = false;
    members[15].member_rib_first_surface = "9";
    members[15].member_rib_second_surface = "--";

    members[16].type = members.TYPE_RIB;
    members[16].member_rib_surface_assignment_autodetect = false;
    members[16].member_rib_first_surface = "9";
    members[16].member_rib_second_surface = "--";
}
