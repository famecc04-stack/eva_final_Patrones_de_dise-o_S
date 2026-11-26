package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

/**
 * Interfaz Subject (Observable)
 */
public interface StockSubject {
    void attach(StockObserver observer);
    void detach(StockObserver observer);
    void notifyObservers(Product product);
}
