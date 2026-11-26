$docsToConvert = @(
    "Documentacion\TechSolutions_Informe_Pruebas_Usabilidad.docx",
    "Documentacion\TechSolutions_Sustentacion_Tecnica_Final.docx",
    "Documentacion\TechSolutions_Guion_Diapositivas_Sustentacion.docx"
)

Write-Host "Iniciando conversion masiva de documentos DOCX a PDF via Word COM..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    foreach ($relDoc in $docsToConvert) {
        $docPath = [System.IO.Path]::GetFullPath($relDoc)
        $pdfPath = [System.IO.Path]::ChangeExtension($docPath, ".pdf")
        
        Write-Host "Procesando: $docPath"
        $doc = $word.Documents.Open($docPath)
        # wdExportFormatPDF = 17
        $doc.ExportAsFixedFormat($pdfPath, 17)
        $doc.Close([ref]$false)
        Write-Host "-> Generado exitosamente: $pdfPath"
    }
}
catch {
    Write-Error "Error durante la exportacion: $_"
}
finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}

Write-Host "`nVerificando archivos PDF en Documentacion:"
Get-ChildItem -Path "Documentacion\*.pdf" | Select-Object Name, Length, LastWriteTime
