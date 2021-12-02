Function Get-Folder($initialDirectory="")
{
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms")|Out-Null

    $foldername = New-Object System.Windows.Forms.FolderBrowserDialog
    $foldername.Description = "Please enter path to RFEM installation, where you want to copy library"
    $foldername.rootfolder = "MyComputer"
    $foldername.SelectedPath = $initialDirectory

    if($foldername.ShowDialog() -eq "OK")
    {
        $folder += $foldername.SelectedPath
    }
    return $folder
}

$PathToRFEM = Get-Folder
Write-Output "You have selected: $PathToRFEM"
$PathToRFEMScriptsInclude = $PathToRFEM + "\\scripts\\includes\"
$PathToRFEMExamples = $PathToRFEM + "\\scripts\\examples\"
# try
# {
#     Remove-Item PathToRFEMScriptsInclude+"*.*" -Force -Recurse -ErrorAction SilentlyContinue
# }
# catch
# {
#     Write-Host "Deleting"  $PathToRFEMScriptsInclude "Failure"
# }
# try
# {
#     Remove-Item PathToRFEMExamples+"*.*" -Force -Recurse -ErrorAction SilentlyContinue
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

Write-Output "Copying done"
