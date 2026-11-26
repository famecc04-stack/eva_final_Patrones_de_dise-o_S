package pe.techsolutions.pyme.patterns.behavioral.memento;

import pe.techsolutions.pyme.model.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Snapshot inmutable que representa el estado capturado de una orden
 */
public class OrderSnapshot {
    private final String orderId;
    private final Order.EstadoPedido estado;
    private final BigDecimal total;
    private final BigDecimal descuento;
    private final LocalDateTime timestamp;

    public OrderSnapshot(Order order) {
        this.orderId = order.getId();
        this.estado = order.getEstado();
        this.total = order.getTotal();
        this.descuento = order.getDescuento();
        this.timestamp = LocalDateTime.now();
    }

    public String getOrderId() { return orderId; }
    public Order.EstadoPedido getEstado() { return estado; }
    public BigDecimal getTotal() { return total; }
    public BigDecimal getDescuento() { return descuento; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
