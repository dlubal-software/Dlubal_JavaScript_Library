---
title: Node
---

# Node

<a name="Node"></a>

## Node
**Kind**: global class  

* [Node](#Node)
    * [new Node(no, coordinate_X, coordinate_Y, coordinate_Z, comment, params)](#new_Node_new)
    * [.Standard(no, coordinates, coordinate_system_type, comment, params)](#Node+Standard)
    * [.BetweenTwoNodes(no, start_node_no, end_node_no, node_reference, parameters, offset_y, offset_z, comment, params)](#Node+BetweenTwoNodes)
    * [.BetweenTwoPoints(no, start_point, end_point, node_reference, parameters, offset_y, offset_z, comment, params)](#Node+BetweenTwoPoints)
    * [.OnLine(no, line_number, node_reference, parameters, comment, params)](#Node+OnLine)
    * [.OnMember(no, member_number, node_reference, parameters, comment, params)](#Node+OnMember)

<a name="new_Node_new"></a>

### new Node(no, coordinate_X, coordinate_Y, coordinate_Z, comment, params)
Create Node

**Returns**: node  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Node |
| coordinate_X | <code>number</code> | Coordinate X |
| coordinate_Y | <code>number</code> | Coordinate Y |
| coordinate_Z | <code>number</code> | Coordinate Z |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

<a name="Node+Standard"></a>

### node.Standard(no, coordinates, coordinate_system_type, comment, params)
Create Standard node

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Node |
| coordinates | <code>array</code> | Coordinate of node in format [x, y, z] |
| coordinate_system_type | <code>string</code> | Type of Coordinate System |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

<a name="Node+BetweenTwoNodes"></a>

### node.BetweenTwoNodes(no, start_node_no, end_node_no, node_reference, parameters, offset_y, offset_z, comment, params)
Create Node between two nodes

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Node |
| start_node_no | <code>int</code> | Number of start node |
| end_node_no | <code>int</code> | Number of end node |
| node_reference | <code>string</code> | Node Reference |
| parameters | <code>array</code> | List of parameters of node |
| offset_y | <code>number</code> | Offset in Y direction |
| offset_z | <code>number</code> | Offset in Z direction |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

<a name="Node+BetweenTwoPoints"></a>

### node.BetweenTwoPoints(no, start_point, end_point, node_reference, parameters, offset_y, offset_z, comment, params)
Create Node between two points

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Node |
| start_point | <code>array</code> | Coordinate of start point in format [x, y, z] |
| end_point | <code>array</code> | Coordinate of end point in format [x, y, z] |
| node_reference | <code>string</code> | Node Reference |
| parameters | <code>array</code> | List of parameters of node |
| offset_y | <code>number</code> | Offset in Y direction |
| offset_z | <code>number</code> | Offset in Z direction |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

<a name="Node+OnLine"></a>

### node.OnLine(no, line_number, node_reference, parameters, comment, params)
Create Node On Line

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of the Node |
| line_number | <code>int</code> | Number of the Line |
| node_reference | <code>string</code> | Node Reference |
| parameters | <code>array</code> | List of parameters of node |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

<a name="Node+OnMember"></a>

### node.OnMember(no, member_number, node_reference, parameters, comment, params)
Create Node on Member

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of the Node |
| member_number | <code>int</code> | Number of member |
| node_reference | <code>string</code> | Node Reference |
| parameters | <code>array</code> | List of parameters of node |
| comment | <code>string</code> | Comment for the Node |
| params | <code>dictionary</code> | Parameters of the Node |

