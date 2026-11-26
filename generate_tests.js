const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'backend_java');
const srcTest = path.join(baseDir, 'src', 'test', 'java', 'pe', 'techsolutions', 'pyme');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Test creado: ' + path.relative(baseDir, filePath));
}

// 1. AdapterPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'AdapterPatternTest.java'), `package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.patterns.structural.adapter.*;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Adapter (RF1, RF2)
 */
@DisplayName("Pruebas del Patron Adapter - Pasarelas de Pago Multiples")
public class AdapterPatternTest {

    private PaymentGatewayManager manager;

    @BeforeEach
    void setUp() {
        manager = new PaymentGatewayManager();
        manager.registerGateway(new PayPalAdapter(new PayPalService()), true);
        manager.registerGateway(new YapeAdapter(new YapeService()), true);
        manager.registerGateway(new PlinAdapter(new PlinService()), true);
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante PayPalAdapter")
    void testPayPalPaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-101", new BigDecimal("375.00"), "PEN", "cliente@empresa.pe", null);
        PaymentResponse resp = manager.process("PAYPAL", req);

        assertTrue(resp.isExitoso(), "El pago via PayPal deberia ser exitoso");
        assertEquals("PAYPAL", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("PAYPAL-TX-"));
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante YapeAdapter")
    void testYapePaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-102", new BigDecimal("85.50"), "PEN", null, "987654321");
        PaymentResponse resp = manager.process("YAPE", req);

        assertTrue(resp.isExitoso(), "El cobro via Yape deberia ser exitoso");
        assertEquals("YAPE", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("YAPE-BCP-"));
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante PlinAdapter")
    void testPlinPaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-103", new BigDecimal("120.00"), "PEN", null, "912345678");
        PaymentResponse resp = manager.process("PLIN", req);

        assertTrue(resp.isExitoso(), "La transferencia via Plin deberia ser exitosa");
        assertEquals("PLIN", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("PLIN-IBK-"));
    }

    @Test
    @DisplayName("RF2: Panel de configuracion - Deshabilitar y Habilitar pasarela")
    void testDisableGatewayRF2() {
        // Deshabilita PayPal
        manager.setGatewayEnabled("PAYPAL", false);
        assertFalse(manager.isGatewayEnabled("PAYPAL"));

        PaymentRequest req = new PaymentRequest("ORD-104", new BigDecimal("200.00"), "PEN", "cliente@empresa.pe", null);
        PaymentResponse resp = manager.process("PAYPAL", req);

        assertFalse(resp.isExitoso(), "No debe permitir procesar si la pasarela esta deshabilitada");
        assertTrue(resp.getMensaje().contains("deshabilitada"));

        // Vuelve a habilitar
        manager.setGatewayEnabled("PAYPAL", true);
        assertTrue(manager.isGatewayEnabled("PAYPAL"));
    }
}
`);

// 2. ProxyPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'ProxyPatternTest.java'), `package pe.techsolutions.pyme.patterns;

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
`);

// 3. ObserverPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'ObserverPatternTest.java'), `package pe.techsolutions.pyme.patterns;

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
`);

// 4. CommandMementoPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'CommandMementoPatternTest.java'), `package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.command.*;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderCaretaker;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderOriginator;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para Command (RF7) y Memento (RF8)
 */
@DisplayName("Pruebas Combinadas de Command y Memento - Historial y Rollback")
public class CommandMementoPatternTest {

    private Order order;
    private OrderOriginator originator;
    private OrderCaretaker caretaker;
    private OrderCommandInvoker invoker;

    @BeforeEach
    void setUp() {
        order = new Order("ORD-1", "ORD-2026-001", "Corporacion Minera Andina");
        Product p = new Product("P1", "SKU-MON-01", "Monitor LG UltraWide", "Tecnologia", new BigDecimal("1200.00"), 10, 2);
        order.addItem(new OrderItem(p, 2, new BigDecimal("1200.00"))); // Total = 2400

        originator = new OrderOriginator(order);
        caretaker = new OrderCaretaker();
        invoker = new OrderCommandInvoker();
    }

