package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.Role;
import pe.techsolutions.pyme.model.User;
import pe.techsolutions.pyme.patterns.structural.proxy.FinancialReportProxy;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Proxy (RF3, RF4)
 */
@DisplayName("Pruebas del Patron Proxy - Control de Acceso y Cache")
public class ProxyPatternTest {

    private FinancialReportProxy proxy;
    private User gerenteUser;
    private User contadorUser;
    private User vendedorUser;
    private User comprasUser;

    @BeforeEach
    void setUp() {
        proxy = new FinancialReportProxy();
        gerenteUser = new User("U1", "Estefania Orellana", "gerencia@techsolutions.pe", Role.GERENTE, true);
        contadorUser = new User("U2", "Carlos Mendoza", "contabilidad@techsolutions.pe", Role.CONTADOR, true);
        vendedorUser = new User("U3", "Ana Romero", "ventas@techsolutions.pe", Role.VENDEDOR, true);
        comprasUser = new User("U4", "Jorge Linares", "compras@techsolutions.pe", Role.COMPRAS, true);
    }

    @Test
    @DisplayName("RF4: Acceso autorizado completo para Gerente General")
    void testGerenteAccessAllowed() {
        FinancialReportData report = proxy.generateReport(gerenteUser, 11, 2026);
        assertNotNull(report);
        assertEquals(new BigDecimal("245600.00"), report.getFacturacionBruta());
        assertEquals(new BigDecimal("72180.00"), report.getUtilidadNeta());
        assertTrue(report.getGeneradoPor().contains("GERENTE"));
    }

    @Test
    @DisplayName("RF4: Acceso autorizado completo para Contador")
    void testContadorAccessAllowed() {
        FinancialReportData report = proxy.generateReport(contadorUser, 11, 2026);
        assertNotNull(report);
        assertEquals(new BigDecimal("245600.00"), report.getFacturacionBruta());
        assertTrue(report.getGeneradoPor().contains("CONTADOR"));
    }

    @Test
    @DisplayName("RF3, RF4: Denegacion estricta a roles no autorizados (Vendedor y Compras)")
    void testUnauthorizedRolesDenied() {
        SecurityException exVendedor = assertThrows(SecurityException.class, () ->
                proxy.generateReport(vendedorUser, 11, 2026)
        );
        assertTrue(exVendedor.getMessage().contains("Acceso denegado (RF4)"));

        SecurityException exCompras = assertThrows(SecurityException.class, () ->
                proxy.generateReport(comprasUser, 11, 2026)
        );
        assertTrue(exCompras.getMessage().contains("Acceso denegado (RF4)"));
    }

    @Test
    @DisplayName("Eficiencia Proxy: Almacenamiento en Cache y Reutilizacion")
    void testProxyCacheHit() {
        assertEquals(0, proxy.getCacheSize());

        // Primera llamada: Cache Miss (Lazy Load & Generacion)
        FinancialReportData rep1 = proxy.generateReport(gerenteUser, 11, 2026);
        assertEquals(1, proxy.getCacheSize());

        // Segunda llamada: Cache Hit inmediato sin recalcular
        FinancialReportData rep2 = proxy.generateReport(contadorUser, 11, 2026);
        assertSame(rep1, rep2, "El proxy debe retornar la instancia cacheada en memoria");
    }
}
