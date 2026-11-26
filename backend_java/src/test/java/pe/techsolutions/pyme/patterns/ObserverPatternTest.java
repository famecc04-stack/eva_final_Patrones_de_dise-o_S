package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.observer.*;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Observer (RF5, RF6)
 */
@DisplayName("Pruebas del Patron Observer - Notificaciones de Inventario")
public class ObserverPatternTest {

    private InventoryStockSubject inventory;
    private ManagerStockNotifier managerNotifier;
    private ProcurementStockNotifier procurementNotifier;
    private Product laptopProduct;

    @BeforeEach
    void setUp() {
        inventory = new InventoryStockSubject();
        managerNotifier = new ManagerStockNotifier();
        procurementNotifier = new ProcurementStockNotifier();

        inventory.attach(managerNotifier);
        inventory.attach(procurementNotifier);

        laptopProduct = new Product("P1", "SKU-LAP-001", "Laptop Dell Vostro 15", "Tecnologia", new BigDecimal("3200.00"), 15, 5);
        inventory.addProduct(laptopProduct);
    }

    @Test
    @DisplayName("RF5: Notificacion automatica simultanea a Gerente y Compras al caer stock por debajo del minimo")
    void testAlertDispatchedOnStockLow() {
        // Stock inicial = 15, minimo = 5. Venta de 12 unidades -> Stock restante = 3
        inventory.reduceStock("P1", 12);

        assertEquals(1, managerNotifier.getReceivedAlerts().size(), "Gerente debe recibir 1 alerta");
        assertEquals(1, procurementNotifier.getGeneratedPurchaseRequests().size(), "Compras debe generar 1 solicitud de reposicion");

        assertTrue(managerNotifier.getReceivedAlerts().get(0).contains("stock critico: 3"));
        assertTrue(procurementNotifier.getGeneratedPurchaseRequests().get(0).contains("Laptop Dell Vostro 15"));
    }

    @Test
    @DisplayName("RF6: Nivel minimo de stock configurable por producto")
    void testConfigurableMinStockRF6() {
        // Stock actual = 15. Subimos stock minimo a 20 -> Debe disparar alerta inmediata
        inventory.configureMinimumStock("P1", 20);

        assertEquals(20, laptopProduct.getStockMinimo());
        assertEquals(1, managerNotifier.getReceivedAlerts().size());
        assertEquals(1, procurementNotifier.getGeneratedPurchaseRequests().size());
    }

    @Test
    @DisplayName("Observer: No dispara alertas cuando el stock es saludable")
    void testNoAlertWhenStockIsHealthy() {
        inventory.reduceStock("P1", 2); // 15 - 2 = 13 (Minimo = 5)
        assertEquals(0, managerNotifier.getReceivedAlerts().size());
        assertEquals(0, procurementNotifier.getGeneratedPurchaseRequests().size());
    }
}