    @Test
    @DisplayName("RF7: Encapsulacion y registro de acciones de pedido en historial")
    void testCommandExecutionAndHistory() {
        assertEquals(Order.EstadoPedido.CREADO, order.getEstado());

        ProcessOrderCommand procCmd = new ProcessOrderCommand(originator, caretaker);
        invoker.executeCommand(procCmd);

        assertEquals(Order.EstadoPedido.PROCESADO, order.getEstado());
        assertEquals(1, invoker.getExecutionHistory().size());
        assertTrue(invoker.getExecutionHistory().get(0).getDescription().contains("Procesar Pedido"));
    }

    @Test
    @DisplayName("RF8: Reversion de cancelacion mediante restauracion de Memento")
    void testMementoRollbackOnOrderCancellation() {
        // 1. Procesa la orden
        ProcessOrderCommand procCmd = new ProcessOrderCommand(originator, caretaker);
        invoker.executeCommand(procCmd);
        assertEquals(Order.EstadoPedido.PROCESADO, order.getEstado());

        // 2. Por error, un operador cancela la orden
        CancelOrderCommand cancelCmd = new CancelOrderCommand(originator, caretaker);
        invoker.executeCommand(cancelCmd);
        assertEquals(Order.EstadoPedido.CANCELADO, order.getEstado());

        // 3. Rollback inmediato usando Undo del Command alimentado por Memento
        cancelCmd.undo();
        assertEquals(Order.EstadoPedido.PROCESADO, order.getEstado(), "El pedido debe haber regresado a PROCESADO");
    }
}
`);

// 5. StrategyPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'StrategyPatternTest.java'), `package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.strategy.*;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Strategy (RF9, RF10)
 */
@DisplayName("Pruebas del Patron Strategy - Politicas Dinamicas de Precios")
public class StrategyPatternTest {

    private Product product;
    private PricingContext context;

    @BeforeEach
    void setUp() {
        product = new Product("P1", "SKU-IMP-01", "Impresora Epson L3250", "Tecnologia", new BigDecimal("800.00"), 20, 3);
        context = new PricingContext(new StandardPricingStrategy());
    }

    @Test
    @DisplayName("RF9: Estrategia de Precio Estandar")
    void testStandardPricing() {
        BigDecimal total = context.executeCalculation(product, 2);
        assertEquals(new BigDecimal("1600.00"), total);
    }

    @Test
    @DisplayName("RF9: Estrategia de Descuento Porcentual (15%)")
    void testPercentageDiscountPricing() {
        context.setStrategy(new PercentageDiscountStrategy(new BigDecimal("0.15")));
        BigDecimal total = context.executeCalculation(product, 2);
        // 800 * 2 = 1600 - 15% (240) = 1360.00
        assertEquals(0, new BigDecimal("1360.00").compareTo(total));
    }

    @Test
    @DisplayName("RF9: Estrategia de Precio Dinamico por Volumen (Descuento Mayorista)")
    void testDynamicPricingByVolume() {
        context.setStrategy(new DynamicPricingStrategy());

        // 1 a 9 unidades: Precio base
        BigDecimal total5 = context.executeCalculation(product, 5);
        assertEquals(new BigDecimal("4000.00"), total5);

        // >= 10 unidades: 10% descuento
        BigDecimal total10 = context.executeCalculation(product, 10);
        // 800 * 10 = 8000 * 0.90 = 7200.00
        assertEquals(0, new BigDecimal("7200.00").compareTo(total10));

        // >= 50 unidades: 25% descuento mayorista
        BigDecimal total50 = context.executeCalculation(product, 50);
        // 800 * 50 = 40000 * 0.75 = 30000.00
        assertEquals(0, new BigDecimal("30000.00").compareTo(total50));
    }

