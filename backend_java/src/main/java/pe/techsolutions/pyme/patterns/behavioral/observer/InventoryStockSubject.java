package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Concrete Subject: Administra inventario y verifica umbrales minimos (RF5, RF6)
 */
public class InventoryStockSubject implements StockSubject {

    private final List<StockObserver> observers = new ArrayList<>();
    private final Map<String, Product> products = new HashMap<>();

    @Override
    public void attach(StockObserver observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void detach(StockObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(Product product) {
        for (StockObserver observer : observers) {
            observer.onStockLow(product, product.getStockActual(), product.getStockMinimo());
        }
    }

    public void addProduct(Product product) {
        products.put(product.getId(), product);
    }

    // RF6: El nivel minimo de stock debe ser configurable por producto
    public void configureMinimumStock(String productId, int newMinStock) {
        Product p = products.get(productId);
        if (p != null) {
            p.setStockMinimo(newMinStock);
            System.out.println("[Inventario RF6] Stock minimo configurado para " + p.getNombre() + ": " + newMinStock + " unidades.");
            if (p.getStockActual() <= newMinStock) {
                notifyObservers(p);
            }
        }
    }

    // Actualiza existencias y dispara alerta si cae por debajo del minimo (RF5)
    public void reduceStock(String productId, int quantity) {
        Product p = products.get(productId);
        if (p != null) {
            p.setStockActual(p.getStockActual() - quantity);
            System.out.println("[Inventario] Reduccion de stock en " + p.getNombre() + ". Stock restante: " + p.getStockActual());
            if (p.getStockActual() <= p.getStockMinimo()) {
                notifyObservers(p);
            }
        }
    }
}
