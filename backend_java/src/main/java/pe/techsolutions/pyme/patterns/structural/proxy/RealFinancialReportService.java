package pe.techsolutions.pyme.patterns.structural.proxy;

import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.User;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Real Subject: Servicio costoso que genera calculos financieros pesados y accede a BD.
 */
public class RealFinancialReportService implements FinancialReportService {

    public RealFinancialReportService() {
        // Simula inicializacion pesada de conexiones y modelos analiticos
        System.out.println("[RealFinancialReportService] Inicializando servicio pesado y conexiones analiticas...");
    }

    @Override
    public FinancialReportData generateReport(User user, int month, int year) {
        System.out.println("[RealFinancialReportService] Ejecutando calculo consolidado real para mes " + month + "/" + year);

        Map<String, BigDecimal> margen = new HashMap<>();
        margen.put("Tecnologia & Computo", new BigDecimal("41.7"));
        margen.put("Accesorios & Perifericos", new BigDecimal("51.1"));

        return new FinancialReportData(
                new BigDecimal("245600.00"),
                new BigDecimal("138400.00"),
                new BigDecimal("72180.00"),
                new BigDecimal("4210.00"),
                margen,
                user.getNombre() + " (" + user.getRole().name() + ")"
        );
    }
}
