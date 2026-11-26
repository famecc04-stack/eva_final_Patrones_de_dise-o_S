$docPath = [System.IO.Path]::GetFullPath("Documentacion\TechSolutions_Punto1_Definicion_Problema.docx")
$pdfPath = [System.IO.Path]::GetFullPath("Documentacion\TechSolutions_Punto1_Definicion_Problema.pdf")

Write-Host "Iniciando exportacion a PDF mediante Word COM..."
Write-Host "Origen: $docPath"
Write-Host "Destino: $pdfPath"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($docPath)
    # wdExportFormatPDF = 17
    $doc.ExportAsFixedFormat($pdfPath, 17)
    $doc.Close([ref]$false)
    Write-Host "Exportacion a PDF completada con exito."
}
catch {
    Write-Error "Error: $_"
}
finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}

if (Test-Path $pdfPath) {
    $item = Get-Item $pdfPath
    Write-Host "PDF generado: $($item.FullName)"
    Write-Host "Tamano: $($item.Length) bytes"
} else {
    Write-Error "No se encontro el archivo PDF."
}
