Function Get-Folder($initialDirectory="")
{
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms")|Out-Null

    $foldername = New-Object System.Windows.Forms.FolderBrowserDialog
    $foldername.Description = "Please enter path to repository, from you want to copy library"
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

$PathToRepo = Get-Folder
Write-Output "You have selected: $PathToRepo"
$PathToRFEMScriptsInclude = $PathToRepo + "\\scripts\\includes\"
$PathToRFEMExamples = $PathToRepo + "\\scripts\\examples\"
$PathToRSECTIONExamples = $PathToRepo + "\\scripts\\examplesRSection\"
$CurrentDir = Get-Location

try
{
    Copy-Item -Path $PathToRFEMExamples -Recurse  -Destination .\ -PassThru -Force -errorAction stop
    Write-Host  "Coping"  $PathToRFEMExamples  "done"
}
catch
{
    Write-Host "Coping"  $PathToRFEMExamples "Failure"
}
try
{
    Copy-Item -Path $PathToRFEMScriptsInclude -Recurse  -Destination .\  -PassThru -Force -errorAction stop
    Write-Host  "Coping" $PathToRFEMScriptsInclude "done"
}
catch
{
    Write-Host "Coping"  $PathToRFEMScriptsInclude "Failure"
}
try
{
    Copy-Item -Path $PathToRSECTIONExamples -Recurse  -Destination .\ -PassThru -Force -errorAction stop
    Write-Host  "Coping" $PathToRSECTIONExamples "done"
}
catch
{
    Write-Host "Coping"  $PathToRSECTIONExamples "Failure"
}
Write-Output "Copying done"