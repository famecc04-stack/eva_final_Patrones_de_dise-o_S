package pe.techsolutions.pyme.patterns.behavioral.memento;

/**
 * Memento inmutable (RF8)
 */
public class OrderMemento {
    private final OrderSnapshot snapshot;

    public OrderMemento(OrderSnapshot snapshot) {
        this.snapshot = snapshot;
    }

    public OrderSnapshot getSnapshot() {
        return snapshot;
    }
}
