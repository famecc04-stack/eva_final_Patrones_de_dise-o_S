package pe.techsolutions.pyme.patterns.behavioral.memento;

import pe.techsolutions.pyme.model.Order;

/**
 * Originator (RF8): Crea y restaura mementos sobre la entidad Order
 */
public class OrderOriginator {
    private Order order;

    public OrderOriginator(Order order) {
        this.order = order;
    }

    public OrderMemento saveToMemento() {
        System.out.println("[Memento Originator] Guardando snapshot de pedido " + order.getCodigo() + " en estado " + order.getEstado());
        return new OrderMemento(new OrderSnapshot(this.order));
    }

    public void restoreFromMemento(OrderMemento memento) {
        OrderSnapshot s = memento.getSnapshot();
        this.order.setEstado(s.getEstado());
        this.order.setDescuento(s.getDescuento());
        this.order.recalcularTotales();
        System.out.println("[Memento Originator RF8] Pedido " + order.getCodigo() + " RESTAURADO a estado anterior: " + s.getEstado());
    }

    public Order getOrder() { return order; }
}
