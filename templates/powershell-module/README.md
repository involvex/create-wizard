# PowerShell Module Template

This template provides a basic structure for creating a new PowerShell module.

## Structure

-   `MyPowerShellModule.psd1`: The module manifest file.
-   `MyPowerShellModule.psm1`: The main module file containing the PowerShell code.
-   `template.json`: The metadata for the `create-wizard` tool.

## Installation

To install this module, copy the `MyPowerShellModule` directory to one of the directories in your `$env:PSModulePath`.

## Usage

Once installed, you can use the module with the following command:

```powershell
Import-Module MyPowerShellModule
Get-Greeting -Name "World"
```

## Development

To add new functions, edit the `MyPowerShellModule.psm1` file and add new `function` blocks. Remember to export any new functions using `Export-ModuleMember`.