    @Test
    @DisplayName("RF10: Conmutacion de estrategia en runtime desde configuracion")
    void testSwitchStrategyAtRuntimeRF10() {
        assertEquals("PRECIO_ESTANDAR", context.getStrategy().getStrategyName());

        context.setStrategy(new PercentageDiscountStrategy(new BigDecimal("0.20")));
        assertEquals("DESCUENTO_PORCENTUAL_20%", context.getStrategy().getStrategyName());
    }
}
`);

// 6. IteratorPatternTest.java
writeFile(path.join(srcTest, 'patterns', 'IteratorPatternTest.java'), `package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.iterator.Iterator;
import pe.techsolutions.pyme.patterns.behavioral.iterator.ProductCatalog;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Iterator (RF11, RF12)
 */
@DisplayName("Pruebas del Patron Iterator - Recorrido, Filtro y Paginacion")
public class IteratorPatternTest {

    private ProductCatalog catalog;

    @BeforeEach
    void setUp() {
        catalog = new ProductCatalog();
        catalog.addProduct(new Product("P1", "SKU-01", "Laptop HP ProBook", "Tecnologia", new BigDecimal("3200.00"), 10, 2));
        catalog.addProduct(new Product("P2", "SKU-02", "Teclado Mecanico Logitech", "Accesorios", new BigDecimal("250.00"), 40, 5));
        catalog.addProduct(new Product("P3", "SKU-03", "Mouse Ergonomico Inalambrico", "Accesorios", new BigDecimal("120.00"), 25, 4));
        catalog.addProduct(new Product("P4", "SKU-04", "Monitor Dell 27 4K", "Tecnologia", new BigDecimal("1850.00"), 8, 2));
        catalog.addProduct(new Product("P5", "SKU-05", "Audifonos Bluetooth Sony", "Accesorios", new BigDecimal("380.00"), 18, 3));
    }

    @Test
    @DisplayName("RF12: Recorrido secuencial sin exponer coleccion interna")
    void testSequentialIteration() {
        Iterator<Product> it = catalog.createIterator();
        int count = 0;
        while (it.hasNext()) {
            Product p = it.next();
            assertNotNull(p.getNombre());
            count++;
        }
        assertEquals(5, count);
    }

    @Test
    @DisplayName("RF11: Filtrado de catalogo por categoria 'Accesorios'")
    void testFilterByCategory() {
        Iterator<Product> it = catalog.createFilterPageIterator(
                p -> p.getCategoria().equalsIgnoreCase("Accesorios"),
                1, 10
        );

        List<Product> accesorios = new ArrayList<>();
        while (it.hasNext()) {
            accesorios.add(it.next());
        }

        assertEquals(3, accesorios.size());
        assertTrue(accesorios.stream().allMatch(p -> p.getCategoria().equals("Accesorios")));
    }

    @Test
    @DisplayName("RF11: Paginacion de catalogo (Pagina 1 y Pagina 2 con tamano 2)")
    void testPagination() {
        // Pagina 1 con 2 elementos
        Iterator<Product> page1 = catalog.createFilterPageIterator(p -> true, 1, 2);
        List<Product> p1List = new ArrayList<>();
        while (page1.hasNext()) p1List.add(page1.next());
        assertEquals(2, p1List.size());
        assertEquals("Laptop HP ProBook", p1List.get(0).getNombre());

        // Pagina 2 con 2 elementos
        Iterator<Product> page2 = catalog.createFilterPageIterator(p -> true, 2, 2);
        List<Product> p2List = new ArrayList<>();
        while (page2.hasNext()) p2List.add(page2.next());
        assertEquals(2, p2List.size());
        assertEquals("Mouse Ergonomico Inalambrico", p2List.get(0).getNombre());
    }
}
`);

// 7. GraspPatternsTest.java
writeFile(path.join(srcTest, 'grasp', 'GraspPatternsTest.java'), `package pe.techsolutions.pyme.grasp;

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
`);

console.log('Todas las clases de pruebas JUnit 5 generadas exitosamente.');
