package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

/**
 * Interfaz Observer (RF5)
 */
public interface StockObserver {
    void onStockLow(Product product, int currentStock, int minStock);
    String getObserverName();
}
