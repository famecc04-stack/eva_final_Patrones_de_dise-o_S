package pe.techsolutions.pyme.patterns.behavioral.memento;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Caretaker (RF8): Administra la pila de mementos para permitir la operacion Deshacer (Undo)
 */
public class OrderCaretaker {
    private final Deque<OrderMemento> mementoHistory = new ArrayDeque<>();

    public void pushMemento(OrderMemento memento) {
        mementoHistory.push(memento);
    }

    public OrderMemento popMemento() {
        if (mementoHistory.isEmpty()) {
            return null;
        }
        return mementoHistory.pop();
    }

    public boolean hasMementos() {
        return !mementoHistory.isEmpty();
    }
}
