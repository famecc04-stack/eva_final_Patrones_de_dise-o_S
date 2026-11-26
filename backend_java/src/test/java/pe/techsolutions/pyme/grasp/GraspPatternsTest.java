package pe.techsolutions.pyme.grasp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.structural.adapter.PaymentGatewayManager;
import pe.techsolutions.pyme.patterns.structural.adapter.PaymentResponse;
import pe.techsolutions.pyme.patterns.structural.adapter.YapeAdapter;
import pe.techsolutions.pyme.patterns.structural.adapter.YapeService;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para los Patrones GRASP
 */
@DisplayName("Pruebas de Patrones GRASP - Controller, Information Expert y Creator")
public class GraspPatternsTest {

    private OrderController controller;

    @BeforeEach
    void setUp() {
        PaymentGatewayManager mgr = new PaymentGatewayManager();
        mgr.registerGateway(new YapeAdapter(new YapeService()), true);
        controller = new OrderController(mgr);
    }

    @Test
    @DisplayName("GRASP Creator: OrderFactory crea instancias validas y desacopladas")
    void testOrderFactoryCreator() {
        Order order = OrderFactory.createOrder("ORD-500", "Inversiones Lima S.A.C.");
        assertNotNull(order);
        assertEquals("ORD-500", order.getCodigo());
        assertEquals(Order.EstadoPedido.CREADO, order.getEstado());
    }

    @Test
    @DisplayName("GRASP Information Expert: Calculo de IGV 18% SUNAT")
    void testOrderPriceExpert() {
        Order order = OrderFactory.createOrder("ORD-501", "Cliente ABC");
        Product p = new Product("P1", "SKU-1", "Monitor", "Tec", new BigDecimal("1000.00"), 10, 1);
        order.addItem(new OrderItem(p, 1, new BigDecimal("1000.00"))); // Total = 1000

        BigDecimal igv = OrderPriceExpert.calculateIGV(order);
        assertEquals(0, new BigDecimal("180.00").compareTo(igv));

        BigDecimal totalConIgv = OrderPriceExpert.calculateTotalWithIGV(order);
        assertEquals(0, new BigDecimal("1180.00").compareTo(totalConIgv));
    }

    @Test
    @DisplayName("GRASP Controller: Coordina venta, comando y pago sin acoplar UI")
    void testOrderControllerWorkflow() {
        Order order = controller.createOrder("ORD-502", "Distribuidora del Sur");
        Product p = new Product("P2", "SKU-2", "Mouse", "Acc", new BigDecimal("100.00"), 50, 5);
        order.addItem(new OrderItem(p, 2, new BigDecimal("100.00"))); // Total = 200

        PaymentResponse resp = controller.processAndPay(order, "YAPE", "987654321");
        assertTrue(resp.isExitoso());
        assertEquals(Order.EstadoPedido.PAGADO, order.getEstado());
        assertEquals("YAPE", order.getPasarelaPago());
    }
}
