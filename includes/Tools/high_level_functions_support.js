/**********************************************************************************************
********************************** Support functions for examples******************************
**********************************************************************************************/

function createMaterial(name)
{
	var material = materials.create();
	material.name = name;
	return material;
}

function createSection(material, databaseName)
{
	var section = sections.create();
	section.material = material.no;
	section.name = databaseName;
	return section;
}

function createNode(x, y, z)
{
	var node = nodes.create();
	node.coordinates = $V(x, y, z);
	return node;
}

function createNode2(coordinations)
{
	ASSERT(coordinations.length == 3);
	return createNode(coordinations[0], coordinations[1], coordinations[2]);
}

function createLine(startNode, endNode)
{
	var line = lines.create();
	line.definition_nodes = [startNode, endNode];
	return line;
}

function createThickness(thick, material, type)
{
	var thickness = thicknesses.create();
	thickness.type = type;
	thickness.material = material;
	thickness.uniform_thickness = thick;
	return thickness;
}

function createSurface(boundaryLines, surfaceType, surfaceThickness)
{
	var surface = surfaces.create();
	surface.boundary_lines = boundaryLines;
	surface.type = surfaceType;
	if (surfaceType==surfaces.TYPE_STANDARD)
	{
		surface.thickness = surfaceThickness;
	}
	return surface;
}

function createMember(nodes, section, memberType, line)
{
	if (RFEM)
    {
		if (typeof line == "undefined")
        {
			var line = lines.create();
			line.definition_nodes = nodes;
		}
    }

	var member =  members.create();

	if (RFEM)
    {
        member.line = line;
    }
    else
    {
        member.node_start = nodes[0];
        member.node_end = nodes[nodes.length - 1];
    }

	member.type = memberType;
	member.section_start = section;

    return member;
}

function createNodesGrid(x, y, gridSize, gridSpace)
{
	var nodes = [];
	for (var i = 0; i < gridSize[1]; ++i)
	{
		for (var j = 0; j < gridSize[0]; ++j)
		{
			nodes.push(createNode(x + gridSpace[0] * j, y + gridSpace[1] * i, 0.000));
		}
	}
	return nodes;
}

/*
Returns array (dictionary):
	key = surface no
	value =
		[0] - surfaces object
		[1] - list of surface nodes
	surfaceGridSize = [3, 2]
	surfaceGridSpace = [5, 5] (this value is same for surface weight and height)
	surfaceNodes (nodes in picture)

	 nodes[1]	nodes[0]	nodes[5]	nodes[4]	nodes[9]	nodes[8]
		x-----------x			x-----------x			x-----------x
		|			|			|			|			|			|
		|			|			|			|			|			|
		|	  S1	|			|	  S2	|			|	  S3	|
		|			|			|			|			|			|
		|			|			|			|			|			|
		x-----------x			x-----------x			x-----------x
	 nodes[2]	nodes[3]	nodes[6]	nodes[7]	nodes[10]	nodes[11]

		x-----------x			x-----------x			x-----------x
		|			|			|			|			|			|
		|			|			|			|			|			|
		|	  S1	|			|	  S2	|			|	  S3	|
		|			|			|			|			|			|
		|			|			|			|			|			|
		x-----------x			x-----------x			x-----------x
*/
function createSurfacesFromNodesGrid(nodes, surfaceGridSize, surfaceType, surfaceThickness)
{
	var boundaryLines = [];
	var surfacesCount = surfaceGridSize[0] * surfaceGridSize[1];
	var moveToNode = 0;
	var surfaceNodes = [];

	for (var i = 0; i < surfacesCount; ++i)
	{
		surfaceNodes.push(nodes[i * 2 + 1 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + surfaceGridSize[0] * 2 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + surfaceGridSize[0] * 2 + 1 + moveToNode]);
		boundaryLines.push(createLine(surfaceNodes[i * 4], surfaceNodes[i * 4 + 1]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 1], surfaceNodes[i * 4 + 2]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 2], surfaceNodes[i * 4 + 3]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 3], surfaceNodes[i * 4]));

		if ((i + 1) % surfaceGridSize[0] == 0)
		{
			moveToNode += surfaceGridSize[0] * 2;
		}
	}

	var surfaceList = {};
	var surfsNodes = {};

	for (var i = 0; i < surfacesCount; ++i)
	{
		var lines = boundaryLines.slice(i * 4, i * 4 + 4);
		var surface = createSurface([lines[0].no, lines[1].no, lines[2].no, lines[3].no], surfaceType, surfaceThickness);
		surfaceList[surface.no] = [surface, surfaceNodes.slice(i * 4, i * 4 + 4)];
	}

	return surfaceList;
}

