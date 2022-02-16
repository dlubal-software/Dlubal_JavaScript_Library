// ToDo - make it work
Function Get-Folder($initialDirectory="")
{
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms")|Out-Null

    $foldername = New-Object System.Windows.Forms.FolderBrowserDialog 
    $foldername.Description = "Please enter path to RFEM installation, where you want to copy library"
    $foldername.rootfolder = "MyComputer"
    $foldername.SelectedPath = $initialDirectory

    $result = $foldername.ShowDialog((New-Object System.Windows.Forms.Form -Property @{TopMost = $true }))
    if ($result -eq [Windows.Forms.DialogResult]::OK){
        $folder += $foldername.SelectedPath
    }
    else {
        exit
    }
    return $folder
}

$PathToRFEM = Get-Folder
Write-Output "You have selected: $PathToRFEM"

$PathToRFEMExe = $PathToRFEM + "\\bin\\"
$AppExe = ".\RFEM6.exe"
$ArgumentsList = "--prerelease-mode --dev-mode --dbg-solver --DEV-branch-name-in-title --start-soap-server 8081"
Write-Output $PathToRFEMExe
Start-Process -WorkingDirectory $PathToRFEMExe $AppExe -ArgumentList $ArgumentsList

# $uncovered="actionCombinations,actions"
# $crash="constructionStages,loadCasesTimeHistory,loadCasesWindSimulation,memberSetLoads,sectionCostEstimation,sectionEmissionEstimation"
# $asserts="cutLines,cuttingPatterns,freePolygonLoads,imperfectionCases,lineLoads,materialCostEstimation,materialEmissionsEstimation,materials,memberLoads,members,memberTransverseStiffener,resultSection,surfaceLoads,surfaceSetLoads,soilMassifs,timberDesign,slsConfigurations,soilSamples,steelJoints"
# $rw="memberConfigurations,aluminumDesign,combinationWizard,concreteDesign,coordinateSystems,designSupports,dimensions,enlargedColumnHead,freeCircularLoads,freeConcentratedLoads,freeLineLoads,freeRectangularLoads,imposedLineDeformations,imposedNodalDeformations,joints,lineGrids,lineSetLoads,lines,lineWeldedJoints,loadCases,memberEccentricities,memberLoadsFromAreaLoads,memberNonlinearities,memberResultIntermediatePoints,memberSection,memberSets,memberStiffnessModifications,nodalLoads,nodalSupportsDiagram,nodalSupports,nodes,notes,openingLoads,reinforcementDirections,resultCombinations,rigidLink,sections,snowLoadWizards,solidContacts,solidLoads,solidSetLoads,solids,staticAnalysisSettings,steelDesign,stressStrainAnalysis,surfaceReinforcements,surfaceResultsAdjustments,surfacesContacts,surfaces,thicknesses,windLoadWizards,points,rsectionElements,rsectionGeneral,rsectionInternalForces,rsectionOpenings,rsectionParts,rsectionStressPoints,rsectionSubpanels,components,jointSymmetry,steelJointsCalc,steelJointsHall"

#.\DotNetClientTest.exe -url='http://localhost:8081/' -definitions='.\Data\TestMethods.txt' -scripts='..\..\..\RFEM-TestingVersions\master_JavaScriptPlay\scripts\examples\tests\'

$PathToClinetTest = Get-Folder
Write-Output "You have selected: $PathToClinetTest"
$PathToClinetTestExe = $PathToClinetTest + "\\testingTool\\"
$Definitions = $PathToClinetTestExe + "Data\\TestMethods.txt"
$ScriptPath = $PathToRFEM + "\\scripts\\examples\tests"

$DotNetClientTest = ".\DotNetClientTest.exe"
$url = 'http://localhost:8081/'
$ArgumentsList = "-url="+ $url  +" -definitions=" + $Definitions + " -scripts=" + $ScriptPath  #-skipScripts=$uncovered + "," + $crash + "," + $asserts + "," + $rw
Start-Process -WorkingDirectory $PathToClinetTest $DotNetClientTest -ArgumentList $ArgumentsList