package pe.techsolutions.pyme.patterns.structural.proxy;

import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.User;

/**
 * Subject Interface del Patron Proxy (RF3)
 */
public interface FinancialReportService {
    FinancialReportData generateReport(User user, int month, int year);
}
