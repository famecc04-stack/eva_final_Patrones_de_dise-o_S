package pe.techsolutions.pyme.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

public class FinancialReportData {
    private BigDecimal facturacionBruta;
    private BigDecimal costoMercaderia;
    private BigDecimal utilidadNeta;
    private BigDecimal comisionesPasarelas;
    private Map<String, BigDecimal> margenPorCategoria;
    private LocalDateTime fechaGeneracion;
    private String generadoPor;

    public FinancialReportData(BigDecimal facturacionBruta, BigDecimal costoMercaderia, BigDecimal utilidadNeta,
                               BigDecimal comisionesPasarelas, Map<String, BigDecimal> margenPorCategoria, String generadoPor) {
        this.facturacionBruta = facturacionBruta;
        this.costoMercaderia = costoMercaderia;
        this.utilidadNeta = utilidadNeta;
        this.comisionesPasarelas = comisionesPasarelas;
        this.margenPorCategoria = margenPorCategoria;
        this.fechaGeneracion = LocalDateTime.now();
        this.generadoPor = generadoPor;
    }

    public BigDecimal getFacturacionBruta() { return facturacionBruta; }
    public BigDecimal getCostoMercaderia() { return costoMercaderia; }
    public BigDecimal getUtilidadNeta() { return utilidadNeta; }
    public BigDecimal getComisionesPasarelas() { return comisionesPasarelas; }
    public Map<String, BigDecimal> getMargenPorCategoria() { return margenPorCategoria; }
    public LocalDateTime getFechaGeneracion() { return fechaGeneracion; }
    public String getGeneradoPor() { return generadoPor; }
}
