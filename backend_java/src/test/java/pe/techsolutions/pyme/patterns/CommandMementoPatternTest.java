package pe.techsolutions.pyme.patterns;

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
