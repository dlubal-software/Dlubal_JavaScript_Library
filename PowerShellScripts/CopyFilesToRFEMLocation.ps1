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
$PathToRFEMScriptsInclude = $PathToRFEM + "\\scripts\\includes\"
$PathToRFEMExamples = $PathToRFEM + "\\scripts\\examples\"
$PathToRSECTIONExamples = $PathToRFEM + "\\scripts\\examplesRSection\"
# try
# {
#    Remove-Item PathToRFEMScriptsInclude+"*.*" -Force -Recurse -ErrorAction
# }
# catch
# {
#     Write-Host "Deleting"  $PathToRFEMScriptsInclude "Failure"
# }
# try
# {
#     Remove-Item PathToRFEMExamples+"*.*" -Force -Recurse -ErrorAction
# }
# catch
# {
#     Write-Host "Deleting"  $PathToRFEMExamples "Failure"
# }

try
{
    Copy-Item -Path .\examples\* -Recurse  -Destination $PathToRFEMExamples -PassThru -Force -errorAction stop
    Write-Host  "Coping"  $PathToRFEMExamples  "done"
}
catch
{
    Write-Host "Coping"  $PathToRFEMExamples "Failure"
}
try
{
    Copy-Item -Path .\includes\* -Recurse  -Destination $PathToRFEMScriptsInclude -PassThru -Force -errorAction stop
    Write-Host  "Coping" $PathToRFEMScriptsInclude "done"
}
catch
{
    Write-Host "Coping"  $PathToRFEMScriptsInclude "Failure"
}
try
{
    Copy-Item -Path .\examplesRSection\* -Recurse  -Destination $PathToRSECTIONExamples -PassThru -Force -errorAction stop
    Write-Host  "Coping" $PathToRSECTIONExamples "done"
}
catch
{
    Write-Host "Coping"  $PathToRSECTIONExamples "Failure"
}



Write-Output "Copying done"

$PathToRFEMExe = $PathToRFEM + "\\bin\\"
 $AppExe = ".\RFEM6.exe"
# $AppExe = ".\RSTAB9.exe"
# $AppExe = ".\RSECTION.exe"
$ArgumentsList = "--prerelease-mode --dev-mode --dbg-solver --DEV-branch-name-in-title"
Write-Output $PathToRFEMExe
Start-Process -WorkingDirectory $PathToRFEMExe $AppExe -ArgumentList $ArgumentsList
