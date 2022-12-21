# Dynamic Blocks in RFEM 6 (via JavaScript)
Structures in RFEM 6 can be saved as blocks and reused in other RFEM files. The advantage of dynamic blocks with respect to non-dynamic blocks is that they allow interactive modifications of the structural parameters as a result of modified input variables. One example is the possibility to add structural elements by changing only the number of bays as an input variable. This article will demonstrate the aforementioned possibility for dynamic blocks that are created by scripting.

## The JavaScript File
In theory, a web service can be created with any programming language. In this article, the programming environment is JavaScript. As a matter of fact, scripting can be used to define the topology of the structure, the load cases, and the loads. To create script files, it is enough to have an editor such as the one used in this article (Notepad ++).

In the JavaScript file provided in this example, the input parameters are defined with the input_data() function. These parameters can be assigned in different categories (basic data, geometry, supports, sections, etc.). In terms of basic data, parameter "n" is defined as the type "integer" (using the parameter_int() function) in order to allow dynamic generation of the number of bays. In the “Geometry” category, on the other hand, the parameter_float() function is used for the creation of the frame span (a), the height of the column (H_1), the height of the roof (H_2), and the bay length (L). As can be seen in Image 1, parameter “L” (Bay length) is created dynamically by the multiplicity counter kn, which was defined earlier.

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028849.png?la=en-US&mlid=B25C960B9A624D7E99FD13B4A5A1D1E2&hash=A20BF9845295D3ED95691880494C05F35EEBCB39)

Next, the variables defined as input data can be employed by the generate() function to generate the block; that is, to create nodes and members, assign supports to nodes, create coordinate systems, and create dimensions. This is shown in Image 2, and it can be further explored in the script provided at the end of the article.

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028850.png?la=en-US&mlid=557D722524D243C4B2B1B3E3972D2AE3&hash=23F01AF4937C56055B1F9DA1326B0B4688A27CFE)

It is to be noted that all available objects and attributes can be found in the Console (View → Console). As Image 3 shows, the objects and their properties can be displayed through the icon indicated in the image.

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028851.png?la=en-US&mlid=38234A32F5634896B806EE12C3155415&hash=E927D331F6BF2F1B82D6E6C7BA683112D33FAB06)

Although not used in this example, the global_parameters() function can also be adopted in the script. This function serves to parameterize the block, as discussed in the Knowledge Base article Parameterized Models as Blocks in RFEM 6.

## Saving the Model as a Block
The block created in this manner can be saved as discussed in the Knowledge Base article Saving Models as Blocks in RFEM 6 (File → Save as Block). However, the difference now is that the JavaScript file has to be imported in the Save as Block window (Image 4).

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028852.png?la=en-US&mlid=8294DF4B9A9E4DEE8B481EAC8ED27B14&hash=5CA34728434F9BF5D21BBC92A474C108FC459166)

Once the block has been saved, it can be imported easily into any RFEM 6 file. For this purpose, it is necessary to open Dlubal Center | Blocks and select the block from the relevant category. Prior to being inserted, the block can be modified in the Edit Blocks window. For dynamic blocks created by scripting, the input parameters can be modified in the Structure tab of this window.

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028853.png?la=en-US&mlid=B66768C17C274F389E5B06C559CE6221&hash=EDA9222618C1DB51EA24CECE9F852EE5B93A7C27)

As mentioned above, the advantage of dynamic blocks is the possibility to introduce modifications by changing the input variables. Thus, given the manner in which the number of bays (n) and the bay length (L) have been defined in the script, the latter will change automatically when the former are changed. In this example, the predefined number of bays is three and, therefore, three bay lengths are listed as parameters (Image 5). However, the variable “n” can be easily changed into any other number (for example, five), and the structure will be modified accordingly (Image 6).

![](https://www.dlubal.com/-/media/Images/website/img/020001-030000/028801-028900/028854.png?la=en-US&mlid=DA9EBAC249444584B38B5DE556A5EDD6&hash=A4D3ACB245D35EC1825E5A17A9C82605555E5BDB)

## Final Remarks
Dynamic blocks in RFEM 6 can be created easily by scripting. To create script files, it is sufficient to have a script editor. At this point, parameters can be created dynamically in the script, thus allowing interactive modification of the block afterwards.

The blocks created in this manner can be saved by importing the JavaScript file in the “Save as Block” window. Once available in Dlubal Center | Blocks, they can be imported easily into any RFEM 6 file. Since the blocks are dynamic, interactive modifications of structural parameters as a result of modified input variables are possible each time the blocks are used in an RFEM file.

::: tip Note
Originaly published as [knowledge base article](https://www.dlubal.com/en-US/support-and-learning/support/knowledge-base/001689)
:::