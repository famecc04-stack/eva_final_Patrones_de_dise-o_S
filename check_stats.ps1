$docPath = [System.IO.Path]::GetFullPath("Documentacion\TechSolutions_Punto1_Definicion_Problema.docx")
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($docPath)
    $pages = $doc.ComputeStatistics(2)
    $words = $doc.ComputeStatistics(0)
    $doc.Close([ref]$false)
    Write-Host "Total Paginas en Word: $pages"
    Write-Host "Total Palabras: $words"
} finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