function createMembersFromNodesGrid(nodes, memberGridSize, memberType, section)
{
	var membersCount = memberGridSize[0] * memberGridSize[1];
	var moveToNode = 0;
	var memberList = [];

	for (var i = 0; i < membersCount; ++i)
	{
		memberList.push(createMember([nodes[i + moveToNode], nodes[i + moveToNode + 1]], section, memberType));
		moveToNode += 1;
	}

	return memberList;
}

function createLinesFromNodesGrid(nodes, lineGridSize)
{
	var linesCount = lineGridSize[0] * lineGridSize[1];
	var moveToNode = 0;
	var linesList = [];

	for (var i = 0; i < linesCount; ++i)
	{
		linesList.push(createLine(nodes[i + moveToNode], nodes[i + moveToNode + 1]));
		moveToNode += 1;
	}

	return linesList;
}

// Function to change node's z-coordinates
function modifyNodesToZCoord(nodes, nodeIndexes, z)
{
	for (var i = 0; i < nodeIndexes.length; ++i)
	{
		nodes[nodeIndexes[i][0]].coordinates = $V(nodes[nodeIndexes[i][0]].global_coordinate_1, nodes[nodeIndexes[i][0]].global_coordinate_2, z);
		nodes[nodeIndexes[i][1]].coordinates = $V(nodes[nodeIndexes[i][1]].global_coordinate_1, nodes[nodeIndexes[i][1]].global_coordinate_2, z);
	}
}

function makeSolid(boundaryNodes)
{
	var material = createMaterial("S235");
	var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);

	var node1 = createNode2(boundaryNodes[0]);
	var node2 = createNode2(boundaryNodes[1]);
	var node3 = createNode2(boundaryNodes[2]);
	var node4 = createNode2(boundaryNodes[3]);
	var node5 = createNode2(boundaryNodes[4]);
	var node6 = createNode2(boundaryNodes[5]);
	var node7 = createNode2(boundaryNodes[6]);
	var node8 = createNode2(boundaryNodes[7]);

	var solidLines = [
		// Bottom cap
		createLine(node1.no, node2.no).no,	// line1
		createLine(node2.no, node3.no).no,	// line2
		createLine(node3.no, node4.no).no,	// line3
		createLine(node4.no, node1.no).no, 	// line4
		// Top cap
		createLine(node5.no, node6.no).no,	// line5
		createLine(node6.no, node7.no).no,	// line6
		createLine(node7.no, node8.no).no,	// line7
		createLine(node8.no, node5.no).no,	// line8
		// Corner lines
		createLine(node1.no, node5.no).no,	// line9
		createLine(node2.no, node6.no).no,	// line10
		createLine(node3.no, node7.no).no,	// line11
		createLine(node4.no, node8.no).no	// line12
	];

	var solidSurfaces = [
		createSurface([solidLines[0], solidLines[1], solidLines[2], solidLines[3]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[4], solidLines[5], solidLines[6], solidLines[7]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[0], solidLines[8], solidLines[4], solidLines[9]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[1], solidLines[9], solidLines[5], solidLines[10]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[2], solidLines[10], solidLines[6], solidLines[11]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[3], solidLines[8], solidLines[7], solidLines[11]], surfaces.TYPE_STANDARD, thickness)
	];

	var solid = solids.create();
	solid.boundary_surfaces = solidSurfaces;
	solid.type = solids.TYPE_STANDARD;
	solid.material = createMaterial("C25/30");

	return solid;
}
