# MyPowerShellModule.psm1

function Get-Greeting {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true, Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string]$Name
    )

    try {
        "Hello, $Name!"
    }
    catch {
        Write-Error "An error occurred: $_"
    }
}

Export-ModuleMember -Function Get-Greeting
