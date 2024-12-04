# List of ports to kill
$ports = @(3000, 3001, 5001, 5002, 5003, 5004)

Write-Output "Killing processes running on ports: $($ports -join ', ')"

foreach ($port in $ports) {
    # Find the process using the port
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

    if ($process) {
        $piid = $process.OwningProcess
        Write-Output "Killing process $piid on port $port..."
        
        Stop-Process -Id $piid -Force
        Write-Output "Successfully killed process $piid on port $port."
    } else {
        Write-Output "No process found on port $port."
    }
}

Write-Output "All specified ports have been processed."
