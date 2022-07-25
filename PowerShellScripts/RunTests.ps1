function Get-Application-Version {
    $Body = '<x:Envelope
xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:rfe="http://www.dlubal.com/rfem.xsd">
<x:Header/>
<x:Body>
    <rfe:get_information></rfe:get_information>
</x:Body>
</x:Envelope>'
    $Response = Invoke-WebRequest -Credential $Credential -Uri http://localhost:8081 -Headers (@{SOAPAction = 'Read' }) -Method Post -Body $Body -ContentType application/xml
    # $Response.Content
    [xml]$bn = ([xml]$Response.Content)
    $ApplicationType = $bn.GetElementsByTagName("type").innertext;
    $ApplicationVersion = $bn.GetElementsByTagName("version").innertext;
    $ApplicationLanguage = $bn.GetElementsByTagName("language_name").innertext;
    Write-Host "Runnig" $ApplicationType $ApplicationVersion $ApplicationLanguage
}

function Reset-Model {
    param (
        $ModelUrl
    )
    $Reset = '<x:Envelope
xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:rfe="http://www.dlubal.com/rfem.xsd">
<x:Header/>
<x:Body>
<rfe:reset></rfe:reset>
</x:Body>
</x:Envelope>'
    $ResponseTests = Invoke-WebRequest -Credential $Credential -Uri $ModelUrl -Headers (@{SOAPAction = 'Read' }) -Method Post -Body $Reset -ContentType application/xml
}

function Create-New-Model {
    param (
        $ModelName
    )
    $BodyNewModel = '<x:Envelope
    xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:rfe="http://www.dlubal.com/rfem.xsd">
    <x:Header/>
    <x:Body>
        <rfe:new_model>
            <rfe:model_name>'+ $ModelName + '</rfe:model_name>
        </rfe:new_model>
    </x:Body>
</x:Envelope>'


    $ResponseNewModel = Invoke-WebRequest -Credential $Credential -Uri http://localhost:8081 -Headers (@{SOAPAction = 'Read' }) -Method Post -Body $BodyNewModel -ContentType application/xml
    # $StatusCode = $ResponseNewModel.StatusCode
    # $StatusCode
    # $ResponseNewModel.Content
    [xml]$bn = ([xml]$ResponseNewModel.Content)
    $modelURL = $bn.GetElementsByTagName("value").innertext;
    Write-Output $ModelURL
}

function Run-Script {
  
    param (
        [Parameter(Mandatory = $true, Position = 0)]    
        [System.Uri]$ModelURL,
        [Parameter(Mandatory = $true, Position = 1)]
        [string[]]$Script
    )


    $RunScript = '<x:Envelope
xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:rfe="http://www.dlubal.com/rfem.xsd">
<x:Header/>
<x:Body>
    <rfe:run_script>
        <rfe:script_file_path>' + $Script + '</rfe:script_file_path>
    </rfe:run_script>
</x:Body>
</x:Envelope>'

    $ResponseTests = Invoke-WebRequest -Credential $Credential -Uri $ModelURL -Headers (@{SOAPAction = 'Read' }) -Method Post -Body $RunScript -ContentType application/xml
    $StatusCode = $ResponseTests.StatusCode
    $StatusCode 
}

function Close-Model {
    param (
        [Parameter(Mandatory = $true, Position = 0)]    
        [System.Uri]$ModelId,
        [Parameter(Mandatory = $true, Position = 1)]
        [bool]$Save
    )
    $Body = '<x:Envelope
    xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:rfe="http://www.dlubal.com/rfem.xsd">
    <x:Header/>
    <x:Body>
        <rfe:close_model>
            <rfe:index>'+ $ModelId + '</rfe:index>
            <rfe:save_changes>'+ $Save.ToString() + '</rfe:save_changes>
        </rfe:close_model>
    </x:Body>
</x:Envelope>'
    $ResponseTests = Invoke-WebRequest -Credential $Credential -Uri http://localhost:8081 -Headers (@{SOAPAction = 'Read' }) -Method Post -Body $Body -ContentType application/xml
    $StatusCode = $ResponseTests.StatusCode
    $StatusCode 
}
Get-Application-Version
$modelURL = Create-New-Model "Testing"
$modelURL 
Run-Script $modelURL "D:\Sources\Dlubal_JavaScript_Library\examples\01_simple_beam.js"
Reset-Model $modelURL
Close-Model 0 $false


